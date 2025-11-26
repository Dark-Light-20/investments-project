import { CDTRate } from '@dark-light-20/invest-domain';

export interface CdtRate extends CDTRate {
  bankName: Bank;
}

export enum Bank {
  Ban100 = 'Ban100',
  Bancolombia = 'Bancolombia',
  BancoDeBogota = 'Banco de Bogota',
  Finandina = 'Finandina',
  Nu = 'Nu',
}

export interface CdtRatesResponse {
  rates: CdtRate[];
  failedBanks: Bank[];
}
