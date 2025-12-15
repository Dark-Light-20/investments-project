import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rates } from './rates';
import { Bank, Fic as FicModel, FicsResponse } from '@fic/domain/models/fic.model';
import { of, throwError } from 'rxjs';
import { BankLogoPipe } from '@fic/ui/pipes/bank-logo-pipe';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { MockComponents, MockProvider } from 'ng-mocks';
import { Fic } from '@fic/application/use-cases/fic/fic';
import { By } from '@angular/platform-browser';
import { FailedBanksAlert, PageHeader, Pagination, SortList, SortType } from 'invest-web-lib';

const sampleFic: FicModel = {
  id: 'sample-id',
  name: 'Sample FIC',
  bankName: Bank.Bancolombia,
  rates: [
    { rate: 10.5, historicDays: 1 },
    { rate: 11.5, historicDays: 7 },
    { rate: 12.5, historicDays: 30 },
    { rate: 13.5, historicDays: 180 },
    { rate: 14.5, historicDays: 360 },
  ],
};

const ficUseCaseMock = {
  getAllFicRates: jest.fn().mockReturnValue(
    of({
      fics: [sampleFic],
      failedBanks: [],
    } as FicsResponse)
  ),
};

describe('Rates', () => {
  let component: Rates;
  let fixture: ComponentFixture<Rates>;
  let bankLogoPipe: BankLogoPipe;
  let percentPipe: PercentPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rates, MockComponents(PageHeader, FailedBanksAlert)],
      providers: [BankLogoPipe, PercentPipe, CurrencyPipe],
    })
      .overrideComponent(Rates, {
        set: {
          providers: [MockProvider(Fic, ficUseCaseMock)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Rates);
    component = fixture.componentInstance;
    bankLogoPipe = TestBed.inject(BankLogoPipe);
    percentPipe = TestBed.inject(PercentPipe);
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
    const bankName = row.query(By.css('[data-testid="cell-bank"] span[data-testid="bank-name"]'))?.nativeElement
      ?.textContent;
    const ficName = row.query(By.css('[data-testid="cell-bank"] span[data-testid="fic-name"]'))?.nativeElement
      ?.textContent;
    const bankLogo = row.query(By.css('[data-testid="cell-bank"] img'))?.nativeElement?.src;

    // Check rates columns
    const rate1Day = row.query(By.css('[data-testid="cell-1-day-rate"]'))?.nativeElement?.textContent;
    const rate1Week = row.query(By.css('[data-testid="cell-1-week-rate"]'))?.nativeElement?.textContent;
    const rate1Month = row.query(By.css('[data-testid="cell-1-month-rate"]'))?.nativeElement?.textContent;
    const rate6Months = row.query(By.css('[data-testid="cell-6-months-rate"]'))?.nativeElement?.textContent;
    const rate1Year = row.query(By.css('[data-testid="cell-1-year-rate"]'))?.nativeElement?.textContent;

    expect(bankName).toContain(Bank.Bancolombia);
    expect(ficName).toContain(sampleFic.name);
    expect(bankLogo).toContain(bankLogoPipe.transform(Bank.Bancolombia));

    // Helper to format rate
    const formatRate = (rate: number) => percentPipe.transform(rate / 100, '1.2-2');

    expect(rate1Day).toContain(formatRate(10.5));
    expect(rate1Week).toContain(formatRate(11.5));
    expect(rate1Month).toContain(formatRate(12.5));
    expect(rate6Months).toContain(formatRate(13.5));
    expect(rate1Year).toContain(formatRate(14.5));
  });

  test('does not render any row when there are no rates', async () => {
    const response: FicsResponse = { fics: [], failedBanks: [] };
    ficUseCaseMock.getAllFicRates.mockReturnValueOnce(of(response));
    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('[data-testid="rate-row"]'));
    expect(rows).toHaveLength(0);
  });

  test('shows loading row while resource is pending', () => {
    component.ratesResource.reload();

    const loading = fixture.debugElement.query(By.css('[data-testid="loading-row"]'));
    expect(loading).toBeTruthy();
    expect(loading.nativeElement.textContent).toContain('Cargando fondos');
  });

  test('shows error text when resource fails', async () => {
    ficUseCaseMock.getAllFicRates.mockReturnValueOnce(throwError(() => new Error('Network error')));
    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('[data-testid="error-row"]'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain('No se pudieron cargar los fondos');
  });

  test('shows failedBanks alert when there are failed banks', async () => {
    const response: FicsResponse = { fics: [], failedBanks: ['Bank A' as Bank, 'Bank B' as Bank] };
    ficUseCaseMock.getAllFicRates.mockReturnValueOnce(of(response));

    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.directive(FailedBanksAlert));
    expect(alert).toBeTruthy();
  });

  test('should set page 1 when sort filter changes', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const sortRatesComponent = fixture.debugElement.query(By.directive(SortList)).componentInstance as SortList<
      FicModel
    >;
    const paginationComponent = fixture.debugElement.query(By.directive(Pagination)).componentInstance as Pagination;
    const goToPageSpy = jest.spyOn(paginationComponent, 'goToPage');

    sortRatesComponent.changedFilter.emit(SortType.BANK);

    expect(goToPageSpy).toHaveBeenCalledWith(1);
  });
});
