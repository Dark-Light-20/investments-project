import { Component, computed, inject, resource, viewChild } from '@angular/core';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import { firstValueFrom } from 'rxjs';
import { CdtProviders } from '@cdt/config/cdt.config';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { BankLogoPipe } from '@cdt/ui/pipes/bank-logo-pipe';
import { CdtRate } from '@cdt/domain/models/cdt.model';
import { FailedBanksAlert, PageHeader, Pagination, SortList, SortType } from 'invest-web-lib';

@Component({
  selector: 'app-rates',
  imports: [BankLogoPipe, RatePropertiesPipe, NgOptimizedImage, SortList, FailedBanksAlert, Pagination, PageHeader],
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

  readonly ratesList = computed<CdtRate[]>(() => {
    if (this.ratesResource.error()) {
      return [];
    }
    return this.ratesResource.value()?.rates ?? [];
  });

  readonly sortComparators: Record<SortType, (a: CdtRate, b: CdtRate) => number> = {
    [SortType.RATE]: (a, b) => b.rate - a.rate,
    [SortType.BANK]: (a, b) => a.bankName.localeCompare(b.bankName),
  };

  readonly paginationComponent = viewChild<Pagination>('pagination');
}
