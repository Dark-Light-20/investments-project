import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulate } from './simulate';
import { PocketSimulation, PocketSimulationResponse } from '@pocket/domain/models/simulation.model';
import { Bank } from '@pocket/domain/models/pocket.model';
import { Pocket } from '@pocket/application/use-cases/pocket/pocket';
import { of, throwError } from 'rxjs';
import { MockComponents, MockProvider } from 'ng-mocks';
import { FailedBanksAlert, PageHeader } from 'invest-web-lib';
import { SimulationsTable } from '@pocket/ui/components/simulations-table/simulations-table';
import { By } from '@angular/platform-browser';

const mockSimulation: PocketSimulation = {
  id: '1',
  bankName: Bank.Finandina,
  investedAmount: 500000,
  term: 5,
  rate: 10,
  earnings: 50000,
  finalAmount: 550000,
};

const pocketUseCaseMock = {
  simulatePocket: jest.fn().mockReturnValue(
    of({
      simulations: [mockSimulation],
      failedBanks: [],
    } as PocketSimulationResponse)
  ),
};

describe('Simulate', () => {
  let component: Simulate;
  let fixture: ComponentFixture<Simulate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simulate, MockComponents(PageHeader, FailedBanksAlert, SimulationsTable)],
    })
      .overrideComponent(Simulate, {
        set: {
          providers: [MockProvider(Pocket, pocketUseCaseMock)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Simulate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('simulation form', () => {
    test('should be invalid when empty', () => {
      component.simulationForm.setValue({
        investedAmount: null,
        termInMonths: null,
        monthlyIncrement: null,
      });
      expect(component.simulationForm.valid).toBeFalsy();
      fixture.detectChanges();
      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(submitButton.disabled).toBeTruthy();
    });

    test('should be invalid with incorrect inputs', () => {
      component.simulationForm.setValue({
        investedAmount: 10, // below minimum
        termInMonths: 1,
        monthlyIncrement: 0,
      });
      fixture.detectChanges();
      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(submitButton.disabled).toBeTruthy();
      expect(component.simulationForm.valid).toBeFalsy();
    });

    test('should be valid with correct inputs', () => {
      component.simulationForm.setValue({
        investedAmount: 500000,
        termInMonths: 5,
        monthlyIncrement: 50000,
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
        termInMonths: 90,
        monthlyIncrement: 50000,
      });
      component.doSimulation();
    });

    test('renders simulations table when there are results', async () => {
      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.directive(SimulationsTable));
      expect(table).toBeTruthy();
      expect(table.componentInstance.simulations).toBe(component.simulationsList());
    });

    test('does not render any row when there are no rates', async () => {
      const response: PocketSimulationResponse = { simulations: [], failedBanks: [] };
      pocketUseCaseMock.simulatePocket.mockReturnValueOnce(of(response));
      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.directive(SimulationsTable));
      expect(table).toBeFalsy();
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
      pocketUseCaseMock.simulatePocket.mockReturnValueOnce(throwError(() => new Error('Network error')));
      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-simulations"]'));
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('No se encontraron tasas para la simulación solicitada');
    });

    test('shows failedBanks alert when there are failed banks', async () => {
      const response: PocketSimulationResponse = { simulations: [], failedBanks: ['Bank A' as Bank, 'Bank B' as Bank] };
      pocketUseCaseMock.simulatePocket.mockReturnValueOnce(of(response));

      component.simulationsResource.reload();

      await fixture.whenStable();
      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.directive(FailedBanksAlert));
      expect(alert).toBeTruthy();
    });
  });
});
