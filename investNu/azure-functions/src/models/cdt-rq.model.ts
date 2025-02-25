export interface CDTRateRQ {
  days: number;
}

export interface CDTInvestRQ extends CDTRateRQ {
  amount: number;
}

export interface BoxInvestRQ {
  amount: number;
  months: number;
  monthlyIncrement: number;
}
