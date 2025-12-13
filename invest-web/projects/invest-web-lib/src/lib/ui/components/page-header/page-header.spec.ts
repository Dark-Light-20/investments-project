import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageHeader } from './page-header';
import { provideRouter } from '@angular/router';

describe('PageHeader', () => {
  let component: PageHeader;
  let fixture: ComponentFixture<PageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeader);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('backLink', '/');
    fixture.componentRef.setInput('title', 'Test Page Title');
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const debugTitle = fixture.debugElement.query(By.css('[data-testid="pageTitle"]'));
    expect(debugTitle).toBeTruthy();
    const h1 = debugTitle.nativeElement as HTMLHeadingElement;
    expect(h1.textContent.trim()).toBe('Test Page Title');
  });

  test('should render subtitle when input is provided', () => {
    fixture.componentRef.setInput('subtitle', 'Test Page Subtitle');
    fixture.detectChanges();
    const debugSubtitle = fixture.debugElement.query(By.css('[data-testid="pageSubtitle"]'));
    expect(debugSubtitle).toBeTruthy();
    const p = debugSubtitle.nativeElement as HTMLParagraphElement;
    expect(p.textContent.trim()).toBe('Test Page Subtitle');
  });

  test('should not render subtitle when input is not provided', () => {
    fixture.componentRef.setInput('subtitle', '');
    fixture.detectChanges();
    const debugSubtitle = fixture.debugElement.query(By.css('[data-testid="pageSubtitle"]'));
    expect(debugSubtitle).toBeNull();
  });

  test('should render back button', () => {
    const backElement = fixture.debugElement.query(By.css('[data-testid="backToButton"]'));
    expect(backElement).toBeTruthy();
  });
});
