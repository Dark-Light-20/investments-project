import { NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

export enum SortType {
  RATE = 'rate',
  BANK = 'bank',
}

@Component({
  selector: 'lib-sort-list',
  imports: [NgClass],
  templateUrl: './sort-list.html',
})
export class SortList<T> {
  readonly items = input.required<T[]>();
  readonly comparators = input.required<Record<SortType, (a: T, b: T) => number>>();
  readonly changedFilter = output<SortType>();

  readonly SortType = SortType;
  readonly selectedFilter = signal<SortType>(SortType.RATE);
  protected readonly rateSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.RATE));
  protected readonly bankSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.BANK));

  readonly sortedItems = computed(() => {
    const filter = this.selectedFilter();
    const comparator = this.comparators()[filter];
    return comparator ? this.items().toSorted(comparator) : this.items();
  });

  private getSortButtonClasses(type: SortType) {
    return this.selectedFilter() === type
      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      : 'text-gray-600 hover:bg-gray-200';
  }

  changeFilter(type: SortType) {
    this.selectedFilter.set(type);
    this.changedFilter.emit(type);
  }
}
