import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PocketGateway } from '@pocket/domain/models/pocket.gateway';
import { Bank, PocketRate, PocketRatesResponse } from '@pocket/domain/models/pocket.model';
import { PocketSimulation, PocketSimulationResponse } from '@pocket/domain/models/simulation.model';
import { environment } from '@pocket/environments/environment';
import { catchError, delay, forkJoin, map, Observable, of } from 'rxjs';
import { pocketMapper } from './pocket.mapper';
import { InvestPocketRequest, InvestResult } from '../models/pocket.rq';
import { PocketSimulation as PocketSimulationDomain } from '@dark-light-20/invest-domain';

const REQUEST_DELAY_MS = 1000;

@Injectable({
  providedIn: 'root',
})
export class Pocket implements PocketGateway {
  private readonly _http = inject(HttpClient);

  private readonly _rateListEndpoints: Record<Bank, string> = {
    [Bank.Finandina]: `${environment.finandinaUrl}${environment.finandinaRateEndpoint}`,
    [Bank.Nu]: `${environment.nuUrl}${environment.nuRateEndpoint}`,
  };

  private readonly _simulationEndpoints: Record<Bank, string> = {
    [Bank.Finandina]: `${environment.finandinaUrl}${environment.finandinaSimulationEndpoint}`,
    [Bank.Nu]: `${environment.nuUrl}${environment.nuSimulationEndpoint}`,
  };

  getPocketRates(): Observable<PocketRatesResponse> {
    const entries = Object.entries(this._rateListEndpoints);

    const requests = entries.map(([bank, url]) =>
      this._http.get<number>(url).pipe(
        delay(REQUEST_DELAY_MS),
        map(rate => ({ success: true, data: pocketMapper(rate, bank as Bank) })),
        catchError(() => of({ success: false, bank: bank as Bank }))
      )
    );

    return forkJoin(requests).pipe(
      map(results => {
        const rates: PocketRate[] = results
          .filter((r): r is { success: true; data: PocketRate } => r.success)
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

  simulatePocket(
    investedAmount: number,
    termInMonths: number,
    monthlyIncrement?: number
  ): Observable<PocketSimulationResponse> {
    const simulationEntries = Object.entries(this._simulationEndpoints);

    const simulationBody: InvestPocketRequest = {
      amount: investedAmount.toString(),
      months: termInMonths.toString(),
      monthlyIncrement: monthlyIncrement ? monthlyIncrement.toString() : undefined,
    };

    let params = new HttpParams({
      fromObject: {
        amount: simulationBody.amount,
        months: simulationBody.months,
      },
    });

    if (simulationBody.monthlyIncrement) {
      params = params.set('monthlyIncrement', simulationBody.monthlyIncrement);
    }

    const simulationRequests = simulationEntries.map(([bank, url]) =>
      this._http.get<PocketSimulationDomain>(url, { params }).pipe(
        delay(REQUEST_DELAY_MS),
        map((data): InvestResult => ({ success: true, data: data, bank: bank as Bank })),
        catchError((): Observable<InvestResult> => of({ success: false, bank: bank as Bank }))
      )
    );

    return forkJoin(simulationRequests).pipe(
      map(results => {
        const simulations: PocketSimulation[] = results
          .filter((r): r is { success: true; data: PocketSimulation; bank: Bank } => r.success)
          .flatMap(r => ({ ...r.data, id: crypto.randomUUID(), bankName: r.bank }));

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
