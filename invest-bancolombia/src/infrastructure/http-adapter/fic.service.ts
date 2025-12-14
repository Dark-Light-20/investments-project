import { FIC, FICGateway } from "@dark-light-20/invest-domain";
import * as cheerio from "cheerio";
import PDFParser from "pdf2json";
import { extractFICs, getFicRawData } from "../utils/functions.js";
import { ficMapper } from "../mappers/fic.mapper.js";

export class FICService implements FICGateway {
  private readonly FIC_INFO_URL = process.env.FIC_INFO_URL!;

  async getFICs(): Promise<FIC[]> {
    const ficInfoText = await (await fetch(this.FIC_INFO_URL)).text();
    const ficInfoDocumentQuery = cheerio.load(ficInfoText);
    const ficDataLink = ficInfoDocumentQuery("section#CheckListModule a")
      .first()
      .attr("href");
    const ficBufferPDF = Buffer.from(
      await (await fetch(ficDataLink!)).arrayBuffer()
    );
    const pdfParser = new PDFParser();

    return new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (err) => reject(err));
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        const rawFicData = getFicRawData(pdfData);
        const ficData = extractFICs(rawFicData);
        resolve(ficMapper(ficData));
      });
      pdfParser.parseBuffer(ficBufferPDF);
    });
  }
}
