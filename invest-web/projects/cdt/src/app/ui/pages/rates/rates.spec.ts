import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rates } from './rates';
import { MockProvider } from 'ng-mocks';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { of, throwError } from 'rxjs';
import { Bank, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { BankInitialsPipe } from '@cdt/ui/pipes/bank-initials-pipe';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';

const sampleRate = {
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
  let bankInitialsPipe: BankInitialsPipe;
  let ratePropertiesPipe: RatePropertiesPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rates],
      providers: [BankInitialsPipe, RatePropertiesPipe, CurrencyPipe],
    })
      .overrideComponent(Rates, {
        set: {
          providers: [MockProvider(Cdt, cdtUseCaseMock)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Rates);
    component = fixture.componentInstance;
    bankInitialsPipe = TestBed.inject(BankInitialsPipe);
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
    const bank = row.query(By.css('[data-testid="cell-bank"]'))?.nativeElement?.textContent;
    const rate = row.query(By.css('[data-testid="cell-rate"]'))?.nativeElement?.textContent;
    const amount = row.query(By.css('[data-testid="cell-amount"]'))?.nativeElement?.textContent;
    const term = row.query(By.css('[data-testid="cell-term"]'))?.nativeElement?.textContent;

    expect(bank).toContain(Bank.Bancolombia);
    expect(bank).toContain(bankInitialsPipe.transform(Bank.Bancolombia));
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
    expect(loading.nativeElement.textContent).toContain('Loading rates');
  });

  test('shows error text when resource fails', async () => {
    cdtUseCaseMock.getAllCDTRates.mockReturnValueOnce(throwError(() => new Error('Network error')));
    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('[data-testid="error-row"]'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain('Failed to load rates');
  });

  test('shows failedBanks alert when there are failed banks', async () => {
    const response: CdtRatesResponse = { rates: [], failedBanks: ['Bank A' as Bank, 'Bank B' as Bank] };
    cdtUseCaseMock.getAllCDTRates.mockReturnValueOnce(of(response));

    component.ratesResource.reload();

    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css('[data-testid="failed-banks-alert"]'));
    expect(alert).toBeTruthy();
    expect(alert.nativeElement.textContent).toContain('Could not fetch rates from Banks:');
    expect(alert.nativeElement.textContent).toContain('Bank A');
    expect(alert.nativeElement.textContent).toContain('Bank B');
  });
});
