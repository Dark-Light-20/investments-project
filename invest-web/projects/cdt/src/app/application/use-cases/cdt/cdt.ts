import { inject, Injectable } from '@angular/core';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { SimulationParams } from '@cdt/domain/models/simulation.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cdt {
  private readonly _cdtGateway = inject(CdtGateway);

  getAllCDTRates() {
    return this._cdtGateway.getCdtRates().pipe(
      map(response => ({
        ...response,
        rates: response.rates.filter(rate => rate.termUnit === CDTTermUnit.DAYS && rate.rate > 0),
      }))
    );
  }

  simulateCdt(params: SimulationParams) {
    return this._cdtGateway.simulateCdt(params.investedAmount, params.termInDays);
  }
}
