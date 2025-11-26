import { CDTTermUnit } from '@dark-light-20/invest-domain';

export interface CdtRateDTO {
  rate: number;
  minimumTerm: number;
  maximumTerm: number;
  minimumAmount: number;
  maximumAmount: number;
  termUnit: CDTTermUnit;
}
