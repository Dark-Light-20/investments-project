import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedBanksAlert } from './failed-banks-alert';
import { By } from '@angular/platform-browser';

describe('FailedBanksAlert', () => {
  let component: FailedBanksAlert;
  let fixture: ComponentFixture<FailedBanksAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedBanksAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(FailedBanksAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('shows failedBanks alert when there are failed banks', async () => {
    fixture.componentRef.setInput('failedBanks', ['Bank A', 'Bank B']);

    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css('[data-testid="failed-banks-alert"]'));
    expect(alert).toBeTruthy();
    expect(alert.nativeElement.textContent).toContain(component.alertMessage());
    expect(alert.nativeElement.textContent).toContain('Bank A');
    expect(alert.nativeElement.textContent).toContain('Bank B');
  });
});
