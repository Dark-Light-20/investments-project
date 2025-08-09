export interface CDTRate {
  rate: number;
  minimumAmount: number;
  minimumTerm: number;
  maximumAmount: number;
  maximumTerm: number;
  termUnit: CDTTermUnit;
}

export enum CDTTermUnit {
  DAYS = "DAYS",
  MONTHS = "MONTHS",
}
