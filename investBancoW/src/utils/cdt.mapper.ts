import { CdtRS } from "../models/cdt-rs.model";
import { CDT } from "../models/cdt.model";

export const CDTRatesMapper = (response: CdtRS): CDT[] => {
  return response.data.cdt_plazos.map((range) => ({
    minAmount: parseInt(range.monto_min),
    maxAmount: parseInt(range.monto_max),
    minTerm: parseInt(range.plazo_min),
    maxTerm: parseInt(range.plazo_max),
    rate: `${range.interes_ea}%`,
  }));
};
