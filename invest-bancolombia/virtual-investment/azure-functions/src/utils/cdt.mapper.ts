import { CDTRS } from "../models/cdt-rs.model";
import { CDTRange } from "../models/cdt.model";

export const CDTRatesMapper = (data: CDTRS): CDTRange[] => {
  return data.infoService.settings.daysRanges.allRates.map((range) => ({
    minimumAmount: range.montoMin,
    maximumAmount: range.montoMax,
    rates: range.tasas.map((rate) => ({
      minimumDays: parseInt(rate.minimumDays),
      maximumDays: parseInt(rate.maximumDays),
      rate: rate.effectiveInterestRate + "%",
    })),
  }));
};
