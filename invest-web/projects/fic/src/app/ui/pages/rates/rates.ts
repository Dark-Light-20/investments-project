import { CurrencyPipe, NgClass, NgOptimizedImage, NgTemplateOutlet, PercentPipe } from '@angular/common';
import { Component, computed, inject, resource, viewChild } from '@angular/core';
import { Fic } from '@fic/application/use-cases/fic/fic';
import { FicProviders } from '@fic/config/fic.config';
import { FailedBanksAlert } from '@fic/ui/components/failed-banks-alert/failed-banks-alert';
import { SortRates } from '@fic/ui/components/sort-rates/sort-rates';
import { BankLogoPipe } from '@fic/ui/pipes/bank-logo-pipe';
import { firstValueFrom } from 'rxjs';
import { Fic as FicModel } from '@fic/domain/models/fic.model';
import { Pagination } from '@fic/ui/components/pagination/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rates',
  imports: [
    SortRates,
    FailedBanksAlert,
    Pagination,
    PercentPipe,
    BankLogoPipe,
    NgOptimizedImage,
    NgTemplateOutlet,
    NgClass,
    RouterLink,
  ],
  templateUrl: './rates.html',
  providers: [...FicProviders, CurrencyPipe],
})
export class Rates {
  private readonly _ficUseCase = inject(Fic);

  /* 
  NOTE: Using firstValueFrom to adapt Observable to Promise for resource loader 
  because there is an issue with rxResource.
  */
  readonly ratesResource = resource({
    loader: () => firstValueFrom(this._ficUseCase.getAllFicRates()),
  });

  readonly showFailedBanks = computed(
    () => !this.ratesResource.error() && this.ratesResource.value()?.failedBanks?.length
  );

  readonly ratesList = computed<{ rates: FicModel[] }>(() => {
    const emptyData = { rates: [] };
    if (this.ratesResource.error()) {
      return emptyData;
    }
    return { rates: this.ratesResource.value()?.fics ?? [] };
  });

  readonly paginationComponent = viewChild<Pagination>('pagination');

  findRateByDays(fic: FicModel, days: number | number[]) {
    if (Array.isArray(days)) {
      return fic.rates.find(rate => days.includes(rate.historicDays));
    }
    return fic.rates.find(rate => rate.historicDays === days);
  }
}
