import { Observable } from 'rxjs';
import { PocketSimulationResponse } from './simulation.model';
import { PocketRatesResponse } from './pocket.model';

export abstract class PocketGateway {
  abstract getPocketRates(): Observable<PocketRatesResponse>;
  abstract simulatePocket(
    investedAmount: number,
    termInMonths: number,
    monthlyIncrement?: number
  ): Observable<PocketSimulationResponse>;
}
