import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesComponent } from './features.component';
import { By } from '@angular/platform-browser';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render all features', () => {
    const featureItems = fixture.debugElement.queryAll(By.css('[data-testid^="featureItem"]'));
    expect(featureItems.length).toBe(component.features.length);
    featureItems.forEach((item, index) => {
      const title = item.query(By.css('h4')).nativeElement.textContent;
      const description = item.query(By.css('p')).nativeElement.textContent;
      expect(title).toContain(component.features[index].title);
      expect(description).toContain(component.features[index].description);
    });
  });
});
