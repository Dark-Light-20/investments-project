import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortRates } from './sort-rates';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { Bank, CdtRate } from '@cdt/domain/models/cdt.model';
import { By } from '@angular/platform-browser';

const sampleRate: CdtRate = {
  rate: 8.5,
  minimumTerm: 30,
  maximumTerm: 60,
  minimumAmount: 100000,
  maximumAmount: 10000000,
  termUnit: CDTTermUnit.DAYS,
  bankName: Bank.Bancolombia,
};

describe('SortRates', () => {
  let component: SortRates<{ rates: CdtRate[] }>;
  let fixture: ComponentFixture<SortRates<{ rates: CdtRate[] }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortRates],
    }).compileComponents();

    fixture = TestBed.createComponent(SortRates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('sorts by rate when Rate button is clicked', async () => {
    const rates = {
      rates: [
        { ...sampleRate, rate: 7.2, bankName: Bank.Bancolombia },
        { ...sampleRate, rate: 9.5, bankName: Bank.Nu },
      ],
    };
    fixture.componentRef.setInput('rates', rates);

    await fixture.whenStable();
    fixture.detectChanges();

    const rateButton = fixture.debugElement.query(By.css('button[data-testid="rateSortButton"]'));
    rateButton.triggerEventHandler('click');
    fixture.detectChanges();

    const firstRate = component.sortedRates().rates[0];
    expect(firstRate.bankName).toContain(Bank.Nu);
  });

  test('sorts by bank when Bank button is clicked', async () => {
    const rates = {
      rates: [
        { ...sampleRate, rate: 7.2, bankName: Bank.Nu },
        { ...sampleRate, rate: 9.5, bankName: Bank.Finandina },
      ],
    };
    fixture.componentRef.setInput('rates', rates);

    await fixture.whenStable();
    fixture.detectChanges();

    const bankButton = fixture.debugElement.query(By.css('button[data-testid="bankSortButton"]'));
    bankButton.triggerEventHandler('click');
    fixture.detectChanges();

    const firstRate = component.sortedRates().rates[0];
    expect(firstRate.bankName).toContain(Bank.Finandina);
  });

  test('should update button classes based on selected sort', async () => {
    component.selectedFilter.set(undefined);
    fixture.detectChanges();

    const rateButton = fixture.debugElement.query(By.css('button[data-testid="rateSortButton"]'));
    const bankButton = fixture.debugElement.query(By.css('button[data-testid="bankSortButton"]'));

    expect(rateButton.nativeElement.className).toContain('text-gray-600');
    expect(bankButton.nativeElement.className).toContain('text-gray-600');

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
