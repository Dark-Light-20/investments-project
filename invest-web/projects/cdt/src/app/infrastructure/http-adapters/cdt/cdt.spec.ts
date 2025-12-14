import { TestBed } from '@angular/core/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Cdt } from './cdt';
import { environment } from '@cdt/environments/environment';
import { Bank, CdtRate } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { CdtSimulation } from '@cdt/domain/models/simulation.model';

const rateListEndpoints = [
  { bank: Bank.Ban100, url: `${environment.ban100Url}${environment.rateListEndpoint}` },
  { bank: Bank.Bancolombia, url: `${environment.bancolombiaUrl}${environment.rateListEndpoint}` },
  {
    bank: Bank.BancoDeBogota,
    url: `${environment.bancoDeBogotaUrl}${environment.rateListEndpoint}`,
  },
  { bank: Bank.Finandina, url: `${environment.finandinaUrl}${environment.rateListEndpoint}` },
  { bank: Bank.Nu, url: `${environment.nuUrl}${environment.rateListEndpoint}` },
];

const simulationEndpoints = [
  { bank: Bank.Ban100, url: `${environment.ban100Url}${environment.simulationEndpoint}` },
  { bank: Bank.Bancolombia, url: `${environment.bancolombiaUrl}${environment.simulationEndpoint}` },
  {
    bank: Bank.BancoDeBogota,
    url: `${environment.bancoDeBogotaUrl}${environment.simulationEndpoint}`,
  },
  { bank: Bank.Finandina, url: `${environment.finandinaUrl}${environment.simulationEndpoint}` },
  { bank: Bank.Nu, url: `${environment.nuUrl}${environment.simulationEndpoint}` },
];

describe('Cdt', () => {
  let service: Cdt;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Cdt);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch rates from all banks successfully', done => {
    const mockRate: CdtRateDTO = {
      rate: 0.1,
      minimumTerm: 30,
      maximumTerm: 60,
      minimumAmount: 100000,
      maximumAmount: 10000000,
      termUnit: CDTTermUnit.DAYS,
    };

    service.getCdtRates().subscribe(result => {
      expect(result.failedBanks).toHaveLength(0);
      expect(result.rates).toHaveLength(5);
      done();
    });

    for (const { url } of rateListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush([mockRate]);
    }
  });

  test('should handle partial failures', done => {
    const mockRate: CdtRateDTO = {
      rate: 0.1,
      minimumTerm: 30,
      maximumTerm: 60,
      minimumAmount: 100000,
      maximumAmount: 10000000,
      termUnit: CDTTermUnit.DAYS,
    };

    service.getCdtRates().subscribe(result => {
      expect(result.failedBanks).toContain(Bank.Ban100);
      expect(result.rates).toHaveLength(4);
      done();
    });

    for (const { bank, url } of rateListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      if (bank === Bank.Ban100) {
        req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
      } else {
        req.flush([mockRate]);
      }
    }
  });

  test('should handle total failures', done => {
    service.getCdtRates().subscribe({
      error: error => {
        expect(error).toBeTruthy();
        done();
      },
    });

    for (const { url } of rateListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
    }
  });

  describe('simulateCdt', () => {
    const investedAmount = 1000000;
    const termInDays = 90;
    const mockRateDTO: CdtRate = {
      id: crypto.randomUUID(),
      bankName: Bank.Bancolombia,
      rate: 0.12,
      minimumTerm: 30,
      maximumTerm: 360,
      minimumAmount: 100000,
      maximumAmount: 500000000,
      termUnit: CDTTermUnit.DAYS,
    };
    const mockInvestReturn = 30000;
    const mockSimulationResponse: CdtSimulation = {
      investedAmount: investedAmount,
      term: termInDays,
      finalAmount: investedAmount + mockInvestReturn,
      earnings: mockInvestReturn,
      rate: mockRateDTO,
      bankName: mockRateDTO.bankName,
    };

    test('should simulate CDT for all banks successfully', done => {
      service.simulateCdt(investedAmount, termInDays).subscribe(result => {
        expect(result.failedBanks).toHaveLength(0);
        expect(result.simulations).toHaveLength(5);
        for (const simulation of result.simulations) {
          expect(simulation.earnings).toBe(mockInvestReturn);
          expect(simulation.rate).toBeTruthy();
          expect(simulation.bankName).toBeTruthy();
        }
        done();
      });

      for (const { bank, url } of simulationEndpoints) {
        const req = httpMock.expectOne(req => req.url === url);
        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('amount')).toBe(investedAmount.toString());
        expect(req.request.params.get('term')).toBe(termInDays.toString());
        expect(req.request.params.get('termUnit')).toBe(CDTTermUnit.DAYS);
        req.flush({ ...mockSimulationResponse, bankName: bank });
      }
    });

    test('should handle partial failures in simulation', done => {
      service.simulateCdt(investedAmount, termInDays).subscribe(result => {
        expect(result.failedBanks).toContain(Bank.Ban100);
        expect(result.simulations).toHaveLength(4);
        done();
      });

      for (const { bank, url } of simulationEndpoints) {
        const req = httpMock.expectOne(req => req.url === url);
        if (bank === Bank.Ban100) {
          req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
        } else {
          req.flush({ ...mockSimulationResponse, bankName: bank });
        }
      }
    });

    test('should handle total failures in simulation', done => {
      service.simulateCdt(investedAmount, termInDays).subscribe({
        error: error => {
          expect(error).toBeTruthy();
          expect(error.message).toBe('All simulation sources failed');
          done();
        },
      });

      for (const { url } of simulationEndpoints) {
        const req = httpMock.expectOne(req => req.url === url);
        req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
      }
    });
  });
});
