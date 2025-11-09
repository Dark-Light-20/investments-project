import { CdtRS } from "../models/cdt.model.js";
import { CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";

export const cdtMapper = (response: CdtRS[]): CDTRate[] =>
  response.map((item, index) => ({
    rate: Number.parseFloat(item.field_tasa_interes),
    minimumAmount: 250000,
    minimumTerm:
      index === 0
        ? 0
        : Number.parseInt(/\d+/.exec(response[index - 1].name)![0]) + 1,
    maximumAmount: 999999999999,
    maximumTerm: Number.parseInt(/\d+/.exec(item.name)![0]),
    termUnit: CDTTermUnit.DAYS,
  }));
