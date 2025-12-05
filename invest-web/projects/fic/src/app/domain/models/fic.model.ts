import { FIC } from '@dark-light-20/invest-domain';

export interface Fic extends FIC {
  id: string;
  bankName: Bank;
}

export enum Bank {
  Bancolombia = 'Bancolombia',
  BancoDeBogota = 'Banco de Bogota',
}

export interface FicsResponse {
  fics: Fic[];
  failedBanks: Bank[];
}
