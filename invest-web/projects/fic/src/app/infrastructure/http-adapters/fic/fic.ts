import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FicGateway } from '@fic/domain/models/fic.gateway';
import { Bank, FicsResponse, Fic as FicModel } from '@fic/domain/models/fic.model';
import { environment } from '@fic/environments/environment';
import { FicDTO } from '@fic/infrastructure/models/fic.dto';
import { catchError, delay, forkJoin, map, Observable, of } from 'rxjs';
import { ficMapper } from './fic.mapper';

const REQUEST_DELAY_MS = 1000;

@Injectable({
  providedIn: 'root',
})
export class Fic implements FicGateway {
  private readonly _http = inject(HttpClient);

  private readonly _ficListEndpoints: Record<string, string> = {
    [Bank.Bancolombia]: `${environment.bancolombiaUrl}${environment.ficListEndpoint}`,
    [Bank.BancoDeBogota]: `${environment.bancoDeBogotaUrl}${environment.ficListEndpoint}`,
  };

  getFicRates(): Observable<FicsResponse> {
    const entries = Object.entries(this._ficListEndpoints);

    const requests = entries.map(([bank, url]) =>
      this._http.get<FicDTO[]>(url).pipe(
        delay(REQUEST_DELAY_MS),
        map(data => ({ success: true, data: data.map(dto => ficMapper(dto, bank as Bank)) })),
        catchError(() => of({ success: false, bank: bank as Bank }))
      )
    );

    return forkJoin(requests).pipe(
      map(results => {
        const fics: FicModel[] = results
          .filter((r): r is { success: true; data: FicModel[] } => r.success)
          .flatMap(r => r.data);

        const failedBanks: Bank[] = results
          .filter((r): r is { success: false; bank: Bank } => !r.success)
          .map(r => r.bank);

        if (failedBanks.length === entries.length) {
          throw new Error('All rate sources failed');
        }

        return { fics, failedBanks };
      })
    );
  }
}
