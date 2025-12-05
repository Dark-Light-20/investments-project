import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
})
export class Pagination<T = unknown> {
  readonly items = input.required<T[]>();
  readonly itemsLabel = input('items');

  readonly currentPage = signal(1);
  readonly pageSize = signal(10);

  readonly totalItems = computed(() => this.items().length);

  readonly totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  readonly Math = Math;

  readonly initIndex = computed(() => {
    return (this.currentPage() - 1) * this.pageSize();
  });
  readonly endIndex = computed(() => {
    return this.currentPage() * this.pageSize();
  });
  readonly paginationLabel = computed(() => {
    return `Mostrando ${this.initIndex() + 1} - ${Math.min(this.endIndex(), this.totalItems())} de ${this.totalItems()} ${this.itemsLabel()}`;
  });

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const maxVisible = 5;
    const pages: number[] = [];

    if (total <= maxVisible + 2) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, current - 1);
      let end = Math.min(total - 1, current + 1);

      if (current <= 3) {
        end = Math.min(maxVisible - 1, total - 1);
      } else if (current >= total - 2) {
        start = Math.max(2, total - maxVisible + 2);
      }

      if (start > 2) {
        pages.push(-1); // -1 represents "..."
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < total - 1) {
        pages.push(-1); // -1 represents "..."
      }

      pages.push(total);
    }

    return pages;
  });

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }
}
