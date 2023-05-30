export interface FIC {
  nit: string;
  name: string;
  score: string;
  term: string;
  unitValue: string;
  valueInPesos: string;
  profitability: Profitability;
  closeDate: string;
  managmentCompany: string;
}

export interface FICIdentity {
  nit: string;
  name: string;
}

export interface Profitability {
  days: Days;
  years: Years;
}

export interface Years {
  currentYear: string;
  lastYear: string;
  lastTwoYears: string;
  lastThreeYears: string;
}

export interface Days {
  weekly: string;
  monthly: string;
  biannual: string;
}
