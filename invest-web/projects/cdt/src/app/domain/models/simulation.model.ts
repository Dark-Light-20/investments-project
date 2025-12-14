import { Bank, CdtRate } from './cdt.model';
import { CDTSimulation } from '@dark-light-20/invest-domain';

export interface CdtSimulation extends CDTSimulation {
  rate: CdtRate;
  bankName: Bank;
}

export interface SimulationParams {
  investedAmount: number;
  termInDays: number;
}

export interface CdtSimulationResponse {
  simulations: CdtSimulation[];
  failedBanks: Bank[];
}
