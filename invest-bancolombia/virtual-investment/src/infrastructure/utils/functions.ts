import { Output } from "pdf2json";
import { FicData } from "../models/fic.model.js";

// Utilities
const trim = (s: unknown) => String(s ?? "").trim();
const isUppercaseCategory = (s: string) => /^[A-ZÁÉÍÓÚÜÑ\s]+$/.test(trim(s));
const isName = (s: string) => /[a-záéíóúüñ]/.test(s);
const isPercent = (s: string) => trim(s) === "%";
const isCurrency = (s: string) => /^\$$/i.test(trim(s));
const isNumericToken = (s: string) =>
  /^-?\d{1,3}(?:([.,])\d{3})*(?:[.,]\d+)?$|^-?\d+(?:[.,]\d+)?$/.test(trim(s));
const normalizeNumber = (s: string) => trim(s).replace(",", ".");
const isAllSpanishUppercase = (str: string) =>
  /\p{L}/u.test(str) && !/\p{Ll}/u.test(str);

export function getFicRawData(pdfData: Output): string[] {
  const raw = pdfData.Pages.flatMap((page) =>
    page.Texts.map((text) => decodeURIComponent(text.R[0].T))
  );
  const start = raw.findIndex(isAllSpanishUppercase);
  const end =
    raw.findIndex(
      (item) => item.trim() === "Rentabilidad fondos de inversión colectiva"
    ) - 4;
  return raw.slice(start, end);
}

function tryReadMoneyPair(arr: string[], startIndex: number) {
  const [m1, v1, m2, v2] = [
    arr[startIndex],
    arr[startIndex + 1],
    arr[startIndex + 2],
    arr[startIndex + 3],
  ].map(trim);
  if (
    isCurrency(m1) &&
    isNumericToken(v1) &&
    isCurrency(m2) &&
    isNumericToken(v2)
  ) {
    return {
      nextIndex: startIndex + 4,
      amount: parseFloat(v1.replaceAll(",", "")),
      unitValue: parseFloat(v2.replaceAll(",", "")),
    };
  }
  return null;
}

export function extractFICs(data: string[]) {
  const res: FicData[] = [];
  let category: string | null = null;
  let current: Omit<FicData, "category"> | null = null;

  const push = () => {
    if (current && category) {
      res.push({ ...current, name: current.name.trim(), category });
    }
    current = null;
  };

  for (let i = 0; i < data.length; i++) {
    const item = trim(data[i]);
    if (!item) continue;

    if (isUppercaseCategory(item)) {
      push();
      category = item;
      continue;
    }

    if (isName(item)) {
      if (current && current.rates.length) push();
      if (category) {
        current = { name: item, rates: [], amount: 0, unitValue: 0 };
        const money = tryReadMoneyPair(data, i + 1);
        if (money) {
          current.amount = money.amount;
          current.unitValue = money.unitValue;
          i = money.nextIndex - 1;
        }
      }
      continue;
    }

    if (isNumericToken(item) && isPercent(data[i + 1])) {
      if (current) current.rates.push(normalizeNumber(item));
      i++;
    }
  }

  push();
  return res;
}
