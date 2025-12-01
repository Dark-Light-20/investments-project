import { Bank, CdtRate } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';

export interface InvestCDTRequest {
  amount: number;
  term: number;
  termUnit: CDTTermUnit;
}

export type RateResult = { success: true; data: CdtRate; bank: Bank } | { success: false; bank: Bank };
export type InvestResult = { success: true; data: number; bank: Bank } | { success: false; bank: Bank };
