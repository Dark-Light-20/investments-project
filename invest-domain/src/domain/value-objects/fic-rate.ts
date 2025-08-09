export interface FICRate {
  historicDays: number;
  rate: number;
}

export interface FIC {
  name: string;
  rates: FICRate[];
}
