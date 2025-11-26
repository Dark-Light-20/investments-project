import { Observable } from 'rxjs';
import { CdtRatesResponse } from './cdt.model';

export abstract class CdtGateway {
  abstract getCdtRates(): Observable<CdtRatesResponse>;
}
