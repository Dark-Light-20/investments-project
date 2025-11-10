import { CdtRS } from "../models/cdt.model.js";
import { CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";

export const CDTRatesMapper = (response: CdtRS): CDTRate[] =>
  response.yields.map((item) => ({
    rate: Number.parseFloat(item.yield_rate) * 100,
    minimumAmount: 50000,
    minimumTerm: Number.parseInt(item.maturity),
    maximumAmount: 999999999999,
    maximumTerm: Number.parseInt(item.maturity),
    termUnit: CDTTermUnit.DAYS,
  }));
