import { TestBed } from '@angular/core/testing';

import { Cdt } from './cdt';
import { Bank, CdtRate, CdtRatesResponse } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

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
});
