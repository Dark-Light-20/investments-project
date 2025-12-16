export interface PocketRate {
  id: string;
  bankName: Bank;
  rate: number;
}

export enum Bank {
  Finandina = 'Finandina',
  Nu = 'Nu',
}

export interface PocketRatesResponse {
  rates: PocketRate[];
  failedBanks: Bank[];
}
