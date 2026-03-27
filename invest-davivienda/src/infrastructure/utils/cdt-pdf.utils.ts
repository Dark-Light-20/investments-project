import { Output } from "pdf2json";
import { load } from "cheerio";
import { CDTTermUnit } from "@dark-light-20/invest-domain";
import { CdtPdfRow } from "../models/cdt.model.js";
import {
  MAXIMUM_INVESTMENT_TERM_DAYS,
  MAXIMUM_CDT_AMOUNT,
  MINIMUM_CDT_AMOUNT,
} from "./number.constants.js";

interface TermRange {
  minimumTerm: number;
  maximumTerm: number;
}

interface AmountRange {
  minimumAmount: number;
  maximumAmount: number;
}

const Y_TOLERANCE = 0.35;
const TERM_RANGE_REGEX = /(\d{1,4})\s*(?:-|–)\s*(\d{1,4})/g;
const TERM_OPEN_RANGE_REGEX = />=?\s*(\d{1,4})/i;
const RATE_REGEX = /(\d{1,2}(?:[.,]\d{1,4})?)\s*%/g;
const NUEVO_ROW_REGEX =
  /Nuevo\s*ó?\s*Pr[oó]rroga\s*Autom[aá]tica\s*((?:\d{1,2}(?:[.,]\d{1,4})?%\s*){8,12})/gi;
const TARGET_SECTION_BLOCK_REGEX =
  /CDT\s*M[ÓO]VIL\s*-\s*Desde\s*cuentas\s*de\s*otros\s*Bancos\s*\(PSE\)([\s\S]*?)\*\s*TASAS\s*E\.A\./i;
const TARGET_SECTION_NAME = "CDT MOVIL - DESDE CUENTAS DE OTROS BANCOS (PSE)";

const TARGET_AMOUNT_BUCKETS: AmountRange[] = [
  { minimumAmount: MINIMUM_CDT_AMOUNT, maximumAmount: 50_000_000 },
  { minimumAmount: 50_000_001, maximumAmount: 99_900_000 },
  { minimumAmount: 100_000_000, maximumAmount: 499_900_000 },
  { minimumAmount: 500_000_000, maximumAmount: MAXIMUM_CDT_AMOUNT },
];

const normalizeSpaces = (value: string): string =>
  value
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();

const decodeCellValue = (raw: string): string => {
  try {
    return normalizeSpaces(decodeURIComponent(raw));
  } catch {
    return normalizeSpaces(raw);
  }
};

const parseNumericValue = (value: string): number => {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  return Number.parseFloat(normalized);
};

export const extractPdfUrlFromHtml = (
  html: string,
  sourceUrl: string,
): string | null => {
  const $ = load(html);
  const link = $("a").filter((_index, element) => {
    const text = normalizeSpaces($(element).text().toLowerCase());
    return text.includes("nuestras tasas") && text.includes("tarifas");
  });

  const href = link.attr("href");
  if (!href) {
    return null;
  }

  try {
    return new URL(href, sourceUrl).toString();
  } catch {
    return null;
  }
};

export const extractAllTextFromPdf = (pdfData: Output): string => {
  const lines: string[] = [];

  for (const page of pdfData.Pages) {
    const cells = page.Texts.map((text) => ({
      x: text.x,
      y: text.y,
      value: decodeCellValue(text.R[0].T),
    })).filter((cell) => cell.value);

    cells.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y));

    const groupedRows: { x: number; y: number; value: string }[][] = [];

    for (const cell of cells) {
      const currentRow = groupedRows[groupedRows.length - 1];
      if (!currentRow) {
        groupedRows.push([cell]);
        continue;
      }

      const rowY = currentRow[0].y;
      if (Math.abs(cell.y - rowY) <= Y_TOLERANCE) {
        currentRow.push(cell);
      } else {
        groupedRows.push([cell]);
      }
    }

    for (const row of groupedRows) {
      const line = row
        .sort((a, b) => a.x - b.x)
        .map((item) => item.value)
        .join(" ")
        .trim();

      if (line) {
        lines.push(line);
      }
    }
  }

  return lines.join("\n");
};

const parseRates = (rowText: string): number[] =>
  [...rowText.matchAll(RATE_REGEX)]
    .map((match) => parseNumericValue(match[1]))
    .filter((rate) => Number.isFinite(rate) && rate > 0 && rate <= 100);

const parseTermRanges = (rowText: string): TermRange[] => {
  const ranges: TermRange[] = [];

  for (const match of rowText.matchAll(TERM_RANGE_REGEX)) {
    const minimumTerm = Number.parseInt(match[1], 10);
    const maximumTerm = Number.parseInt(match[2], 10);

    if (!Number.isFinite(minimumTerm) || !Number.isFinite(maximumTerm)) {
      continue;
    }

    ranges.push({
      minimumTerm: Math.min(minimumTerm, maximumTerm),
      maximumTerm: Math.max(minimumTerm, maximumTerm),
    });
  }

  const openRangeMatch = rowText.match(TERM_OPEN_RANGE_REGEX);
  if (openRangeMatch) {
    const minimumTerm = Number.parseInt(openRangeMatch[1], 10);
    if (Number.isFinite(minimumTerm)) {
      ranges.push({
        minimumTerm,
        maximumTerm: Math.max(minimumTerm, MAXIMUM_INVESTMENT_TERM_DAYS),
      });
    }
  }

  return ranges;
};

const extractRowsFromPseTextBlock = (pdfData: Output): CdtPdfRow[] => {
  const fullText = normalizeSpaces(extractAllTextFromPdf(pdfData));
  const sectionMatch = fullText.match(TARGET_SECTION_BLOCK_REGEX);

  if (!sectionMatch) {
    return [];
  }

  const sectionText = sectionMatch[1];
  const termRanges = parseTermRanges(sectionText).slice(0, 9);
  if (!termRanges.length) {
    return [];
  }

  const nuevoRows = [...sectionText.matchAll(NUEVO_ROW_REGEX)]
    .map((match) => parseRates(match[1]))
    .filter((rates) => rates.length > 0)
    .slice(0, TARGET_AMOUNT_BUCKETS.length);

  const extractedRows: CdtPdfRow[] = [];

  for (let bucketIndex = 0; bucketIndex < nuevoRows.length; bucketIndex++) {
    const rates = nuevoRows[bucketIndex];
    const amountRange = TARGET_AMOUNT_BUCKETS[bucketIndex];
    const entries = Math.min(termRanges.length, rates.length);

    for (let index = 0; index < entries; index++) {
      extractedRows.push({
        section: TARGET_SECTION_NAME,
        minimumTerm: termRanges[index].minimumTerm,
        maximumTerm: termRanges[index].maximumTerm,
        termUnit: CDTTermUnit.DAYS,
        rate: rates[index],
        minimumAmount: amountRange.minimumAmount,
        maximumAmount: amountRange.maximumAmount,
      });
    }
  }

  return extractedRows;
};

export const extractCdtRowsBySections = (pdfData: Output): CdtPdfRow[] => {
  const extractedRows = extractRowsFromPseTextBlock(pdfData);

  if (!extractedRows.length) {
    throw new Error(
      "No CDT rows found in target Davivienda CDT Móvil section.",
    );
  }

  return extractedRows;
};
