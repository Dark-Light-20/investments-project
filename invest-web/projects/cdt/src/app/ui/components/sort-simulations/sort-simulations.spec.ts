import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSimulations } from './sort-simulations';
import { CdtSimulation } from '@cdt/domain/models/simulation.model';
import { CdtRate, Bank } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { By } from '@angular/platform-browser';

const sampleRate: CdtRate = {
  id: crypto.randomUUID(),
  rate: 8.5,
  minimumTerm: 30,
  maximumTerm: 60,
  minimumAmount: 100000,
  maximumAmount: 10000000,
  termUnit: CDTTermUnit.DAYS,
  bankName: Bank.Bancolombia,
};

describe('SortSimulations', () => {
  let component: SortSimulations<{ simulations: CdtSimulation[] }>;
  let fixture: ComponentFixture<SortSimulations<{ simulations: CdtSimulation[] }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSimulations],
    }).compileComponents();

    fixture = TestBed.createComponent(SortSimulations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('sorts by rate when Rate button is clicked', async () => {
    const simulations = {
      simulations: [
        {
          investedAmount: 100000,
          term: 30,
          rate: { ...sampleRate, rate: 7.2 },
          earnings: 0,
          finalAmount: 0,
          bankName: Bank.Bancolombia,
        },
        {
          investedAmount: 100000,
          term: 30,
          rate: { ...sampleRate, rate: 9.5 },
          earnings: 0,
          finalAmount: 0,
          bankName: Bank.Nu,
        },
      ],
    };
    fixture.componentRef.setInput('simulations', simulations);

    await fixture.whenStable();
    fixture.detectChanges();

    const rateButton = fixture.debugElement.query(By.css('button[data-testid="rateSortButton"]'));
    rateButton.triggerEventHandler('click');
    fixture.detectChanges();

    const firstSim = component.sortedSimulations().simulations[0];
    expect(firstSim.bankName).toContain(Bank.Nu);
  });

  test('sorts by bank when Bank button is clicked', async () => {
    const simulations = {
      simulations: [
        {
          investedAmount: 100000,
          term: 30,
          rate: { ...sampleRate, rate: 7.2 },
          earnings: 0,
          finalAmount: 0,
          bankName: Bank.Nu,
        },
        {
          investedAmount: 100000,
          term: 30,
          rate: { ...sampleRate, rate: 9.5 },
          earnings: 0,
          finalAmount: 0,
          bankName: Bank.Finandina,
        },
      ],
    };
    fixture.componentRef.setInput('simulations', simulations);

    await fixture.whenStable();
    fixture.detectChanges();

    const bankButton = fixture.debugElement.query(By.css('button[data-testid="bankSortButton"]'));
    bankButton.triggerEventHandler('click');
    fixture.detectChanges();

    const firstSim = component.sortedSimulations().simulations[0];
    expect(firstSim.bankName).toContain(Bank.Finandina);
  });

  test('should update button classes based on selected sort', async () => {
    const rateButton = fixture.debugElement.query(By.css('button[data-testid="rateSortButton"]'));
    const bankButton = fixture.debugElement.query(By.css('button[data-testid="bankSortButton"]'));

    component.selectedFilter.set(component.SortType.RATE);
    fixture.detectChanges();

    expect(rateButton.nativeElement.className).toContain('text-blue-600');
    expect(bankButton.nativeElement.className).toContain('text-gray-600');

    component.selectedFilter.set(component.SortType.BANK);
    fixture.detectChanges();

    expect(rateButton.nativeElement.className).toContain('text-gray-600');
    expect(bankButton.nativeElement.className).toContain('text-blue-600');
  });

  test('should emit when filter is changed', async () => {
    jest.spyOn(component.changedFilter, 'emit');

    const rateButton = fixture.debugElement.query(By.css('button[data-testid="rateSortButton"]'));
    rateButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.changedFilter.emit).toHaveBeenCalledWith(component.SortType.RATE);

    const bankButton = fixture.debugElement.query(By.css('button[data-testid="bankSortButton"]'));
    bankButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.changedFilter.emit).toHaveBeenCalledWith(component.SortType.BANK);
  });
});
