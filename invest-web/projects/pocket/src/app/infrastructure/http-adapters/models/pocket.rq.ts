import { Bank } from '@pocket/domain/models/pocket.model';
import { PocketSimulation } from '@dark-light-20/invest-domain';

export interface InvestPocketRequest {
  amount: string;
  months: string;
  monthlyIncrement?: string;
}

export type InvestResult = { success: true; data: PocketSimulation; bank: Bank } | { success: false; bank: Bank };
