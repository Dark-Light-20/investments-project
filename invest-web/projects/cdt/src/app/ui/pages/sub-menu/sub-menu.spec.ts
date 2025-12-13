import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenu } from './sub-menu';
import { By } from '@angular/platform-browser';
import { SubMenu as SubMenuLib } from 'invest-web-lib';
import { MockComponent } from 'ng-mocks';

describe('SubMenu', () => {
  let component: SubMenu;
  let fixture: ComponentFixture<SubMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenu, MockComponent(SubMenuLib)],
    }).compileComponents();

    fixture = TestBed.createComponent(SubMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render sub menu component with link items correctly', () => {
    const subMenuElement = fixture.debugElement.query(By.directive(SubMenuLib));
    expect(subMenuElement).toBeTruthy();
    expect(subMenuElement.componentInstance.links).toEqual(component.links);
    expect(subMenuElement.componentInstance.backLink).toEqual('/');
    expect(subMenuElement.componentInstance.title).toEqual(component.title);
    expect(subMenuElement.componentInstance.description).toEqual(component.description);
  });
});
