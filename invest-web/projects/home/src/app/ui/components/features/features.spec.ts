import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Features } from './features';
import { By } from '@angular/platform-browser';

describe('Features', () => {
  let component: Features;
  let fixture: ComponentFixture<Features>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
    }).compileComponents();

    fixture = TestBed.createComponent(Features);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render all features', () => {
    const featureItems = fixture.debugElement.queryAll(By.css('[data-testid^="featureItem"]'));
    expect(featureItems).toHaveLength(component.features.length);
    featureItems.forEach((item, index) => {
      const title = item.query(By.css('h4')).nativeElement.textContent;
      const description = item.query(By.css('p')).nativeElement.textContent;
      expect(title).toContain(component.features[index].title);
      expect(description).toContain(component.features[index].description);
    });
  });
});
