import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenu, SubMenuLink } from './sub-menu';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { PageHeader } from '../page-header/page-header';
import { MockComponent } from 'ng-mocks';

const mockLinks: SubMenuLink[] = [
  {
    title: 'Link 1',
    route: '/link1',
    description: 'Description for Link 1',
    linkText: 'Go to Link 1',
    icon: { name: 'icon1', svg: ['<svg></svg>'] },
  },
  {
    title: 'Link 2',
    route: '/link2',
    description: 'Description for Link 2',
    linkText: 'Go to Link 2',
    icon: { name: 'icon2', svg: ['<svg></svg>'] },
  },
];

describe('SubMenu', () => {
  let component: SubMenu;
  let fixture: ComponentFixture<SubMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenu, MockComponent(PageHeader)],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SubMenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', mockLinks);
    fixture.componentRef.setInput('backLink', '/');
    fixture.componentRef.setInput('title', 'Test SubMenu Title');
    fixture.componentRef.setInput('description', 'Test SubMenu Description');
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render page header', () => {
    const pageHeaderDebug = fixture.debugElement.query(By.directive(PageHeader));
    expect(pageHeaderDebug).toBeTruthy();
    const pageHeaderInstance = pageHeaderDebug.componentInstance as PageHeader;
    expect(pageHeaderInstance.backLink).toBe(component.backLink());
    expect(pageHeaderInstance.title).toBe(component.title());
    expect(pageHeaderInstance.subtitle).toBe(component.description());
  });

  test('should render link items correctly', () => {
    const linkItems = fixture.debugElement.queryAll(By.css('[data-testid^="linkItemCard"]'));
    expect(linkItems).toHaveLength(component.links().length);

    for (const [index, link] of component.links().entries()) {
      const linkItem = linkItems[index];

      const titleElement = linkItem.query(By.css(`[data-testid="linkItemTitle${link.title}"]`))?.nativeElement;
      expect(titleElement?.textContent).toContain(link.title);

      const descriptionElement = linkItem.query(
        By.css(`[data-testid="linkItemDescription${link.title}"]`)
      )?.nativeElement;
      expect(descriptionElement?.textContent).toContain(link.description);

      const linkElement = linkItem.query(By.css(`[data-testid="linkItemLink${link.title}"]`))
        ?.nativeElement as HTMLAnchorElement;
      expect(linkElement.textContent).toContain(link.linkText);
    }
  });
});
