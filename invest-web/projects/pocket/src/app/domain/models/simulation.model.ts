import { Bank } from './pocket.model';
import { PocketSimulation as PocketSimulationDomain } from '@dark-light-20/invest-domain';

export interface PocketSimulation extends PocketSimulationDomain {
  id: string;
  bankName: Bank;
}

export interface SimulationParams {
  investedAmount: number;
  termInMonths: number;
  monthlyIncrement?: number;
}

export interface PocketSimulationResponse {
  simulations: PocketSimulation[];
  failedBanks: Bank[];
}
