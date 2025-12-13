import { Component, computed, inject, resource, viewChild } from '@angular/core';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { firstValueFrom } from 'rxjs';
import { CdtProviders } from '@cdt/config/cdt.config';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { BankLogoPipe } from '@cdt/ui/pipes/bank-logo-pipe';
import { SortRates } from '@cdt/ui/components/sort-rates/sort-rates';
import { FailedBanksAlert } from '@cdt/ui/components/failed-banks-alert/failed-banks-alert';
import { CdtRate } from '@cdt/domain/models/cdt.model';
import { Pagination } from '@cdt/ui/components/pagination/pagination';
import { PageHeader } from 'invest-web-lib';

@Component({
  selector: 'app-rates',
  imports: [BankLogoPipe, RatePropertiesPipe, NgOptimizedImage, SortRates, FailedBanksAlert, Pagination, PageHeader],
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

  readonly ratesList = computed<{ rates: CdtRate[] }>(() => {
    const emptyData = { rates: [] };
    if (this.ratesResource.error()) {
      return emptyData;
    }
    return this.ratesResource.value() ?? emptyData;
  });

  readonly paginationComponent = viewChild<Pagination>('pagination');
}
