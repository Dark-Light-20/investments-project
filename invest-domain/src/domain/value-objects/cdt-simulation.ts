import type { CDTRate } from "./cdt-rate.js";

export interface CDTSimulation {
  investedAmount: number;
  term: number;
  rate: CDTRate;
  earnings: number;
  finalAmount: number;
}
