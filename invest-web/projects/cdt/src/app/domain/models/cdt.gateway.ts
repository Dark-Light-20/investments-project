import { Observable } from 'rxjs';
import { CdtRatesResponse } from './cdt.model';
import { CdtSimulationResponse } from './simulation.model';

export abstract class CdtGateway {
  abstract getCdtRates(): Observable<CdtRatesResponse>;
  abstract simulateCdt(investedAmount: number, termInDays: number): Observable<CdtSimulationResponse>;
}
