export interface CdtRS {
  date: Date;
  yields: Yield[];
}

export interface Yield {
  yield_rate: string;
  since: Date;
  maturity: string;
}
