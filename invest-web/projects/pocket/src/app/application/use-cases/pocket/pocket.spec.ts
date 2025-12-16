import { TestBed } from '@angular/core/testing';

import { Pocket } from './pocket';
import { of } from 'rxjs';
import { Bank, PocketRatesResponse } from '@pocket/domain/models/pocket.model';
import { PocketSimulationResponse } from '@pocket/domain/models/simulation.model';
import { PocketGateway } from '@pocket/domain/models/pocket.gateway';
import { MockProvider } from 'ng-mocks';

const pocketGatewayMock = {
  getPocketRates: jest.fn().mockReturnValue(
    of({
      rates: [
        {
          id: 'mock-id-1',
          bankName: Bank.Finandina,
          rate: 4.5,
        },
        {
          id: 'mock-id-2',
          bankName: Bank.Nu,
          rate: 5.88,
        },
      ],
      failedBanks: [],
    } as PocketRatesResponse)
  ),
  simulatePocket: jest.fn().mockReturnValue(
    of({
      simulations: [
        {
          id: 'mock-sim-1',
          bankName: Bank.Finandina,
          investedAmount: 1000,
          term: 6,
          rate: 4.5,
          earnings: 27,
          finalAmount: 1027,
        },
        {
          id: 'mock-sim-2',
          bankName: Bank.Nu,
          investedAmount: 1000,
          term: 6,
          rate: 5.88,
          earnings: 35.28,
          finalAmount: 1035.28,
        },
      ],
      failedBanks: [],
    } as PocketSimulationResponse)
  ),
};

describe('Pocket', () => {
  let service: Pocket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(PocketGateway, pocketGatewayMock)],
    });
    service = TestBed.inject(Pocket);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('getAllPocketRates should return rates', done => {
    service.getAllPocketRates().subscribe(ratesResponse => {
      expect(ratesResponse.rates).toEqual([
        {
          id: 'mock-id-1',
          bankName: Bank.Finandina,
          rate: 4.5,
        },
        {
          id: 'mock-id-2',
          bankName: Bank.Nu,
          rate: 5.88,
        },
      ]);
      expect(ratesResponse.failedBanks).toEqual([]);
      done();
    });
    expect(pocketGatewayMock.getPocketRates).toHaveBeenCalled();
  });

  test('getAllPocketRates should handle all banks failing', done => {
    pocketGatewayMock.getPocketRates.mockReturnValueOnce(
      of({
        rates: [],
        failedBanks: [Bank.Finandina, Bank.Nu],
      } as PocketRatesResponse)
    );

    service.getAllPocketRates().subscribe(ratesResponse => {
      expect(ratesResponse.rates).toEqual([]);
      expect(ratesResponse.failedBanks).toEqual([Bank.Finandina, Bank.Nu]);
      done();
    });
    expect(pocketGatewayMock.getPocketRates).toHaveBeenCalled();
  });

  test('simulatePocket should return simulation results', done => {
    const investedAmount = 1000;
    const termInMonths = 6;

    service.simulatePocket(investedAmount, termInMonths).subscribe(simulationResponse => {
      expect(simulationResponse.simulations).toEqual([
        {
          id: 'mock-sim-1',
          bankName: Bank.Finandina,
          investedAmount: 1000,
          term: 6,
          rate: 4.5,
          earnings: 27,
          finalAmount: 1027,
        },
        {
          id: 'mock-sim-2',
          bankName: Bank.Nu,
          investedAmount: 1000,
          term: 6,
          rate: 5.88,
          earnings: 35.28,
          finalAmount: 1035.28,
        },
      ]);
      expect(simulationResponse.failedBanks).toEqual([]);
      done();
    });
    expect(pocketGatewayMock.simulatePocket).toHaveBeenCalledWith(investedAmount, termInMonths, undefined);
  });

  test('simulatePocket should handle all banks failing', done => {
    pocketGatewayMock.simulatePocket.mockReturnValueOnce(
      of({
        simulations: [],
        failedBanks: [Bank.Finandina, Bank.Nu],
      } as PocketSimulationResponse)
    );

    const investedAmount = 1000;
    const termInMonths = 6;

    service.simulatePocket(investedAmount, termInMonths).subscribe(simulationResponse => {
      expect(simulationResponse.simulations).toEqual([]);
      expect(simulationResponse.failedBanks).toEqual([Bank.Finandina, Bank.Nu]);
      done();
    });
    expect(pocketGatewayMock.simulatePocket).toHaveBeenCalledWith(investedAmount, termInMonths, undefined);
  });
});
