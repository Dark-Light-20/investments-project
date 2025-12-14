import { Bank } from '@cdt/domain/models/cdt.model';
import { CDTSimulation, CDTTermUnit } from '@dark-light-20/invest-domain';

export interface InvestCDTRequest {
  amount: string;
  term: string;
  termUnit: CDTTermUnit;
}

export type InvestResult = { success: true; data: CDTSimulation; bank: Bank } | { success: false; bank: Bank };
