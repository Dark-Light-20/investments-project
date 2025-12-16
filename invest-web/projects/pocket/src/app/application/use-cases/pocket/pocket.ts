import { inject, Injectable } from '@angular/core';
import { PocketGateway } from '@pocket/domain/models/pocket.gateway';

@Injectable({
  providedIn: 'root',
})
export class Pocket {
  private readonly _pocketGateway = inject(PocketGateway);

  getAllPocketRates() {
    return this._pocketGateway.getPocketRates();
  }

  simulatePocket(investedAmount: number, termInMonths: number, monthlyIncrement?: number) {
    return this._pocketGateway.simulatePocket(investedAmount, termInMonths, monthlyIncrement);
  }
}
