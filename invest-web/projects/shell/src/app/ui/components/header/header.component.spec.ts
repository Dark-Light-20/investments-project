import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

@Component({ selector: 'app-test', standalone: true })
class MockComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([
          { path: 'home', component: MockComponent },
          { path: 'cdts', component: MockComponent },
          { path: 'fics', component: MockComponent },
          { path: 'pockets', component: MockComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const titleElement = fixture.debugElement.query(By.css('[data-testid="appTitle"]'));
    expect(titleElement.nativeElement.textContent).toContain('Invest-App');
  });

  test('should render CDTs link and navigate', () => {
    const cdtLinkElement = fixture.debugElement.query(By.css('a[data-testid="CDTsLink"]'));
    expect(cdtLinkElement.nativeElement.textContent).toContain('CDTs');
    cdtLinkElement.nativeElement.click();
    fixture.detectChanges();
    expect(cdtLinkElement.nativeElement.classList).toContain('text-blue-400');
  });

  test('should render FICs link and navigate', () => {
    const ficLinkElement = fixture.debugElement.query(By.css('a[data-testid="FICsLink"]'));
    expect(ficLinkElement.nativeElement.textContent).toContain('FICs');
    ficLinkElement.nativeElement.click();
    fixture.detectChanges();
    expect(ficLinkElement.nativeElement.classList).toContain('text-blue-400');
  });

  test('should render Pockets link and navigate', () => {
    const pocketLinkElement = fixture.debugElement.query(By.css('a[data-testid="BolsillosLink"]'));
    expect(pocketLinkElement.nativeElement.textContent).toContain('Bolsillos');
    pocketLinkElement.nativeElement.click();
    fixture.detectChanges();
    expect(pocketLinkElement.nativeElement.classList).toContain('text-blue-400');
  });
});
