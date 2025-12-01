import { NgClass } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { CdtRate } from '@cdt/domain/models/cdt.model';
import { SortType } from '@cdt/ui/models/sort.model';

@Component({
  selector: 'app-sort-rates',
  imports: [NgClass],
  templateUrl: './sort-rates.html',
})
export class SortRates {
  readonly rates = input.required<CdtRate[]>();

  readonly SortType = SortType;
  readonly selectedFilter = signal<SortType | undefined>(undefined);
  protected readonly rateSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.RATE));
  protected readonly bankSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.BANK));

  readonly sortedRates = computed(() => {
    const resourceData = this.rates();
    if (!resourceData.length) return [];

    const rates = resourceData;
    const filter = this.selectedFilter();

    switch (filter) {
      case SortType.RATE:
        return rates.toSorted((a, b) => b.rate - a.rate);
      case SortType.BANK:
        return rates.toSorted((a, b) => a.bankName.localeCompare(b.bankName));
      default:
        return rates;
    }
  });

  private getSortButtonClasses(type: SortType) {
    return this.selectedFilter() === type
      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      : 'text-gray-600 hover:bg-gray-200';
  }
}
