import { inject, Injectable } from '@angular/core';
import { FicGateway } from '../../../domain/models/fic.gateway';

@Injectable({
  providedIn: 'root',
})
export class Fic {
  private readonly _ficGateway = inject(FicGateway);

  getAllFicRates() {
    return this._ficGateway.getFicRates();
  }
}
