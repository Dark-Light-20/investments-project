export interface FicData {
  name: string;
  rates: string[];
  category: string;
  amount: number;
  unitValue: number;
}

export const HISTORIC_DAYS = [1, 7, 30, 90, 180, 365];
