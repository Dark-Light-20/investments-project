import { PocketGateway } from "@dark-light-20/invest-domain";
import { CdtRS } from "../models/cdt.model.js";

export class PocketService implements PocketGateway {
  private readonly POCKET_INFO_URL = process.env.POCKET_INFO_URL!;

  async getPocketRate(): Promise<number> {
    const ratesInfo: CdtRS = await (await fetch(this.POCKET_INFO_URL)).json();
    const rateData = ratesInfo.yields.find((rate) => rate.maturity === "0");
    const rate = Number.parseFloat(rateData!.yield_rate) * 100;
    return rate;
  }
}
