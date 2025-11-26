import { Component, computed, inject, resource } from '@angular/core';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { BankInitialsPipe } from '@cdt/ui/pipes/bank-initials-pipe';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { firstValueFrom } from 'rxjs';
import { CdtProviders } from '@cdt/config/cdt.config';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-rates',
  imports: [BankInitialsPipe, RatePropertiesPipe],
  templateUrl: './rates.html',
  providers: [...CdtProviders, CurrencyPipe],
})
export class Rates {
  private readonly _cdtUseCase = inject(Cdt);

  /* 
  NOTE: Using firstValueFrom to adapt Observable to Promise for resource loader 
  because there is an issue with rxResource.
  */
  ratesResource = resource({
    loader: () => firstValueFrom(this._cdtUseCase.getAllCDTRates()),
  });

  showFailedBanks = computed(() => !this.ratesResource.error() && this.ratesResource.value()?.failedBanks?.length);
}
