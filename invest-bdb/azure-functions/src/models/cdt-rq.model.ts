import { CDTTermUnitTypes } from "./cdt.model";

export interface CDTRQ {
  amount: number;
  term: number;
  termUnit?: CDTTermUnitTypes;
}
