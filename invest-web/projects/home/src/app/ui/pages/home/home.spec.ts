import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { MockComponents } from 'ng-mocks';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { BanksList } from '../../components/banks-list/banks-list';
import { By } from '@angular/platform-browser';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, MockComponents(Hero, Features, BanksList)],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render HeroComponent, FeaturesComponent, and BanksListComponent', () => {
    const heroElement = fixture.debugElement.query(By.directive(Hero));
    const featuresElement = fixture.debugElement.query(By.directive(Features));
    const banksListElement = fixture.debugElement.query(By.directive(BanksList));

    expect(heroElement).toBeTruthy();
    expect(featuresElement).toBeTruthy();
    expect(banksListElement).toBeTruthy();
  });
});
