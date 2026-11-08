import { CdtGateway, CDTRate } from "@dark-light-20/invest-domain";
import { extractCdtRowsBySections } from "../utils/cdt-pdf.utils.js";
import { cdtMapper } from "../mappers/cdt.mapper.js";
import PDFParser, { Output } from "pdf2json";

export class CdtService implements CdtGateway {
  private static cachedRates: CDTRate[] | null = null;
  private static cacheExpiresAt = 0;
  private static inFlightRequest: Promise<CDTRate[]> | null = null;

  private readonly CDT_PDF_URL = process.env.CDT_PDF_URL!;
  private readonly CACHE_TTL_MS = Number(
    process.env.CDT_CACHE_TTL_MS ?? 24 * 60 * 60 * 1000,
  );
  private readonly MAX_FETCH_ATTEMPTS = Number(
    process.env.CDT_FETCH_RETRIES ?? 5,
  );
  private readonly USER_AGENT =
    process.env.CDT_USER_AGENT ??
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

  async getAllCDTRates(): Promise<CDTRate[]> {
    const cachedRates = this.getValidCachedRates(Date.now());
    if (cachedRates) {
      return cachedRates;
    }

    if (CdtService.inFlightRequest) {
      return CdtService.inFlightRequest;
    }

    CdtService.inFlightRequest = this.fetchRatesFromPdf();

    try {
      const mappedRates = await CdtService.inFlightRequest;

      if (this.CACHE_TTL_MS > 0) {
        CdtService.cachedRates = mappedRates;
        CdtService.cacheExpiresAt = Date.now() + this.CACHE_TTL_MS;
      }

      return mappedRates;
    } catch (error) {
      const fallbackCache = CdtService.cachedRates;
      if (fallbackCache) {
        return fallbackCache;
      }

      throw error;
    } finally {
      CdtService.inFlightRequest = null;
    }
  }

  private getValidCachedRates(currentTime: number): CDTRate[] | null {
    if (this.CACHE_TTL_MS <= 0) {
      return null;
    }

    if (!CdtService.cachedRates) {
      return null;
    }

    if (currentTime >= CdtService.cacheExpiresAt) {
      return null;
    }

    return CdtService.cachedRates;
  }

  private async fetchRatesFromPdf(): Promise<CDTRate[]> {
    const pdfBuffer = await this.getPdfBuffer(this.CDT_PDF_URL);
    const pdfData = await this.parsePdfBuffer(pdfBuffer);
    const rawCdtRows = extractCdtRowsBySections(pdfData);
    return cdtMapper(rawCdtRows);
  }

  private async getPdfBuffer(pdfUrl: string): Promise<Buffer> {
    let cookieHeader = "";
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.MAX_FETCH_ATTEMPTS; attempt++) {
      const response = await fetch(pdfUrl, {
        headers: {
          accept:
            "application/pdf,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "es-CO,es;q=0.9,en;q=0.8",
          referer: "https://www.davivienda.com/",
          "user-agent": this.USER_AGENT,
          ...(cookieHeader ? { cookie: cookieHeader } : {}),
        },
      });

      cookieHeader = this.mergeCookies(cookieHeader, response.headers);

      if (!response.ok) {
        lastError = new Error(`Failed to fetch PDF: ${response.status}`);
        if (response.status === 403 && attempt < this.MAX_FETCH_ATTEMPTS) {
          await this.waitBeforeRetry(attempt);
          continue;
        }
        throw lastError;
      }

      const contentType =
        response.headers.get("content-type")?.toLowerCase() ?? "";
      const buffer = Buffer.from(await response.arrayBuffer());

      if (this.isPdfResponse(contentType, buffer)) {
        return buffer;
      }

      lastError = new Error(
        "Failed to fetch PDF: response is not a valid PDF (received HTML/challenge page).",
      );

      if (attempt < this.MAX_FETCH_ATTEMPTS) {
        await this.waitBeforeRetry(attempt);
        continue;
      }

      throw lastError;
    }

    throw lastError ?? new Error("Failed to fetch PDF after retries.");
  }

  private async waitBeforeRetry(attempt: number): Promise<void> {
    const delayMilliseconds = Math.min(250 * 2 ** (attempt - 1), 2500);
    await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
  }

  private mergeCookies(currentCookieHeader: string, headers: Headers): string {
    const cookieMap = new Map<string, string>();

    if (currentCookieHeader) {
      for (const item of currentCookieHeader.split(";")) {
        const [name, ...rest] = item.trim().split("=");
        if (!name || !rest.length) {
          continue;
        }
        cookieMap.set(name, rest.join("="));
      }
    }

    const setCookieValues = this.getSetCookieValues(headers);

    for (const rawCookie of setCookieValues) {
      const [cookiePair] = rawCookie.split(";");
      const [name, ...rest] = cookiePair.trim().split("=");
      if (!name || !rest.length) {
        continue;
      }
      cookieMap.set(name, rest.join("="));
    }

    return [...cookieMap.entries()]
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  private getSetCookieValues(headers: Headers): string[] {
    const getSetCookie = (
      headers as Headers & { getSetCookie?: () => string[] }
    ).getSetCookie;
    if (typeof getSetCookie === "function") {
      return getSetCookie.call(headers);
    }

    const singleSetCookie = headers.get("set-cookie");
    return singleSetCookie ? [singleSetCookie] : [];
  }

  private isPdfResponse(contentType: string, buffer: Buffer): boolean {
    if (contentType.includes("application/pdf")) {
      return true;
    }

    return buffer.subarray(0, 5).toString() === "%PDF-";
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
