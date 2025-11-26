import { TestBed } from '@angular/core/testing';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Cdt } from './cdt';
import { environment } from '@cdt/environments/environment';
import { Bank } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';
import { CDTTermUnit } from '@dark-light-20/invest-domain';

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

    const banks = [
      { bank: Bank.Ban100, url: environment.ban100Url },
      { bank: Bank.Bancolombia, url: environment.bancolombiaUrl },
      { bank: Bank.BancoDeBogota, url: environment.bancoDeBogotaUrl },
      { bank: Bank.Finandina, url: environment.finandinaUrl },
      { bank: Bank.Nu, url: environment.nuUrl },
    ];

    for (const { url } of banks) {
      const req = httpMock.expectOne(`${url}/cdt/rates`);
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

    const ban100Req = httpMock.expectOne(`${environment.ban100Url}/cdt/rates`);
    ban100Req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });

    const otherBanks = [
      { bank: Bank.Bancolombia, url: environment.bancolombiaUrl },
      { bank: Bank.BancoDeBogota, url: environment.bancoDeBogotaUrl },
      { bank: Bank.Finandina, url: environment.finandinaUrl },
      { bank: Bank.Nu, url: environment.nuUrl },
    ];

    for (const { url } of otherBanks) {
      const req = httpMock.expectOne(`${url}/cdt/rates`);
      expect(req.request.method).toBe('GET');
      req.flush([mockRate]);
    }
  });

  test('should handle total failures', done => {
    service.getCdtRates().subscribe({
      error: error => {
        expect(error).toBeTruthy();
        done();
      },
    });

    const banks = [
      { bank: Bank.Ban100, url: environment.ban100Url },
      { bank: Bank.Bancolombia, url: environment.bancolombiaUrl },
      { bank: Bank.BancoDeBogota, url: environment.bancoDeBogotaUrl },
      { bank: Bank.Finandina, url: environment.finandinaUrl },
      { bank: Bank.Nu, url: environment.nuUrl },
    ];

    for (const { url } of banks) {
      const req = httpMock.expectOne(`${url}/cdt/rates`);
      expect(req.request.method).toBe('GET');
      req.flush('Error', { status: HttpStatusCode.InternalServerError, statusText: 'Server Error' });
    }
  });
});
