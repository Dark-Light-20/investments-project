import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortRates } from './sort-rates';
import { By } from '@angular/platform-browser';
import { Bank, Fic } from '@fic/domain/models/fic.model';

const sampleRate: Fic = {
  id: 'sample-id',
  bankName: Bank.Bancolombia,
  name: 'Sample FIC',
  rates: [
    {
      rate: 8.5,
      historicDays: 30,
    },
  ],
};

describe('SortRates', () => {
  let component: SortRates<{ rates: Fic[] }>;
  let fixture: ComponentFixture<SortRates<{ rates: Fic[] }>>;

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
        { ...sampleRate, rates: [{ rate: 10.2, historicDays: 30 }], bankName: Bank.BancoDeBogota },
        { ...sampleRate, rates: [{ rate: 9.5, historicDays: 30 }], bankName: Bank.Bancolombia },
      ],
    };
    fixture.componentRef.setInput('rates', rates);

    await fixture.whenStable();
    fixture.detectChanges();

    const rateButton = fixture.debugElement.query(By.css('button[data-testid="rateSortButton"]'));
    rateButton.triggerEventHandler('click');
    fixture.detectChanges();

    const firstRate = component.sortedRates().rates[0];
    expect(firstRate.bankName).toContain(Bank.BancoDeBogota);
  });

  test('sorts by bank when Bank button is clicked', async () => {
    const rates = {
      rates: [
        { ...sampleRate, rates: [{ rate: 9.5, historicDays: 30 }], bankName: Bank.Bancolombia },
        { ...sampleRate, rates: [{ rate: 7.2, historicDays: 30 }], bankName: Bank.BancoDeBogota },
      ],
    };
    fixture.componentRef.setInput('rates', rates);

    await fixture.whenStable();
    fixture.detectChanges();

    const bankButton = fixture.debugElement.query(By.css('button[data-testid="bankSortButton"]'));
    bankButton.triggerEventHandler('click');
    fixture.detectChanges();

    const firstRate = component.sortedRates().rates[0];
    expect(firstRate.bankName).toContain(Bank.BancoDeBogota);
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
