import { NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { CdtSimulation } from '@cdt/domain/models/simulation.model';
import { SortType } from '@cdt/ui/models/sort.model';

@Component({
  selector: 'app-sort-simulations',
  imports: [NgClass],
  templateUrl: './sort-simulations.html',
})
export class SortSimulations<T extends { simulations: CdtSimulation[] }> {
  readonly simulations = input.required<T>();
  readonly changedFilter = output<SortType>();

  readonly SortType = SortType;
  readonly selectedFilter = signal<SortType>(SortType.RATE);
  protected readonly rateSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.RATE));
  protected readonly bankSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.BANK));

  readonly sortedSimulations = computed(() => {
    const data = this.simulations();
    const filter = this.selectedFilter();

    switch (filter) {
      case SortType.RATE:
        data.simulations.sort((a, b) => b.rate.rate - a.rate.rate);
        break;
      case SortType.BANK:
        data.simulations.sort((a, b) => a.bankName.localeCompare(b.bankName));
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
