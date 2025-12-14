import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from '@cdt/environments/environment';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { Bank, CdtRate, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';
import { cdtMapper } from './cdt.mapper';
import { InvestCDTRequest, InvestResult } from '@cdt/infrastructure/models/cdt.rq';
import { CDTSimulation, CDTTermUnit } from '@dark-light-20/invest-domain';
import { CdtSimulation, CdtSimulationResponse } from '@cdt/domain/models/simulation.model';

const REQUEST_DELAY_MS = 1000;

@Injectable({
  providedIn: 'root',
})
export class Cdt implements CdtGateway {
  private readonly _http = inject(HttpClient);

  private readonly _rateListEndpoints: Record<Bank, string> = {
    [Bank.Ban100]: `${environment.ban100Url}${environment.rateListEndpoint}`,
    [Bank.Bancolombia]: `${environment.bancolombiaUrl}${environment.rateListEndpoint}`,
    [Bank.BancoDeBogota]: `${environment.bancoDeBogotaUrl}${environment.rateListEndpoint}`,
    [Bank.Finandina]: `${environment.finandinaUrl}${environment.rateListEndpoint}`,
    [Bank.Nu]: `${environment.nuUrl}${environment.rateListEndpoint}`,
  };

  private readonly _simulationEndpoints: Record<Bank, string> = {
    [Bank.Ban100]: `${environment.ban100Url}${environment.simulationEndpoint}`,
    [Bank.Bancolombia]: `${environment.bancolombiaUrl}${environment.simulationEndpoint}`,
    [Bank.BancoDeBogota]: `${environment.bancoDeBogotaUrl}${environment.simulationEndpoint}`,
    [Bank.Finandina]: `${environment.finandinaUrl}${environment.simulationEndpoint}`,
    [Bank.Nu]: `${environment.nuUrl}${environment.simulationEndpoint}`,
  };

  getCdtRates(): Observable<CdtRatesResponse> {
    const entries = Object.entries(this._rateListEndpoints);

    const requests = entries.map(([bank, url]) =>
      this._http.get<CdtRateDTO[]>(url).pipe(
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
    const simulationEntries = Object.entries(this._simulationEndpoints);

    const simulationBody: InvestCDTRequest = {
      amount: investedAmount.toString(),
      term: termInDays.toString(),
      termUnit: CDTTermUnit.DAYS,
    };

    const simulationRequests = simulationEntries.map(([bank, url]) =>
      this._http
        .get<CDTSimulation>(url, {
          params: new HttpParams({
            fromObject: {
              amount: simulationBody.amount,
              term: simulationBody.term,
              termUnit: simulationBody.termUnit,
            },
          }),
        })
        .pipe(
          delay(REQUEST_DELAY_MS),
          map(
            (data): InvestResult => ({
              success: true,
              data: { ...data, rate: cdtMapper(data.rate, bank as Bank) },
              bank: bank as Bank,
            })
          ),
          catchError((): Observable<InvestResult> => of({ success: false, bank: bank as Bank }))
        )
    );

    return forkJoin(simulationRequests).pipe(
      map(results => {
        const simulations: CdtSimulation[] = results
          .filter((r): r is { success: true; data: CdtSimulation; bank: Bank } => r.success)
          .flatMap(r => ({ ...r.data, bankName: r.bank }));

        const failedBanks: Bank[] = results
          .filter((r): r is { success: false; bank: Bank } => !r.success)
          .map(r => r.bank);

        if (failedBanks.length === simulationEntries.length) {
          throw new Error('All simulation sources failed');
        }

        return { simulations, failedBanks };
      })
    );
  }
}
