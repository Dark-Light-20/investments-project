import { TestBed } from '@angular/core/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Pocket } from './pocket';
import { environment } from '@pocket/environments/environment';
import { Bank } from '@pocket/domain/models/pocket.model';

const rateListEndpoints = [
  { bank: Bank.Finandina, url: `${environment.finandinaUrl}${environment.finandinaRateEndpoint}` },
  { bank: Bank.Nu, url: `${environment.nuUrl}${environment.nuRateEndpoint}` },
];

const simulationEndpoints = [
  { bank: Bank.Finandina, url: `${environment.finandinaUrl}${environment.finandinaSimulationEndpoint}` },
  { bank: Bank.Nu, url: `${environment.nuUrl}${environment.nuSimulationEndpoint}` },
];

describe('Pocket', () => {
  let service: Pocket;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Pocket);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch rates from all banks successfully', done => {
    const mockRate = 0.1;

    service.getPocketRates().subscribe(result => {
      expect(result.failedBanks).toHaveLength(0);
      expect(result.rates).toHaveLength(2);
      done();
    });

    for (const { url } of rateListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockRate);
    }
  });

  test('should handle partial failures', done => {
    const mockRate = 0.1;

    service.getPocketRates().subscribe(result => {
      expect(result.failedBanks).toContain(Bank.Finandina);
      expect(result.rates).toHaveLength(1);
      done();
    });

    for (const { bank, url } of rateListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      if (bank === Bank.Finandina) {
        req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
      } else {
        req.flush(mockRate);
      }
    }
  });

  test('should handle total failures', done => {
    service.getPocketRates().subscribe({
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

  describe('simulatePocket', () => {
    const investedAmount = 1000000;
    const termInMonths = 12;
    const monthlyIncrement = 100000;

    const mockSimulationResponse = {
      investedAmount: investedAmount,
      term: termInMonths,
      finalAmount: investedAmount * 1.1,
      earnings: investedAmount * 0.1,
      rate: 0.1,
    };

    test('should simulate Pocket for all banks successfully', done => {
      service.simulatePocket(investedAmount, termInMonths, monthlyIncrement).subscribe(result => {
        expect(result.failedBanks).toHaveLength(0);
        expect(result.simulations).toHaveLength(2);
        for (const simulation of result.simulations) {
          expect(simulation.earnings).toBe(mockSimulationResponse.earnings);
          expect(simulation.bankName).toBeTruthy();
        }
        done();
      });

      for (const { url } of simulationEndpoints) {
        const req = httpMock.expectOne(req => req.url === url);
        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('amount')).toBe(investedAmount.toString());
        expect(req.request.params.get('months')).toBe(termInMonths.toString());
        expect(req.request.params.get('monthlyIncrement')).toBe(monthlyIncrement.toString());
        req.flush({ ...mockSimulationResponse });
      }
    });

    test('should handle partial failures in simulation', done => {
      service.simulatePocket(investedAmount, termInMonths).subscribe(result => {
        expect(result.failedBanks).toContain(Bank.Finandina);
        expect(result.simulations).toHaveLength(1);
        done();
      });

      for (const { bank, url } of simulationEndpoints) {
        const req = httpMock.expectOne(req => req.url === url);
        if (bank === Bank.Finandina) {
          req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
        } else {
          req.flush({ ...mockSimulationResponse });
        }
      }
    });

    test('should handle total failures in simulation', done => {
      service.simulatePocket(investedAmount, termInMonths).subscribe({
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
