import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({ selector: 'app-test' })
class MockComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule.withRoutes([
          { path: 'cdt', component: MockComponent },
          { path: 'fic', component: MockComponent },
          { path: 'home', component: MockComponent },
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
    const titleElement = fixture.debugElement.query(By.css('a.navbar-brand'));
    expect(titleElement.nativeElement.textContent).toContain('Invest-App');
  });

  test('should render home link and navigate', () => {
    const homeLinkElement = fixture.debugElement.queryAll(By.css('a.nav-link'))[0];
    expect(homeLinkElement.nativeElement.textContent).toContain('Home');
    homeLinkElement.nativeElement.click();
    fixture.detectChanges();
    expect(homeLinkElement.nativeElement.classList).toContain('active');
  });

  test('should render CDTs link and navigate', () => {
    const cdtLinkElement = fixture.debugElement.queryAll(By.css('a.nav-link'))[1];
    expect(cdtLinkElement.nativeElement.textContent).toContain('CDTs');
    cdtLinkElement.nativeElement.click();
    fixture.detectChanges();
    expect(cdtLinkElement.nativeElement.classList).toContain('active');
  });

  test('should render FICs link and navigate', () => {
    const ficLinkElement = fixture.debugElement.queryAll(By.css('a.nav-link'))[2];
    expect(ficLinkElement.nativeElement.textContent).toContain('FICs');
    ficLinkElement.nativeElement.click();
    fixture.detectChanges();
    expect(ficLinkElement.nativeElement.classList).toContain('active');
  });
});
