import { Component, computed, inject, resource, signal } from '@angular/core';
import { Pocket } from '@pocket/application/use-cases/pocket/pocket';
import { PocketSimulation, SimulationParams } from '@pocket/domain/models/simulation.model';
import {
  MAX_INCREMENTAL_AMOUNT,
  MAX_INVESTED_AMOUNT,
  MAX_TERM_IN_MONTHS,
  MIN_INCREMENTAL_AMOUNT,
  MIN_INVESTED_AMOUNT,
  MIN_TERM_IN_MONTHS,
} from '@pocket/ui/utils/simulation.constants';
import { FailedBanksAlert, PageHeader } from 'invest-web-lib';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PocketProviders } from '@pocket/config/pocket.config';
import { SimulationsTable } from '@pocket/ui/components/simulations-table/simulations-table';

@Component({
  selector: 'app-simulate',
  imports: [ReactiveFormsModule, FailedBanksAlert, SimulationsTable, PageHeader],
  templateUrl: './simulate.html',
  styleUrl: './simulate.css',
  providers: [...PocketProviders],
})
export class Simulate {
  readonly MIN_TERM_IN_MONTHS = MIN_TERM_IN_MONTHS;
  readonly MAX_TERM_IN_MONTHS = MAX_TERM_IN_MONTHS;

  private readonly _pocketUseCase = inject(Pocket);

  readonly failedBanksMessage = 'No se encontraron datos para tu simulación por parte de los bancos';

  readonly simulationForm = new FormGroup({
    investedAmount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(MIN_INVESTED_AMOUNT),
      Validators.max(MAX_INVESTED_AMOUNT),
    ]),
    termInMonths: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(MIN_TERM_IN_MONTHS),
      Validators.max(MAX_TERM_IN_MONTHS),
    ]),
    monthlyIncrement: new FormControl<number | null>(null, [
      Validators.min(MIN_INCREMENTAL_AMOUNT),
      Validators.max(MAX_INCREMENTAL_AMOUNT),
    ]),
  });
  readonly simulationParams = signal<SimulationParams | null>(null);

  /**
   * NOTE: Using firstValueFrom to adapt Observable to Promise for resource loader
   * because there is an issue with rxResource.
   */
  readonly simulationsResource = resource({
    params: () => this.simulationParams() ?? undefined,
    loader: ({ params }) =>
      firstValueFrom(
        this._pocketUseCase.simulatePocket(params.investedAmount, params.termInMonths, params.monthlyIncrement)
      ),
  });

  readonly showFailedBanks = computed(
    () => !this.simulationsResource.error() && this.simulationsResource.value()?.failedBanks?.length
  );

  readonly simulationsList = computed<PocketSimulation[]>(() => {
    if (this.simulationsResource.error()) {
      return [];
    }
    return this.simulationsResource.value()?.simulations ?? [];
  });

  doSimulation() {
    const investedAmount = this.simulationForm.get('investedAmount')!.value!;
    const termInMonths = this.simulationForm.get('termInMonths')!.value!;
    const monthlyIncrement = this.simulationForm.get('monthlyIncrement')!.value ?? undefined;
    this.simulationParams.set({ investedAmount, termInMonths, monthlyIncrement });
  }
}
