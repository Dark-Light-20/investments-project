import { CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";
import { CDTRS } from "../models/cdt-rs.model.js";

export const CDTRatesMapper = (data: CDTRS): CDTRate[] => {
  return data.infoService.settings.daysRanges.allRates.flatMap((rateRange) =>
    rateRange.tasas.map((tasa) => ({
      rate: parseFloat(tasa.effectiveInterestRate),
      minimumAmount: rateRange.montoMin,
      maximumAmount: rateRange.montoMax,
      minimumTerm: parseInt(tasa.minimumDays, 10),
      maximumTerm: parseInt(tasa.maximumDays, 10),
      termUnit: CDTTermUnit.DAYS,
    }))
  );
};
