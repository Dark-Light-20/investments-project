import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@cdt/environments/environment';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { Bank, CdtRate, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';
import { cdtMapper } from './cdt.mapper';

@Injectable({
  providedIn: 'root',
})
export class Cdt implements CdtGateway {
  private readonly _http = inject(HttpClient);

  private readonly _baseUrls: Record<Bank, string> = {
    [Bank.Ban100]: environment.ban100Url,
    [Bank.Bancolombia]: environment.bancolombiaUrl,
    [Bank.BancoDeBogota]: environment.bancoDeBogotaUrl,
    [Bank.Finandina]: environment.finandinaUrl,
    [Bank.Nu]: environment.nuUrl,
  };

  getCdtRates(): Observable<CdtRatesResponse> {
    const entries = Object.entries(this._baseUrls);

    const requests = entries.map(([bank, url]) =>
      this._http.get<CdtRateDTO[]>(`${url}/cdt/rates`).pipe(
        map(data => ({ success: true, data: data.map(dto => cdtMapper(dto, bank as Bank)) })),
        catchError(() => of({ success: false, bank: bank as Bank }))
      )
    );

    return forkJoin(requests).pipe(
      map(results => {
        const rates: CdtRate[] = results
          .filter((r): r is { success: true; data: CdtRate[] } => r.success)
          .flatMap(r => r.data);

        const failedBanks: Bank[] = results
          .filter((r): r is { success: false; bank: Bank } => !r.success)
          .map(r => r.bank);

        if (failedBanks.length === entries.length) {
          throw new Error('All rate sources failed');
        }

        return { rates, failedBanks };
      })
    );
  }
}
