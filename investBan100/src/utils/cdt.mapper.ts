import { CdtRS } from "../models/cdt-rs.model";
import { CDT } from "../models/cdt.model";

export const CDTRatesMapper = (response: CdtRS[]): CDT[] =>
  response.map((item) => ({
    baseTerm: parseInt(/\d+/.exec(item.name)![0]),
    rate: parseFloat(item.field_tasa_interes),
  }));
