import { Bank, CdtRate } from './cdt.model';

export interface CdtSimulation extends CdtRate {
  totalInterest: number;
}

export interface SimulationParams {
  investedAmount: number;
  termInDays: number;
}

export interface CdtSimulationResponse {
  simulations: CdtSimulation[];
  failedBanks: Bank[];
}
