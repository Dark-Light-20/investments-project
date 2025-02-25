import { CdtRS } from "../models/cdt-rs.model";
import { CDT } from "../models/cdt.model";
import { PERCENTAGE_DIV } from "./number-constants";

export const CDTRatesMapper = (response: CdtRS): CDT[] =>
  response.yields.map((item) => ({
    rate: parseFloat(item.yield_rate) * PERCENTAGE_DIV,
    term: parseInt(item.maturity),
  }));
