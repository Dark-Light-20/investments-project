import { Component, computed, inject, resource } from '@angular/core';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { firstValueFrom } from 'rxjs';
import { CdtProviders } from '@cdt/config/cdt.config';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { BankLogoPipe } from '@cdt/ui/pipes/bank-logo-pipe';
import { SortRates } from '@cdt/ui/components/sort-rates/sort-rates';

@Component({
  selector: 'app-rates',
  imports: [BankLogoPipe, RatePropertiesPipe, NgOptimizedImage, SortRates],
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

  readonly ratesList = computed(() => {
    if (this.ratesResource.error()) {
      return [];
    }
    return this.ratesResource.value()?.rates || [];
  });
}
