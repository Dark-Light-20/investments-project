import * as cheerio from "cheerio";
import { CdtGateway, CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";

export class CdtService implements CdtGateway {
  private readonly CDT_INFO_URL = process.env.CDT_INFO_URL!;

  async getAllCDTRates(): Promise<CDTRate[]> {
    const response = await fetch(this.CDT_INFO_URL);
    const cdtInfoText = await response.text();

    const cdtDocument = cheerio.load(cdtInfoText);

    const ratesTable = cdtDocument("section.body-tax-table")
      .find("table")
      .first(); // Get first table only (contains the CDT rates)

    const amountRangeHeader = ratesTable
      .find("thead")
      .slice(1) // Get second header row (contains CDTs amount ranges)
      .first()
      .find("tr th")
      .slice(1, 2) // Get second entry only (contains Digital CDT amount range)
      .get();
    const amountRangeData = cdtDocument(amountRangeHeader[0]).text().trim();
    const minimumAmountMatch = /Desde\s+([\d$,.]+)/i.exec(amountRangeData)?.[1];
    const maximumAmountMatch = /hasta\s+([\d$,.]+)/i.exec(amountRangeData)?.[1];

    const minimumAmount = minimumAmountMatch?.includes("$")
      ? Number.parseFloat(minimumAmountMatch.replace("$", "")) * 1000
      : Number.parseFloat(minimumAmountMatch!) * 1000000;
    const maximumAmount = maximumAmountMatch?.includes("$")
      ? Number.parseFloat(maximumAmountMatch.replace("$", "")) * 1000
      : Number.parseFloat(maximumAmountMatch!) * 1000000;

    const ratesRangeData = ratesTable
      .find("tbody tr")
      .slice(1) // Skip first row (contains text info)
      .map((_, tr) => [cdtDocument(tr).children("td").slice(0, 2).get()]) // Get first two entries only (contains term range and Digital CDT rate)
      .get();

    const rates: CDTRate[] = ratesRangeData.map((rateData) => {
      const rangeText = cdtDocument(rateData[0]).text().trim();
      const rateValueText = cdtDocument(rateData[1])
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
    });

    return rates;
  }
}
