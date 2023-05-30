export interface CDTRange {
  minimumAmount: number;
  maximumAmount: number;
  rates: CDTRate[];
}

export interface CDTRate {
  minimumDays: number;
  maximumDays: number;
  rate: string;
}

export interface CDTData {
  minimumAmount: number;
  maximumAmount: number;
  minimumDays: number;
  maximumDays: number;
  rate: string;
}
