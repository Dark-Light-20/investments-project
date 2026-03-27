import { CdtGateway, CDTRate } from "@dark-light-20/invest-domain";
import { randUserAgent } from "@ngneat/falso";
import {
  extractCdtRowsBySections,
  extractPdfUrlFromHtml,
} from "../utils/cdt-pdf.utils.js";
import { cdtMapper } from "../mappers/cdt.mapper.js";
import PDFParser, { Output } from "pdf2json";

export class CdtService implements CdtGateway {
  private readonly CDT_INFO_URL = process.env.CDT_INFO_URL!;

  async getAllCDTRates(): Promise<CDTRate[]> {
    const pdfUrl = await this.getPdfUrlFromWebPage(this.CDT_INFO_URL);
    const pdfBuffer = await this.getPdfBuffer(pdfUrl);
    const pdfData = await this.parsePdfBuffer(pdfBuffer);
    const rawCdtRows = extractCdtRowsBySections(pdfData);
    return cdtMapper(rawCdtRows);
  }

  private async getPdfUrlFromWebPage(pageUrl: string): Promise<string> {
    const response = await fetch(pageUrl, {
      headers: {
        "user-agent": randUserAgent(),
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Davivienda page: ${response.status}`);
    }

    const html = await response.text();
    const pdfUrl = extractPdfUrlFromHtml(html, pageUrl);

    if (!pdfUrl) {
      throw new Error("No PDF link found in Davivienda page.");
    }

    return pdfUrl;
  }

  private async getPdfBuffer(pdfUrl: string): Promise<Buffer> {
    const response = await fetch(pdfUrl, {
      headers: {
        "user-agent": randUserAgent(),
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  private async parsePdfBuffer(pdfBuffer: Buffer): Promise<Output> {
    const pdfParser = new PDFParser();
    return new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (error) => reject(error));
      pdfParser.on("pdfParser_dataReady", (pdfData) => resolve(pdfData));
      pdfParser.parseBuffer(pdfBuffer);
    });
  }
}
