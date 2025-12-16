import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SimulationsTable } from './simulations-table';
import { PocketSimulation } from '@pocket/domain/models/simulation.model';
import { Bank } from '@pocket/domain/models/pocket.model';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BankLogoPipe } from '@pocket/ui/pipes/bank-logo-pipe';

const mockSimulations: PocketSimulation[] = [
  {
    id: '1',
    bankName: Bank.Finandina,
    investedAmount: 500000,
    term: 5,
    rate: 10,
    earnings: 50000,
    finalAmount: 550000,
  },
  {
    id: '2',
    bankName: Bank.Nu,
    investedAmount: 500000,
    term: 5,
    rate: 12,
    earnings: 60000,
    finalAmount: 560000,
  },
];

describe('SimulationsTable', () => {
  let component: SimulationsTable;
  let fixture: ComponentFixture<SimulationsTable>;
  let currencyPipe: CurrencyPipe;
  let bankLogoPipe: BankLogoPipe;
  let decimalPipe: DecimalPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationsTable],
      providers: [CurrencyPipe, BankLogoPipe, DecimalPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationsTable);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('simulations', mockSimulations);
    currencyPipe = TestBed.inject(CurrencyPipe);
    bankLogoPipe = TestBed.inject(BankLogoPipe);
    decimalPipe = TestBed.inject(DecimalPipe);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render the correct number of simulation items', () => {
    const items = fixture.debugElement.queryAll(By.css('[data-testid="simulation-item"]'));
    expect(items).toHaveLength(mockSimulations.length);
  });

  test('should display correct simulation details for the first item', () => {
    const items = fixture.debugElement.queryAll(By.css('[data-testid="simulation-item"]'));
    expect(items).toHaveLength(mockSimulations.length);

    for (const [index, item] of items.entries()) {
      const simulation = mockSimulations[index];

      const bankNameEl = item.query(By.css('[data-testid="simulationBankName"]'));
      const rateEl = item.query(By.css('[data-testid="simulationRate"]'));
      const earningsEl = item.query(By.css('[data-testid="simulationEarnings"]'));
      const finalAmountEl = item.query(By.css('[data-testid="simulationFinalAmount"]'));
      const logoEl = item.query(By.css('[data-testid="simulationBankLogo"]'));

      expect(bankNameEl.nativeElement.textContent.trim()).toBe(simulation.bankName);
      expect(rateEl.nativeElement.textContent.trim()).toContain(decimalPipe.transform(simulation.rate, '1.2-2') + '%');
      expect(earningsEl.nativeElement.textContent.trim()).toContain(
        currencyPipe.transform(simulation.earnings, 'COP', 'symbol-narrow')
      );
      expect(finalAmountEl.nativeElement.textContent.trim()).toContain(
        currencyPipe.transform(simulation.finalAmount, 'COP', 'symbol-narrow')
      );
      expect(logoEl.attributes['src']).toBe(bankLogoPipe.transform(simulation.bankName));
    }
  });
});
