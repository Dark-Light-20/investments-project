import * as cheerio from "cheerio";
import { FIC, FICGateway } from "@dark-light-20/invest-domain";
import { ficMapper } from "../mappers/fic.mapper.js";
import { FICRawModel } from "../models/fic.model.js";

export class FicService implements FICGateway {
  private readonly FIC_INFO_URL = process.env.FIC_INFO_URL!;

  async getFICs(): Promise<FIC[]> {
    const response = await fetch(this.FIC_INFO_URL);
    const ficInfoText = await response.text();

    const ficDocument = cheerio.load(ficInfoText);

    // FIC types (by historic days available entries)
    const types = ficDocument(".renta-content").find("table");
    const fics = types
      .map((_, table) => {
        const ficType = ficDocument(table);
        const keys = ficType
          .find("th")
          .map((_, th) => ficDocument(th).text().trim() as keyof FICRawModel)
          .get()
          .slice(1); // Skip first entry, which is empty, because is name column

        return ficType
          .find("tbody tr") // FIC data row
          .map((_, ficData) => {
            const dataItem = ficDocument(ficData).find("td");

            // FIC category case
            if (dataItem.length <= 1) {
              return null;
            }

            const ficDataValues = dataItem
              .map((_, data) => ficDocument(data).text().trim())
              .get();

            const rawFIC = Object.fromEntries([
              ["0", ficDataValues[0]],
              ...keys.map((key, i) => [key, ficDataValues[i + 1]]),
            ]);

            return ficMapper(rawFIC as FICRawModel);
          })
          .get()
          .filter((fic): fic is FIC => fic !== null); // Delete invalid FICs (category row case)
      })
      .get()
      .flat();

    return fics;
  }
}
