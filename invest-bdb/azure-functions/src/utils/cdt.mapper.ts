import { CDT, RatesAttribute } from "../models/cdt.model";

export const CDTMapper = (item: RatesAttribute): CDT => {
  const term = item["UnidadPlazo"];
  const termUnit = parseInt(term.substring(0, 1));
  const termUnitType = item["UnidadPlazo"]
    .substring(3, item["UnidadPlazo"].length - 1)
    .trim();
  return {
    sign: item["Signo"],
    type: item["ProductoCDT"],
    rate: item["TasaSpread"],
    termUnit: termUnit,
    termUnitType: termUnitType,
    minimumAmount: parseInt(item["MontoMinimo"]),
    minimumTerm: parseInt(item["PlazoMinimo"]),
    maximumAmount: parseInt(item["MontoMaximo"]),
    maximumTerm: parseInt(item["PlazoMaximo"]),
  };
};
