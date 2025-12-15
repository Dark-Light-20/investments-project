import { CurrencyPipe, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { Cdt } from '@cdt/application/use-cases/cdt/cdt';
import { CdtProviders } from '@cdt/config/cdt.config';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdtSimulation, SimulationParams } from '@cdt/domain/models/simulation.model';
import { BankLogoPipe } from '@cdt/ui/pipes/bank-logo-pipe';
import { RatePropertiesPipe } from '@cdt/ui/pipes/rate-properties-pipe';
import {
  MAX_INVESTED_AMOUNT,
  MAX_TERM_IN_DAYS,
  MIN_INVESTED_AMOUNT,
  MIN_TERM_IN_DAYS,
} from '@cdt/ui/utils/simulation.constants';
import { FailedBanksAlert, PageHeader, SortList, SortType } from 'invest-web-lib';

@Component({
  selector: 'app-simulate',
  imports: [
    SortList,
    ReactiveFormsModule,
    FailedBanksAlert,
    NgOptimizedImage,
    BankLogoPipe,
    CurrencyPipe,
    NgTemplateOutlet,
    RatePropertiesPipe,
    PageHeader,
  ],
  templateUrl: './simulate.html',
  providers: [...CdtProviders, CurrencyPipe],
  styleUrls: ['./simulate.css'],
})
export class Simulate {
  private readonly _cdtUseCase = inject(Cdt);

  readonly failedBanksMessage = 'No se encontraron datos para tu simulación por parte de los bancos';

  readonly simulationForm = new FormGroup({
    investedAmount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(MIN_INVESTED_AMOUNT),
      Validators.max(MAX_INVESTED_AMOUNT),
    ]),
    termInDays: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(MIN_TERM_IN_DAYS),
      Validators.max(MAX_TERM_IN_DAYS),
    ]),
  });
  readonly simulationParams = signal<SimulationParams | null>(null);

  /* 
  NOTE: Using firstValueFrom to adapt Observable to Promise for resource loader 
  because there is an issue with rxResource.
  */
  readonly simulationsResource = resource({
    params: () => this.simulationParams() ?? undefined,
    loader: ({ params }) => firstValueFrom(this._cdtUseCase.simulateCdt(params)),
  });

  readonly showFailedBanks = computed(
    () => !this.simulationsResource.error() && this.simulationsResource.value()?.failedBanks?.length
  );

  readonly simulationsList = computed<CdtSimulation[]>(() => {
    if (this.simulationsResource.error()) {
      return [];
    }
    return this.simulationsResource.value()?.simulations ?? [];
  });

  readonly sortComparators: Record<SortType, (a: CdtSimulation, b: CdtSimulation) => number> = {
    [SortType.RATE]: (a, b) => b.rate.rate - a.rate.rate,
    [SortType.BANK]: (a, b) => a.bankName.localeCompare(b.bankName),
  };

  doSimulation() {
    const investedAmount = this.simulationForm.get('investedAmount')!.value!;
    const termInDays = this.simulationForm.get('termInDays')!.value!;
    this.simulationParams.set({ investedAmount, termInDays });
  }
}
