import { CdtGateway, CDTRate } from "@dark-light-20/invest-domain";
import { CDTRS } from "../models/cdt-rs.model.js";
import { CDTRatesMapper } from "../mappers/cdt.mapper.js";

export class CdtService implements CdtGateway {
  private readonly CDT_INFO_URL = process.env.CDT_INFO_URL!;

  async getAllCDTRates(): Promise<CDTRate[]> {
    const data: CDTRS = await (await fetch(this.CDT_INFO_URL)).json();
    return CDTRatesMapper(data);
  }
}
