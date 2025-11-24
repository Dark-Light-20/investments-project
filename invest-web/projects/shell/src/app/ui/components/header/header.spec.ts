import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

@Component({ selector: 'app-test', standalone: true })
class MockComponent {}

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([
          { path: 'home', component: MockComponent },
          { path: 'cdts', component: MockComponent },
          { path: 'fics', component: MockComponent },
          { path: 'pockets', component: MockComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const titleElement = fixture.debugElement.query(By.css('[data-testid="appTitle"]'));
    expect(titleElement.nativeElement.textContent).toContain('Invest-App');
  });

  test('should render CDTs link and navigate', async () => {
    const cdtLinkElement = fixture.debugElement.query(By.css('a[data-testid="CDTsLink"]'));
    expect(cdtLinkElement.nativeElement.textContent).toContain('CDTs');
    cdtLinkElement.nativeElement.click();
    await fixture.whenStable();
    expect(router.url).toContain('/cdts');
  });

  test('should render FICs link and navigate', async () => {
    const ficLinkElement = fixture.debugElement.query(By.css('a[data-testid="FICsLink"]'));
    expect(ficLinkElement.nativeElement.textContent).toContain('FICs');
    ficLinkElement.nativeElement.click();
    await fixture.whenStable();
    expect(router.url).toContain('/fics');
  });

  test('should render Pockets link and navigate', async () => {
    const pocketLinkElement = fixture.debugElement.query(By.css('a[data-testid="BolsillosLink"]'));
    expect(pocketLinkElement.nativeElement.textContent).toContain('Bolsillos');
    pocketLinkElement.nativeElement.click();
    await fixture.whenStable();
    expect(router.url).toContain('/pockets');
  });
});
