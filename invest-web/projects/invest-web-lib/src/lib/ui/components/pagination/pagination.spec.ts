import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagination } from './pagination';

const totalItems = 55;

describe('Pagination', () => {
  let component: Pagination<string>;
  let fixture: ComponentFixture<Pagination<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagination<string>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'items',
      Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`)
    );
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pagination calculations', () => {
    test('should calculate total items correctly', () => {
      expect(component.totalItems()).toBe(totalItems);
    });

    test('should calculate total pages correctly', () => {
      expect(component.totalPages()).toBe(Math.ceil(totalItems / component.pageSize()));
    });

    test('should generate correct pagination label for first page', () => {
      expect(component.paginationLabel()).toBe('Mostrando 1 - 10 de 55 items');
    });

    test('should generate correct pagination label for last page', () => {
      component.currentPage.set(6);
      expect(component.paginationLabel()).toBe('Mostrando 51 - 55 de 55 items');
    });

    test('should use custom itemsLabel in pagination label', () => {
      fixture.componentRef.setInput('itemsLabel', 'tasas');
      fixture.detectChanges();
      expect(component.paginationLabel()).toBe('Mostrando 1 - 10 de 55 tasas');
    });
  });

  describe('Page navigation', () => {
    test('should navigate to next page', () => {
      component.nextPage();
      expect(component.currentPage()).toBe(2);
    });

    test('should navigate to previous page', () => {
      component.currentPage.set(3);
      component.previousPage();
      expect(component.currentPage()).toBe(2);
    });

    test('should not go below page 1 when calling previousPage', () => {
      component.previousPage();
      expect(component.currentPage()).toBe(1);
    });

    test('should not go beyond last page when calling nextPage', () => {
      component.currentPage.set(6);
      component.nextPage();
      expect(component.currentPage()).toBe(6);
    });

    test('should navigate directly to specific page', () => {
      component.goToPage(4);
      expect(component.currentPage()).toBe(4);
    });
  });

  describe('Visible pages calculation', () => {
    test('should show all pages when total pages <= 7', () => {
      fixture.componentRef.setInput(
        'items',
        Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)
      );
      fixture.detectChanges();
      const visiblePages = component.visiblePages();
      expect(visiblePages).toEqual([1, 2, 3]);
    });

    test('should show pages with ellipsis when on first page with many pages', () => {
      fixture.componentRef.setInput(
        'items',
        Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`)
      );
      fixture.detectChanges();
      const visiblePages = component.visiblePages();
      expect(visiblePages).toEqual([1, 2, 3, 4, -1, 20]);
    });

    test('should show pages with ellipsis on both sides when on middle page', () => {
      fixture.componentRef.setInput(
        'items',
        Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`)
      );
      fixture.detectChanges();
      component.currentPage.set(10);
      const visiblePages = component.visiblePages();
      expect(visiblePages[0]).toBe(1);
      const lastPageIndex = visiblePages.length - 1;
      expect(visiblePages[lastPageIndex]).toBe(20);
      expect(visiblePages.includes(10)).toBe(true);
      expect(visiblePages.filter(p => p === -1)).toHaveLength(2);
    });

    test('should show pages with ellipsis when on last page', () => {
      fixture.componentRef.setInput(
        'items',
        Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`)
      );
      fixture.detectChanges();
      component.currentPage.set(20);
      const visiblePages = component.visiblePages();
      expect(visiblePages).toEqual([1, -1, 17, 18, 19, 20]);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty items array', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      expect(component.totalItems()).toBe(0);
      expect(component.totalPages()).toBe(0);
      expect(component.paginationLabel()).toBe('Mostrando 1 - 0 de 0 items');
    });

    test('should handle single item', () => {
      fixture.componentRef.setInput('items', ['Item 1']);
      fixture.detectChanges();
      expect(component.totalPages()).toBe(1);
      expect(component.paginationLabel()).toBe('Mostrando 1 - 1 de 1 items');
    });

    test('should work with different data types (numbers)', () => {
      const numberFixture = TestBed.createComponent(Pagination<number>);
      const numberComponent = numberFixture.componentInstance;
      numberFixture.componentRef.setInput('items', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      numberFixture.detectChanges();
      expect(numberComponent.totalItems()).toBe(11);
      expect(numberComponent.totalPages()).toBe(2);
    });

    test('should work with different data types (objects)', () => {
      interface TestItem {
        id: number;
        name: string;
      }
      const objectFixture = TestBed.createComponent(Pagination<TestItem>);
      const objectComponent = objectFixture.componentInstance;
      objectFixture.componentRef.setInput('items', [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ]);
      objectFixture.detectChanges();
      expect(objectComponent.totalItems()).toBe(3);
      expect(objectComponent.totalPages()).toBe(1);
    });
  });

  describe('Page size changes', () => {
    test('should recalculate pages when page size changes', () => {
      expect(component.totalPages()).toBe(6);
      component.pageSize.set(20);
      expect(component.totalPages()).toBe(3);
    });

    test('should recalculate pagination label when page size changes', () => {
      component.pageSize.set(20);
      expect(component.paginationLabel()).toBe('Mostrando 1 - 20 de 55 items');
    });
  });
});
