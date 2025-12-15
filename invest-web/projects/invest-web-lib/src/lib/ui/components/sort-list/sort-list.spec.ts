import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortList, SortType } from './sort-list';

export interface MockType {
  rate: number;
  bankName: string;
}

const mockItems: MockType[] = [
  { rate: 5, bankName: 'Bank A' },
  { rate: 3.5, bankName: 'Bank B' },
  { rate: 4.2, bankName: 'Bank C' },
];

describe('SortList', () => {
  let component: SortList<MockType>;
  let fixture: ComponentFixture<SortList<MockType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortList],
    }).compileComponents();

    fixture = TestBed.createComponent(SortList<MockType>);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('items', mockItems);
    fixture.componentRef.setInput('comparators', {
      [SortType.RATE]: (a: MockType, b: MockType) => b.rate - a.rate,
      [SortType.BANK]: (a: MockType, b: MockType) => a.bankName.localeCompare(b.bankName),
    });

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should sort items based on selected filter', () => {
    // Default is RATE (descending in my mock)
    expect(component.sortedItems()).toEqual([
      { rate: 5, bankName: 'Bank A' },
      { rate: 4.2, bankName: 'Bank C' },
      { rate: 3.5, bankName: 'Bank B' },
    ]);

    component.changeFilter(SortType.BANK); // Ascending in my mock
    fixture.detectChanges();

    expect(component.sortedItems()).toEqual([
      { rate: 5, bankName: 'Bank A' },
      { rate: 3.5, bankName: 'Bank B' },
      { rate: 4.2, bankName: 'Bank C' },
    ]);
  });

  test('should emit changedFilter event', () => {
    const spy = jest.spyOn(component.changedFilter, 'emit');
    component.changeFilter(SortType.BANK);
    expect(spy).toHaveBeenCalledWith(SortType.BANK);
  });
});
