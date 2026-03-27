import { CDTTermUnit } from "@dark-light-20/invest-domain";

export interface CdtPdfRow {
  section: string;
  minimumTerm: number;
  maximumTerm: number;
  termUnit: CDTTermUnit;
  rate: number;
  minimumAmount: number;
  maximumAmount: number;
}
