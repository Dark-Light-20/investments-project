import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksList } from './banks-list';
import { By } from '@angular/platform-browser';

describe('BanksList', () => {
  let component: BanksList;
  let fixture: ComponentFixture<BanksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanksList],
    }).compileComponents();

    fixture = TestBed.createComponent(BanksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render list of banks', () => {
    const bankItems = fixture.debugElement.queryAll(By.css('[data-testid^="bankItem"]'));
    expect(bankItems).toHaveLength(component.banks.length);
    bankItems.forEach((item, index) => {
      const bank = component.banks[index];
      const imgElement = item.query(By.css('img')).nativeElement as HTMLImageElement;
      const spanElement = item.query(By.css('span')).nativeElement as HTMLSpanElement;

      expect(imgElement.src).toContain(bank.logo);
      expect(imgElement.alt).toBe(`Logo ${bank.name}`);
      expect(spanElement.textContent).toBe(bank.name);
    });
  });
});
