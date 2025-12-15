import { CurrencyPipe, NgClass, NgOptimizedImage, NgTemplateOutlet, PercentPipe } from '@angular/common';
import { AfterViewInit, Component, computed, inject, resource, viewChild } from '@angular/core';
import { Fic } from '@fic/application/use-cases/fic/fic';
import { FicProviders } from '@fic/config/fic.config';
import { BankLogoPipe } from '@fic/ui/pipes/bank-logo-pipe';
import { firstValueFrom } from 'rxjs';
import { Fic as FicModel } from '@fic/domain/models/fic.model';
import { FailedBanksAlert, PageHeader, Pagination, SortList, SortType } from 'invest-web-lib';

@Component({
  selector: 'app-rates',
  imports: [
    SortList,
    FailedBanksAlert,
    Pagination,
    PercentPipe,
    BankLogoPipe,
    NgOptimizedImage,
    NgTemplateOutlet,
    NgClass,
    PageHeader,
  ],
  templateUrl: './rates.html',
  providers: [...FicProviders, CurrencyPipe],
})
export class Rates implements AfterViewInit {
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

  readonly ratesList = computed<FicModel[]>(() => {
    if (this.ratesResource.error()) {
      return [];
    }
    return this.ratesResource.value()?.fics ?? [];
  });

  readonly sortComparators: Record<SortType, (a: FicModel, b: FicModel) => number> = {
    [SortType.RATE]: (a, b) => b.rates[0].rate - a.rates[0].rate,
    [SortType.BANK]: (a, b) => a.bankName.localeCompare(b.bankName),
  };

  readonly sortListComponent = viewChild<SortList<FicModel>>('sortedRatesList');
  readonly paginationComponent = viewChild<Pagination>('pagination');

  ngAfterViewInit(): void {
    this.sortListComponent()?.changeFilter(SortType.BANK);
  }

  findRateByDays(fic: FicModel, days: number | number[]) {
    if (Array.isArray(days)) {
      return fic.rates.find(rate => days.includes(rate.historicDays));
    }
    return fic.rates.find(rate => rate.historicDays === days);
  }
}
