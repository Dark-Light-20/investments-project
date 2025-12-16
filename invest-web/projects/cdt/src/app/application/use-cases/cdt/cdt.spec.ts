import { TestBed } from '@angular/core/testing';

import { Cdt } from './cdt';
import { Bank, CdtRate, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CdtSimulation, CdtSimulationResponse, SimulationParams } from '@cdt/domain/models/simulation.model';

const cdtGatewayMock = {
  getCdtRates: jest.fn().mockReturnValue(
    of({
      rates: [
        { termUnit: CDTTermUnit.DAYS, rate: 5.2, bankName: Bank.Bancolombia },
        { termUnit: CDTTermUnit.MONTHS, rate: 3.5, bankName: Bank.BancoDeBogota },
        { termUnit: CDTTermUnit.DAYS, rate: 4.98, bankName: Bank.Ban100 },
        { termUnit: CDTTermUnit.DAYS, rate: 0, bankName: Bank.Ban100 },
      ] as CdtRate[],
      failedBanks: [],
    } as CdtRatesResponse)
  ),
  simulateCdt: jest.fn().mockReturnValue(
    of({
      simulations: [
        {
          investedAmount: 1000,
          term: 30,
          rate: {
            id: 'mock-id-1',
            bankName: Bank.Bancolombia,
            rate: 5.16,
            minimumAmount: 1000,
            minimumTerm: 30,
            maximumAmount: 100000,
            maximumTerm: 365,
            termUnit: CDTTermUnit.DAYS,
          },
          earnings: 52,
          finalAmount: 1052,
          bankName: Bank.Bancolombia,
        },
        {
          investedAmount: 1000,
          term: 30,
          rate: {
            id: 'mock-id-2',
            bankName: Bank.Ban100,
            rate: 4.98,
            minimumAmount: 500,
            minimumTerm: 30,
            maximumAmount: 50000,
            maximumTerm: 180,
            termUnit: CDTTermUnit.DAYS,
          },
          earnings: 60,
          finalAmount: 1060,
          bankName: Bank.Ban100,
        },
      ] as CdtSimulation[],
      failedBanks: [],
    } as CdtSimulationResponse)
  ),
};

describe('Cdt', () => {
  let service: Cdt;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(CdtGateway, cdtGatewayMock)],
    });
    service = TestBed.inject(Cdt);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('getAllCDTRates should return filtered rates', done => {
    service.getAllCDTRates().subscribe(ratesResponse => {
      expect(ratesResponse.rates).toEqual([
        { termUnit: CDTTermUnit.DAYS, rate: 5.2, bankName: Bank.Bancolombia },
        { termUnit: CDTTermUnit.DAYS, rate: 4.98, bankName: Bank.Ban100 },
      ]);
      expect(ratesResponse.failedBanks).toEqual([]);
      done();
    });
    expect(cdtGatewayMock.getCdtRates).toHaveBeenCalled();
  });

  test('getAllCDTRates should handle all banks failing', done => {
    cdtGatewayMock.getCdtRates.mockReturnValueOnce(
      of({
        rates: [] as CdtRate[],
        failedBanks: [Bank.Ban100, Bank.Bancolombia, Bank.BancoDeBogota, Bank.Finandina, Bank.Nu],
      } as CdtRatesResponse)
    );

    service.getAllCDTRates().subscribe(ratesResponse => {
      expect(ratesResponse.rates).toEqual([]);
      expect(ratesResponse.failedBanks).toEqual([
        Bank.Ban100,
        Bank.Bancolombia,
        Bank.BancoDeBogota,
        Bank.Finandina,
        Bank.Nu,
      ]);
      done();
    });
    expect(cdtGatewayMock.getCdtRates).toHaveBeenCalled();
  });

  test('simulateCdt should return simulation results', done => {
    const params: SimulationParams = {
      investedAmount: 1000,
      termInDays: 180,
    };

    service.simulateCdt(params).subscribe(simulationResponse => {
      expect(simulationResponse.simulations).toEqual([
        {
          investedAmount: 1000,
          term: 30,
          rate: {
            id: 'mock-id-1',
            bankName: Bank.Bancolombia,
            rate: 5.16,
            minimumAmount: 1000,
            minimumTerm: 30,
            maximumAmount: 100000,
            maximumTerm: 365,
            termUnit: CDTTermUnit.DAYS,
          },
          earnings: 52,
          finalAmount: 1052,
          bankName: Bank.Bancolombia,
        },
        {
          investedAmount: 1000,
          term: 30,
          rate: {
            id: 'mock-id-2',
            bankName: Bank.Ban100,
            rate: 4.98,
            minimumAmount: 500,
            minimumTerm: 30,
            maximumAmount: 50000,
            maximumTerm: 180,
            termUnit: CDTTermUnit.DAYS,
          },
          earnings: 60,
          finalAmount: 1060,
          bankName: Bank.Ban100,
        },
      ]);
      expect(simulationResponse.failedBanks).toEqual([]);
      done();
    });
    expect(cdtGatewayMock.simulateCdt).toHaveBeenCalledWith(params.investedAmount, params.termInDays);
  });

  test('simulateCdt should handle all banks failing', done => {
    cdtGatewayMock.simulateCdt.mockReturnValueOnce(
      of({
        simulations: [],
        failedBanks: [Bank.Ban100, Bank.Bancolombia, Bank.BancoDeBogota, Bank.Finandina, Bank.Nu],
      } as CdtSimulationResponse)
    );

    const params: SimulationParams = {
      investedAmount: 1000,
      termInDays: 180,
    };

    service.simulateCdt(params).subscribe(simulationResponse => {
      expect(simulationResponse.simulations).toEqual([]);
      expect(simulationResponse.failedBanks).toEqual([
        Bank.Ban100,
        Bank.Bancolombia,
        Bank.BancoDeBogota,
        Bank.Finandina,
        Bank.Nu,
      ]);
      done();
    });
    expect(cdtGatewayMock.simulateCdt).toHaveBeenCalledWith(params.investedAmount, params.termInDays);
  });
});
