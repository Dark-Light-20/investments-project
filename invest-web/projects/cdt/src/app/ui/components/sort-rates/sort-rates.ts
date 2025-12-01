import { NgClass } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { CdtRate } from '@cdt/domain/models/cdt.model';
import { SortType } from '@cdt/ui/models/sort.model';

@Component({
  selector: 'app-sort-rates',
  imports: [NgClass],
  templateUrl: './sort-rates.html',
})
export class SortRates<T extends { rates: CdtRate[] }> {
  readonly rates = input.required<T>();

  readonly SortType = SortType;
  readonly selectedFilter = signal<SortType | undefined>(undefined);
  protected readonly rateSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.RATE));
  protected readonly bankSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.BANK));

  readonly sortedRates = computed(() => {
    const data = this.rates();
    const filter = this.selectedFilter();

    switch (filter) {
      case SortType.RATE:
        data.rates.sort((a, b) => b.rate - a.rate);
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
}
