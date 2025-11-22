import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';
import { By } from '@angular/platform-browser';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
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
