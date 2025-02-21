export interface CdtRateRQ {
  days: number;
}

export interface CdtInvestRQ extends CdtRateRQ {
  amount: number;
}
