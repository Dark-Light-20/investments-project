import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulate } from './simulate';
import { of, throwError } from 'rxjs';
import { CdtSimulation, CdtSimulationResponse } from '@cdt/domain/models/simulation.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { Bank } from '@cdt/domain/models/cdt.model';
import { BankLogoPipe } from '@cdt/ui/pipes/bank-logo-pipe';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { CurrencyPipe } from '@angular/common';
import { MockComponents, MockProvider } from 'ng-mocks';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { By } from '@angular/platform-browser';
import { FailedBanksAlert, PageHeader } from 'invest-web-lib';

const sampleSimulation: CdtSimulation = {
  investedAmount: 100000,
  term: 30,
  bankName: Bank.Bancolombia,
  earnings: 8500,
  finalAmount: 108500,
  rate: {
    id: 'sample-simulation-id',
    rate: 8.5,
    minimumTerm: 30,
    maximumTerm: 60,
    minimumAmount: 100000,
    maximumAmount: 10000000,
    termUnit: CDTTermUnit.DAYS,
    bankName: Bank.Bancolombia,
  },
};

const cdtUseCaseMock = {
  simulateCdt: jest.fn().mockReturnValue(
    of({
      simulations: [sampleSimulation],
      failedBanks: [],
    } as CdtSimulationResponse)
  ),
};

describe('Simulate', () => {
  let component: Simulate;
  let fixture: ComponentFixture<Simulate>;
  let bankLogoPipe: BankLogoPipe;
  let ratePropertiesPipe: RatePropertiesPipe;
  let currencyPipe: CurrencyPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simulate, MockComponents(PageHeader, FailedBanksAlert)],
      providers: [BankLogoPipe, RatePropertiesPipe, CurrencyPipe],
    })
      .overrideComponent(Simulate, {
        set: {
          providers: [MockProvider(Cdt, cdtUseCaseMock)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Simulate);
    component = fixture.componentInstance;
    bankLogoPipe = TestBed.inject(BankLogoPipe);
    ratePropertiesPipe = TestBed.inject(RatePropertiesPipe);
    currencyPipe = TestBed.inject(CurrencyPipe);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('simulation form', () => {
    test('should be invalid when empty', () => {
      component.simulationForm.setValue({
        investedAmount: null,
        termInDays: null,
      });
      expect(component.simulationForm.valid).toBeFalsy();
      fixture.detectChanges();
      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(submitButton.disabled).toBeTruthy();
    });

    test('should be invalid with incorrect inputs', () => {
      component.simulationForm.setValue({
        investedAmount: 10,
        termInDays: 1,
      });
      fixture.detectChanges();
      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(submitButton.disabled).toBeTruthy();
      expect(component.simulationForm.valid).toBeFalsy();
    });

    test('should be valid with correct inputs', () => {
      component.simulationForm.setValue({
        investedAmount: 500000,
        termInDays: 90,
      });
      fixture.detectChanges();
      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(submitButton.disabled).toBeFalsy();
      expect(component.simulationForm.valid).toBeTruthy();
    });
  });

  describe('simulation results', () => {
    beforeEach(() => {
      component.simulationForm.setValue({
        investedAmount: 500000,
        termInDays: 90,
      });
      component.doSimulation();
    });

    test('renders simulation items when there are results', async () => {
      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('[data-testid="simulation-item"]'));
      expect(items).toHaveLength(1);

      const item = items[0];
      const bankName = item.query(By.css('[data-testid="simulation-rate"] h3'))?.nativeElement?.textContent;
      const bankLogo = item.query(By.css('[data-testid="simulation-rate"] img'))?.nativeElement?.src;
      const rate = item.query(By.css('[data-testid="simulation-rate"] p'))?.nativeElement?.textContent;
      const amount = item.query(By.css('[data-testid="simulation-result"]'))?.nativeElement?.textContent;

      expect(bankName).toContain(Bank.Bancolombia);
      expect(bankLogo).toContain(bankLogoPipe.transform(Bank.Bancolombia));
      const rateProperties = ratePropertiesPipe.transform(sampleSimulation.rate);
      expect(rate).toContain(rateProperties.rateValue);
      expect(amount).toContain(currencyPipe.transform(sampleSimulation.earnings, 'COP', 'symbol-narrow'));
    });

    test('does not render any row when there are no rates', async () => {
      const response: CdtSimulationResponse = { simulations: [], failedBanks: [] };
      cdtUseCaseMock.simulateCdt.mockReturnValueOnce(of(response));
      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('[data-testid="simulation-item"]'));
      expect(items).toHaveLength(0);
    });

    test('shows loading row while resource is pending', () => {
      component.simulationsResource.reload();
      // Do not await whenStable because the observable never emits; check immediate DOM

      const loading = fixture.debugElement.query(By.css('[data-testid="start-simulation-template"]'));
      expect(loading).toBeTruthy();
      expect(loading.nativeElement.textContent).toContain(
        'Ingresa los detalles de tu inversión para calcular los rendimientos potenciales.'
      );
    });

    test('shows error text when resource fails', async () => {
      cdtUseCaseMock.simulateCdt.mockReturnValueOnce(throwError(() => new Error('Network error')));
      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-simulations"]'));
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('No se encontraron tasas para la simulación solicitada');
    });

    test('shows failedBanks alert when there are failed banks', async () => {
      const response: CdtSimulationResponse = { simulations: [], failedBanks: ['Bank A' as Bank, 'Bank B' as Bank] };
      cdtUseCaseMock.simulateCdt.mockReturnValueOnce(of(response));

      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.directive(FailedBanksAlert));
      expect(alert).toBeTruthy();
    });
  });
});
