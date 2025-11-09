import { CdtRS } from "../models/cdt.model.js";
import { CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";
import {
  LIMIT_INVESTMENT_TERM,
  MAXIMUM_CDT_AMOUNT,
  MINIMUM_CDT_AMOUNT,
} from "../utils/number.constants.js";

export const cdtMapper = (response: CdtRS[]): CDTRate[] =>
  response.map((item, index) => ({
    rate: Number.parseFloat(item.field_tasa_interes),
    minimumAmount: MINIMUM_CDT_AMOUNT,
    minimumTerm: Number.parseInt(/\d+/.exec(item.name)![0]),
    maximumAmount: MAXIMUM_CDT_AMOUNT,
    maximumTerm:
      index === response.length - 1
        ? LIMIT_INVESTMENT_TERM
        : Number.parseInt(/\d+/.exec(response[index + 1].name)![0]) - 1,
    termUnit: CDTTermUnit.DAYS,
  }));
