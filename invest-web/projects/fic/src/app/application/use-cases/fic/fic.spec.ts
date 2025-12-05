import { TestBed } from '@angular/core/testing';

import { Bank, Fic as FicModel, FicsResponse } from '../../../domain/models/fic.model';
import { MockProvider } from 'ng-mocks';
import { FicGateway } from '../../../domain/models/fic.gateway';
import { of } from 'rxjs';
import { Fic } from './fic';

const ficGatewayMock = {
  getFicRates: jest.fn().mockReturnValue(
    of({
      fics: [
        {
          rates: [{ rate: 5.2, historicDays: 30 }],
          name: 'FIC Example',
          bankName: Bank.Bancolombia,
          id: crypto.randomUUID(),
        },
        {
          rates: [{ rate: 7.55, historicDays: 30 }],
          name: 'FIC Example 2',
          bankName: Bank.BancoDeBogota,
          id: crypto.randomUUID(),
        },
      ],
      failedBanks: [],
    } as FicsResponse)
  ),
};

describe('Fic', () => {
  let service: Fic;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(FicGateway, ficGatewayMock)],
    });
    service = TestBed.inject(Fic);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('getAllFicRates should return fic rates', done => {
    service.getAllFicRates().subscribe(ficsResponse => {
      expect(ficsResponse.fics).toEqual([
        {
          rates: [{ rate: 5.2, historicDays: 30 }],
          name: 'FIC Example',
          bankName: Bank.Bancolombia,
          id: expect.any(String),
        },
        {
          rates: [{ rate: 7.55, historicDays: 30 }],
          name: 'FIC Example 2',
          bankName: Bank.BancoDeBogota,
          id: expect.any(String),
        },
      ]);
      expect(ficsResponse.failedBanks).toEqual([]);
      done();
    });
    expect(ficGatewayMock.getFicRates).toHaveBeenCalled();
  });

  test('should return failed banks when some banks fail', done => {
    ficGatewayMock.getFicRates.mockReturnValueOnce(
      of({
        fics: [
          {
            rates: [{ rate: 5.2, historicDays: 30 }],
            name: 'FIC Example',
            bankName: Bank.Bancolombia,
            id: crypto.randomUUID(),
          },
        ] as FicModel[],
        failedBanks: [Bank.BancoDeBogota],
      } as FicsResponse)
    );

    service.getAllFicRates().subscribe(ficsResponse => {
      expect(ficsResponse.fics).toEqual([
        {
          rates: [{ rate: 5.2, historicDays: 30 }],
          name: 'FIC Example',
          bankName: Bank.Bancolombia,
          id: expect.any(String),
        },
      ]);
      expect(ficsResponse.failedBanks).toEqual([Bank.BancoDeBogota]);
      done();
    });
    expect(ficGatewayMock.getFicRates).toHaveBeenCalled();
  });

  test('getAllFicRates should handle all banks failing', done => {
    ficGatewayMock.getFicRates.mockReturnValueOnce(
      of({
        fics: [] as FicModel[],
        failedBanks: [Bank.Bancolombia, Bank.BancoDeBogota],
      } as FicsResponse)
    );

    service.getAllFicRates().subscribe(ficsResponse => {
      expect(ficsResponse.fics).toEqual([]);
      expect(ficsResponse.failedBanks).toEqual([Bank.Bancolombia, Bank.BancoDeBogota]);
      done();
    });
    expect(ficGatewayMock.getFicRates).toHaveBeenCalled();
  });
});
