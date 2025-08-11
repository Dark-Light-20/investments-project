import { CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";
import { RateUnitType, RatesAttribute } from "../models/cdt.model.js";

const cdtTermMap = new Map<RateUnitType, CDTTermUnit>([
  [RateUnitType.DAYS, CDTTermUnit.DAYS],
  [RateUnitType.MONTHS, CDTTermUnit.MONTHS],
]);

export const cdtMapper = (item: RatesAttribute): CDTRate => {
  const term = item["UnidadPlazo"] as string;
  const termUnitType = term.slice(3, -1).trim() as RateUnitType;
  return {
    rate: parseFloat(item["TasaSpread"]),
    minimumAmount: parseInt(item["MontoMinimo"]),
    minimumTerm: parseInt(item["PlazoMinimo"]),
    maximumAmount: parseInt(item["MontoMaximo"]),
    maximumTerm: parseInt(item["PlazoMaximo"]),
    termUnit: cdtTermMap.get(termUnitType)!,
  };
};
