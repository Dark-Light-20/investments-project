import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rates } from './rates';
import { MockProvider } from 'ng-mocks';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { of, throwError } from 'rxjs';
import { Bank, CdtRate, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { BankLogoPipe } from '@cdt/ui/pipes/bank-logo-pipe';
import { FailedBanksAlert } from '@cdt/ui/components/failed-banks-alert/failed-banks-alert';
import { SortRates } from '@cdt/ui/components/sort-rates/sort-rates';
import { SortType } from '@cdt/ui/models/sort.model';
import { Pagination } from '@cdt/ui/components/pagination/pagination';
import { provideRouter } from '@angular/router';

const sampleRate = {
  id: 'sample-id',
  rate: 8.5,
  minimumTerm: 30,
  maximumTerm: 60,
  minimumAmount: 100000,
  maximumAmount: 10000000,
  termUnit: CDTTermUnit.DAYS,
  bankName: Bank.Bancolombia,
};

const cdtUseCaseMock = {
  getAllCDTRates: jest.fn().mockReturnValue(
    of({
      rates: [sampleRate],
      failedBanks: [],
    } as CdtRatesResponse)
  ),
};

describe('Rates', () => {
  let component: Rates;
  let fixture: ComponentFixture<Rates>;
  let bankLogoPipe: BankLogoPipe;
  let ratePropertiesPipe: RatePropertiesPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rates],
      providers: [provideRouter([]), BankLogoPipe, RatePropertiesPipe, CurrencyPipe],
    })
      .overrideComponent(Rates, {
        set: {
          providers: [MockProvider(Cdt, cdtUseCaseMock)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Rates);
    component = fixture.componentInstance;
    bankLogoPipe = TestBed.inject(BankLogoPipe);
    ratePropertiesPipe = TestBed.inject(RatePropertiesPipe);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('renders table rows and all columns when there are rates', async () => {
    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('[data-testid="rate-row"]'));
    expect(rows).toHaveLength(1);

    const row = rows[0];
    const bankName = row.query(By.css('[data-testid="cell-bank"] span'))?.nativeElement?.textContent;
    const bankLogo = row.query(By.css('[data-testid="cell-bank"] img'))?.nativeElement?.src;
    const rate = row.query(By.css('[data-testid="cell-rate"]'))?.nativeElement?.textContent;
    const amount = row.query(By.css('[data-testid="cell-amount"]'))?.nativeElement?.textContent;
    const term = row.query(By.css('[data-testid="cell-term"]'))?.nativeElement?.textContent;

    expect(bankName).toContain(Bank.Bancolombia);
    expect(bankLogo).toContain(bankLogoPipe.transform(Bank.Bancolombia));
    const rateProperties = ratePropertiesPipe.transform(sampleRate);
    expect(rate).toContain(rateProperties.rateValue);
    expect(amount).toContain(rateProperties.amountRange);
    expect(term).toContain(rateProperties.termRange);
  });

  test('does not render any row when there are no rates', async () => {
    const response: CdtRatesResponse = { rates: [], failedBanks: [] };
    cdtUseCaseMock.getAllCDTRates.mockReturnValueOnce(of(response));
    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('[data-testid="rate-row"]'));
    expect(rows).toHaveLength(0);
  });

  test('shows loading row while resource is pending', () => {
    component.ratesResource.reload();
    // Do not await whenStable because the observable never emits; check immediate DOM

    const loading = fixture.debugElement.query(By.css('[data-testid="loading-row"]'));
    expect(loading).toBeTruthy();
    expect(loading.nativeElement.textContent).toContain('Cargando tasas');
  });

  test('shows error text when resource fails', async () => {
    cdtUseCaseMock.getAllCDTRates.mockReturnValueOnce(throwError(() => new Error('Network error')));
    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('[data-testid="error-row"]'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain('No se pudieron cargar las tasas');
  });

  test('shows failedBanks alert when there are failed banks', async () => {
    const response: CdtRatesResponse = { rates: [], failedBanks: ['Bank A' as Bank, 'Bank B' as Bank] };
    cdtUseCaseMock.getAllCDTRates.mockReturnValueOnce(of(response));

    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.directive(FailedBanksAlert));
    expect(alert).toBeTruthy();
  });

  test('should set page 1 when sort filter changes', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const sortRatesComponent = fixture.debugElement.query(By.directive(SortRates)).componentInstance as SortRates<{
      rates: CdtRate[];
    }>;
    const paginationComponent = fixture.debugElement.query(By.directive(Pagination)).componentInstance as Pagination;
    const goToPageSpy = jest.spyOn(paginationComponent, 'goToPage');

    sortRatesComponent.changedFilter.emit(SortType.RATE);

    expect(goToPageSpy).toHaveBeenCalledWith(1);
  });
});
