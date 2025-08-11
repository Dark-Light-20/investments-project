import { CdtGateway, CDTRate } from "@dark-light-20/invest-domain";
import { CDTRawModel } from "../models/cdt.model.js";
import { randUserAgent } from "@ngneat/falso";
import { cdtMapper } from "../mappers/cdt.mapper.js";

export class CdtService implements CdtGateway {
  private readonly CDT_INFO_URL = process.env.CDT_INFO_URL!;

  async getAllCDTRates(): Promise<CDTRate[]> {
    const cdtInfo: CDTRawModel[] = await (
      await fetch(this.CDT_INFO_URL, {
        headers: { "user-agent": randUserAgent() },
      })
    ).json();
    const cdtTypes = cdtInfo.map((item) => item.ratesAttributes).flat();
    return cdtTypes.map((item) => cdtMapper(item));
  }
}
