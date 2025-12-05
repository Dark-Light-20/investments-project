import { TestBed } from '@angular/core/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Fic } from './fic';
import { environment } from '@fic/environments/environment';
import { Bank } from '@fic/domain/models/fic.model';
import { FicDTO } from '@fic/infrastructure/models/fic.dto';
import { FICRate } from '@dark-light-20/invest-domain';

const ficListEndpoints = [
  { bank: Bank.Bancolombia, url: `${environment.bancolombiaUrl}${environment.ficListEndpoint}` },
  { bank: Bank.BancoDeBogota, url: `${environment.bancoDeBogotaUrl}${environment.ficListEndpoint}` },
];

describe('Fic', () => {
  let service: Fic;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Fic);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch FIC rates from all banks successfully', done => {
    const mockFicRate: FICRate = {
      rate: 0.085,
      historicDays: 30,
    };

    const mockFicDTO: FicDTO = {
      name: 'Test FIC',
      rates: [mockFicRate],
    };

    service.getFicRates().subscribe(result => {
      expect(result.failedBanks).toHaveLength(0);
      expect(result.fics).toHaveLength(2);
      expect(result.fics[0]).toEqual({
        id: expect.any(String),
        bankName: expect.any(String),
        name: 'Test FIC',
        rates: [mockFicRate],
      });
      done();
    });

    for (const { url } of ficListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush([mockFicDTO]);
    }
  });

  test('should handle partial failures when fetching FIC rates', done => {
    const mockFicRate: FICRate = {
      rate: 0.085,
      historicDays: 30,
    };

    const mockFicDTO: FicDTO = {
      name: 'Test FIC',
      rates: [mockFicRate],
    };

    service.getFicRates().subscribe(result => {
      expect(result.failedBanks).toContain(Bank.Bancolombia);
      expect(result.fics).toHaveLength(1);
      expect(result.fics[0].bankName).toBe(Bank.BancoDeBogota);
      done();
    });

    for (const { bank, url } of ficListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      if (bank === Bank.Bancolombia) {
        req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
      } else {
        req.flush([mockFicDTO]);
      }
    }
  });

  test('should return error on total failure', done => {
    service.getFicRates().subscribe({
      error: error => {
        expect(error).toBeTruthy();
        done();
      },
    });

    for (const { url } of ficListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
    }
  });

  test('should handle multiple FICs from a single bank', done => {
    const mockFicRate1: FICRate = {
      rate: 0.085,
      historicDays: 30,
    };

    const mockFicRate2: FICRate = {
      rate: 0.09,
      historicDays: 60,
    };

    const mockFicDTO1: FicDTO = {
      name: 'FIC Conservative',
      rates: [mockFicRate1],
    };

    const mockFicDTO2: FicDTO = {
      name: 'FIC Aggressive',
      rates: [mockFicRate2],
    };

    service.getFicRates().subscribe(result => {
      expect(result.fics).toHaveLength(4);
      const filedNames = result.fics.map(f => f.name);
      expect(filedNames).toContain('FIC Conservative');
      expect(filedNames).toContain('FIC Aggressive');
      done();
    });

    for (const { url } of ficListEndpoints) {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush([mockFicDTO1, mockFicDTO2]);
    }
  });

  test('should assign unique IDs to FICs', done => {
    const mockFicDTO: FicDTO = {
      name: 'Test FIC',
      rates: [{ rate: 0.085, historicDays: 30 }],
    };

    service.getFicRates().subscribe(result => {
      const ids = result.fics.map(f => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
      done();
    });

    for (const { url } of ficListEndpoints) {
      const req = httpMock.expectOne(url);
      req.flush([mockFicDTO]);
    }
  });

  test('should preserve bank information in mapped FICs', done => {
    const mockFicDTO: FicDTO = {
      name: 'Test FIC',
      rates: [{ rate: 0.085, historicDays: 30 }],
    };

    service.getFicRates().subscribe(result => {
      expect(result.fics[0].bankName).toBe(Bank.Bancolombia);
      expect(result.fics[1].bankName).toBe(Bank.BancoDeBogota);
      done();
    });

    for (const { url } of ficListEndpoints) {
      const req = httpMock.expectOne(url);
      req.flush([mockFicDTO]);
    }
  });
});
