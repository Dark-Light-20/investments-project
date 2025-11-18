import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockComponents } from 'ng-mocks';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { BanksListComponent } from '../../components/banks-list/banks-list.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, MockComponents(HeroComponent, FeaturesComponent, BanksListComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render HeroComponent, FeaturesComponent, and BanksListComponent', () => {
    const heroElement = fixture.debugElement.query(By.directive(HeroComponent));
    const featuresElement = fixture.debugElement.query(By.directive(FeaturesComponent));
    const banksListElement = fixture.debugElement.query(By.directive(BanksListComponent));

    expect(heroElement).toBeTruthy();
    expect(featuresElement).toBeTruthy();
    expect(banksListElement).toBeTruthy();
  });
});
