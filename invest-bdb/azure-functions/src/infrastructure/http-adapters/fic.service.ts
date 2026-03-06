import * as cheerio from "cheerio";
import { FIC, FICGateway } from "@dark-light-20/invest-domain";
import { ficMapper } from "../mappers/fic.mapper.js";
import { FICConfig, FICRawModel } from "../models/fic.model.js";

export class FicService implements FICGateway {
  private readonly ficConfigs: FICConfig[] = JSON.parse(
    process.env.FIC_CONFIG!,
  );

  async getFICs(): Promise<FIC[]> {
    const allFics: FIC[] = [];

    // Fetch and parse each configured FIC
    for (const config of this.ficConfigs) {
      try {
        const fic = await this.extractFIC(config);
        if (fic) {
          allFics.push(fic);
        }
      } catch (error) {
        console.error(
          `Error fetching FIC "${config.name}" from ${config.url}:`,
          error,
        );
        // Continue with other FICs even if one fails
      }
    }

    return allFics;
  }

  private async extractFIC(config: FICConfig): Promise<FIC | null> {
    const { name, url, rowName } = config;
    const response = await fetch(url);
    const ficInfoText = await response.text();

    const $ = cheerio.load(ficInfoText);

    const table = $(".tabla-redondeada table");
    const keys = table
      .find("thead th")
      .map((_, th) => {
        // Normalize column names: remove line breaks and extra text like "% E.A"
        const text = $(th)
          .text()
          .replace(/\s+/g, " ") // Replace multiple whitespace/newlines with single space
          .replace(/% E\.A/gi, "") // Remove "% E.A" text
          .trim();
        return text as keyof FICRawModel;
      })
      .get()
      .slice(1); // Skip first column header (name column)

    // Find the specific row matching the configured rowName
    const targetRow = table.find("tbody tr").filter((_, row) => {
      const firstCell = $(row).find("td").first().text().trim();
      return firstCell.toLowerCase() === rowName.toLowerCase();
    });

    if (targetRow.length === 0) {
      console.warn(`FIC row "${rowName}" not found in ${url}`);
      return null;
    }

    const cells = targetRow.find("td");
    const ficDataValues = cells.map((_, td) => $(td).text().trim()).get();

    const rawFIC = Object.fromEntries([
      ["name", name],
      ...keys.map((key, i) => [key, ficDataValues[i + 1]]),
    ]);

    return ficMapper(rawFIC as FICRawModel);
  }
}
