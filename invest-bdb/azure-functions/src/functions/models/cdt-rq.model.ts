import { CDTTermUnit } from "@dark-light-20/invest-domain";

export interface CdtRQ {
  amount: number;
  term: number;
  termUnit?: CDTTermUnit;
}
