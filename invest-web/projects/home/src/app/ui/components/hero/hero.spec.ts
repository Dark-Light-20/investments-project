import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render info button with correct attributes', () => {
    const infoButton = fixture.debugElement.query(By.css('[data-testid="heroInfoButton"]'));
    expect(infoButton).toBeTruthy();
    expect(infoButton.nativeElement.textContent).toContain(component.infoButton.label);
    expect(infoButton.nativeElement.getAttribute('href')).toContain(
      component.infoButton.link + '#' + component.infoButton.fragment
    );
  });

  test('should render all action buttons', () => {
    const actionButtons = fixture.debugElement.queryAll(By.css('[data-testid^="heroActionButton"]'));
    expect(actionButtons.length).toBe(component.actionButtons.length);
    actionButtons.forEach((button, index) => {
      expect(button.nativeElement.textContent).toContain(component.actionButtons[index].label);
      expect(button.nativeElement.getAttribute('href')).toBe(component.actionButtons[index].link);
    });
  });
});
