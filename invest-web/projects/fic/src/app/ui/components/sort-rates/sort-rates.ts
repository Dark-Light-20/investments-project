import { NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { Fic } from '@fic/domain/models/fic.model';
import { SortType } from '@fic/domain/models/sort.model';

@Component({
  selector: 'app-sort-rates',
  imports: [NgClass],
  templateUrl: './sort-rates.html',
})
export class SortRates<T extends { rates: Fic[] }> {
  readonly rates = input.required<T>();
  readonly changedFilter = output<SortType>();

  readonly SortType = SortType;
  readonly selectedFilter = signal<SortType>(SortType.BANK);
  protected readonly rateSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.RATE));
  protected readonly bankSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.BANK));

  readonly sortedRates = computed(() => {
    const data = this.rates();
    const filter = this.selectedFilter();

    switch (filter) {
      case SortType.RATE:
        data.rates.sort((a, b) => b.rates[0].rate - a.rates[0].rate);
        break;
      case SortType.BANK:
        data.rates.sort((a, b) => a.bankName.localeCompare(b.bankName));
        break;
    }

    return data;
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
