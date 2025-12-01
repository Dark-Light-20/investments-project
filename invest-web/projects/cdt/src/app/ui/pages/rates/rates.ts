import { Component, computed, inject, resource, signal } from '@angular/core';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { BankInitialsPipe } from '@cdt/ui/pipes/bank-initials-pipe';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { firstValueFrom } from 'rxjs';
import { CdtProviders } from '@cdt/config/cdt.config';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SortType } from '@cdt/ui/models/sort.model';

@Component({
  selector: 'app-rates',
  imports: [BankInitialsPipe, RatePropertiesPipe, NgClass],
  templateUrl: './rates.html',
  providers: [...CdtProviders, CurrencyPipe],
})
export class Rates {
  private readonly _cdtUseCase = inject(Cdt);

  /* 
  NOTE: Using firstValueFrom to adapt Observable to Promise for resource loader 
  because there is an issue with rxResource.
  */
  readonly ratesResource = resource({
    loader: () => firstValueFrom(this._cdtUseCase.getAllCDTRates()),
  });

  readonly showFailedBanks = computed(
    () => !this.ratesResource.error() && this.ratesResource.value()?.failedBanks?.length
  );

  readonly SortType = SortType;
  readonly selectedFilter = signal<SortType | undefined>(undefined);
  readonly rateSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.RATE));
  readonly bankSortButtonClasses = computed(() => this.getSortButtonClasses(SortType.BANK));

  readonly sortedRates = computed(() => {
    const resourceData = this.ratesResource.value();
    if (!resourceData?.rates) return [];

    const rates = resourceData.rates;
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
