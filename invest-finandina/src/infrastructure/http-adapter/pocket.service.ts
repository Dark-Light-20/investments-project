import { PocketGateway } from "@dark-light-20/invest-domain";
import * as cheerio from "cheerio";

export class PocketService implements PocketGateway {
  private readonly POCKET_INFO_URL = process.env.POCKET_INFO_URL!;

  async getPocketRate(): Promise<number> {
    const response = await fetch(this.POCKET_INFO_URL);
    const pocketInfoText = await response.text();

    const pocketDocument = cheerio.load(pocketInfoText);

    const container = pocketDocument("#tasas-flexidigital");
    const pocketRow = container.find(".row").filter((_, el) => {
      return pocketDocument(el)
        .find(".label")
        .text()
        .toLowerCase()
        .includes("bolsillo de ahorro");
    });

    const rateText = pocketRow
      .find(".cell")
      .first()
      .text()
      .trim()
      .replace(/%.*/, "");

    const rateValue = Number.parseFloat(rateText);
    return rateValue;
  }
}
