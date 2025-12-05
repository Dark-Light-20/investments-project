import { Observable } from 'rxjs';
import { FicsResponse } from './fic.model';

export abstract class FicGateway {
  abstract getFicRates(): Observable<FicsResponse>;
}
