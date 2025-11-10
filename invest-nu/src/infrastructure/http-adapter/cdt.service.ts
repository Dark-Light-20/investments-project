import { CdtGateway, CDTRate } from "@dark-light-20/invest-domain";
import { CdtRS } from "../models/cdt.model.js";
import { CDTRatesMapper } from "../mappers/cdt.mapper.js";

export class CdtService implements CdtGateway {
  private readonly CDT_INFO_URL = process.env.CDT_INFO_URL!;

  async getAllCDTRates(): Promise<CDTRate[]> {
    const data: CdtRS = await (await fetch(this.CDT_INFO_URL)).json();
    return CDTRatesMapper(data);
  }
}
