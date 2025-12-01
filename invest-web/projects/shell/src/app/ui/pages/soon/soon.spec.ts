import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soon } from './soon';
import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('Soon', () => {
  let component: Soon;
  let fixture: ComponentFixture<Soon>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Soon],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Soon);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render back link and navigate', async () => {
    const cdtLinkElement = fixture.debugElement.query(By.css('a[data-testid="backLink"]'));
    expect(cdtLinkElement.nativeElement.textContent).toContain('Volver al inicio');
    cdtLinkElement.nativeElement.click();
    await fixture.whenStable();
    expect(router.url).toContain('/');
  });
});
