import { CdtGateway, CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";
import * as cheerio from "cheerio";

export class CdtService implements CdtGateway {
  private readonly CDT_INFO_URL = process.env.CDT_INFO_URL!;

  async getAllCDTRates(): Promise<CDTRate[]> {
    const response = await fetch(this.CDT_INFO_URL);
    const cdtInfoText = await response.text();

    const cdtDocument = cheerio.load(cdtInfoText);

    const container = cdtDocument("#tasas-digital");
    const amountRangeData = container
      .find(".amount-row .pill.light")
      .first()
      .text()
      .trim();

    const minimumAmountMatch = /Desde\s+([\d$,.]+)/i.exec(amountRangeData)?.[1];
    const maximumAmountMatch = /hasta\s+([\d$,.]+)/i.exec(amountRangeData)?.[1];

    const minimumAmount = minimumAmountMatch?.includes("$")
      ? Number.parseFloat(minimumAmountMatch.replace("$", "")) * 1000
      : Number.parseFloat(minimumAmountMatch!) * 1000000;
    const maximumAmount = maximumAmountMatch?.includes("$")
      ? Number.parseFloat(maximumAmountMatch.replace("$", "")) * 1000
      : Number.parseFloat(maximumAmountMatch!) * 1000000;

    const rates: CDTRate[] = container
      .find(".table .row")
      .not(".header")
      .map((_, element) => {
        const row = cdtDocument(element);
        const rangeText = row.find(".label").text().trim();
        const rateValueText = row
          .find(".cell")
          .first()
          .text()
          .trim()
          .replace("%", "");

        const rateValue = Number.parseFloat(rateValueText);

        let minimumTerm = 0;
        let maximumTerm = 0;

        if (rangeText.includes(" y ")) {
          const [minText, maxText] = rangeText.split(" y ");
          minimumTerm = Number.parseInt(minText.replaceAll(/\D/g, ""));
          maximumTerm = Number.parseInt(maxText.replaceAll(/\D/g, ""));
        } else {
          minimumTerm = Number.parseInt(rangeText.replaceAll(/\D/g, "")) + 1;
          maximumTerm = Number.MAX_SAFE_INTEGER;
        }

        return {
          rate: rateValue,
          minimumAmount,
          minimumTerm,
          maximumAmount,
          maximumTerm,
          termUnit: CDTTermUnit.DAYS,
        };
      })
      .get();

    return rates;
  }
}
