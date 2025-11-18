import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display the current year in the footer', () => {
    const currentYear = new Date().getFullYear().toString();
    const copyrightElement = fixture.debugElement.query(By.css('[data-testid="copyright"]'));
    expect(copyrightElement.nativeElement.textContent).toContain(currentYear);
  });
});
