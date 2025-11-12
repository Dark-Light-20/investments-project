import { PocketGateway } from "@dark-light-20/invest-domain";
import * as cheerio from "cheerio";

export class PocketService implements PocketGateway {
  private readonly POCKET_INFO_URL = process.env.POCKET_INFO_URL!;

  async getPocketRate(): Promise<number> {
    const response = await fetch(this.POCKET_INFO_URL);
    const pocketInfoText = await response.text();

    const pocketDocument = cheerio.load(pocketInfoText);

    const rateHeader = pocketDocument(
      "section.body-tax-table section.tax-savings-account-classic"
    )
      .find("h2")
      .get()
      .find((el) =>
        pocketDocument(el).text().toLowerCase().includes("flexidigital")
      )!;

    const rateTable = pocketDocument(rateHeader.parent!)
      .find("table")
      .first()
      .get();

    const rateElement = pocketDocument(rateTable)
      .find("tbody tr")
      .first()
      .find("td")
      .get()[1]; // Get second entry (contains Flexidigital rate)

    const rateText = pocketDocument(rateElement)
      .text()
      .trim()
      .replace(/%.*/, "");

    const rateValue = Number.parseFloat(rateText);
    return rateValue;
  }
}
