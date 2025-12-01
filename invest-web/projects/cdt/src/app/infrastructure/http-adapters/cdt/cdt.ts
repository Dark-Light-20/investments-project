import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from '@cdt/environments/environment';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { Bank, CdtRate, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';
import { cdtMapper } from './cdt.mapper';
import { InvestCDTRequest, InvestResult, RateResult } from '@cdt/infrastructure/models/cdt.rq';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { CdtSimulation, CdtSimulationResponse } from '@cdt/domain/models/simulation.model';

const REQUEST_DELAY_MS = 1000;

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
        delay(REQUEST_DELAY_MS),
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

  simulateCdt(investedAmount: number, termInDays: number): Observable<CdtSimulationResponse> {
    const entries = Object.entries(this._baseUrls);

    const simulationBody: InvestCDTRequest = {
      amount: investedAmount,
      term: termInDays,
      termUnit: CDTTermUnit.DAYS,
    };

    const rateRequests = entries.map(([bank, url]) =>
      this._http.post<CdtRateDTO>(`${url}/cdt/calculateRate`, simulationBody).pipe(
        delay(REQUEST_DELAY_MS),
        map((data): RateResult => ({ success: true, data: cdtMapper(data, bank as Bank), bank: bank as Bank })),
        catchError((): Observable<RateResult> => of({ success: false, bank: bank as Bank }))
      )
    );

    const investRequests = entries.map(([bank, url]) =>
      this._http.post<number>(`${url}/cdt/calculateInvest`, simulationBody).pipe(
        delay(REQUEST_DELAY_MS),
        map((data): InvestResult => ({ success: true, data, bank: bank as Bank })),
        catchError((): Observable<InvestResult> => of({ success: false, bank: bank as Bank }))
      )
    );

    return forkJoin([...rateRequests, ...investRequests]).pipe(
      map(results => {
        const rateResults = results.slice(0, entries.length) as RateResult[];
        const investResults = results.slice(entries.length) as InvestResult[];

        const simulations: CdtSimulation[] = [];
        const failedBanksSet = new Set<Bank>();

        for (const rateResult of rateResults) {
          if (rateResult.success) {
            const investResult = investResults.find(
              investRes => investRes.bank === rateResult.bank && investRes.success
            );
            if (investResult?.success) {
              simulations.push({ ...rateResult.data, totalInterest: investResult.data });
            } else {
              failedBanksSet.add(rateResult.bank);
            }
          } else {
            failedBanksSet.add(rateResult.bank);
          }
        }

        for (const investResult of investResults) {
          if (!investResult.success) {
            failedBanksSet.add(investResult.bank);
          }
        }

        const failedBanks = Array.from(failedBanksSet);

        if (failedBanks.length === entries.length) {
          throw new Error('All simulation sources failed');
        }

        return { simulations, failedBanks };
      })
    );
  }
}
