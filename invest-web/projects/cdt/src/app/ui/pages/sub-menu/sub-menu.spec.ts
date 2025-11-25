import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenu } from './sub-menu';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('SubMenu', () => {
  let component: SubMenu;
  let fixture: ComponentFixture<SubMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenu],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SubMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render link items correctly', () => {
    const linkItems = fixture.debugElement.queryAll(By.css('[data-testid^="linkItemCard"]'));
    expect(linkItems).toHaveLength(component.links.length);

    component.links.forEach((link, index) => {
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
    });
  });
});
