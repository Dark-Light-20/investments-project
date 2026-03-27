import { CDTRate, CDTTermUnit } from "@dark-light-20/invest-domain";
import { CdtPdfRow } from "../models/cdt.model.js";
import { MAXIMUM_INVESTMENT_TERM_DAYS } from "../utils/number.constants.js";

interface CdtMapperConfig {
  terminalMinTerm: number;
  terminalMaxTerm: number;
  fallbackMaxTerm: number;
}

const sanitizeRates = (rows: CdtPdfRow[]): CDTRate[] =>
  rows
    .filter(
      (item) =>
        Number.isFinite(item.rate) &&
        item.rate > 0 &&
        item.rate <= 100 &&
        Number.isFinite(item.minimumTerm) &&
        item.minimumTerm > 0 &&
        Number.isFinite(item.maximumTerm) &&
        item.maximumTerm > 0 &&
        Number.isFinite(item.minimumAmount) &&
        item.minimumAmount > 0 &&
        Number.isFinite(item.maximumAmount) &&
        item.maximumAmount >= item.minimumAmount,
    )
    .map((item) => ({
      rate: item.rate,
      minimumAmount: item.minimumAmount,
      minimumTerm: Math.min(item.minimumTerm, item.maximumTerm),
      maximumAmount: item.maximumAmount,
      maximumTerm: Math.max(item.minimumTerm, item.maximumTerm),
      termUnit: item.termUnit,
    }));

const buildRateKey = (item: CDTRate): string =>
  `${item.minimumAmount}-${item.maximumAmount}-${item.minimumTerm}-${item.maximumTerm}-${item.termUnit}-${item.rate}`;

const deduplicateRates = (rates: CDTRate[]): CDTRate[] =>
  Array.from(new Map(rates.map((item) => [buildRateKey(item), item])).values());

const sortRates = (rates: CDTRate[]): CDTRate[] =>
  rates.sort((a, b) => {
    if (a.termUnit !== b.termUnit) {
      return a.termUnit.localeCompare(b.termUnit);
    }

    if (a.minimumAmount !== b.minimumAmount) {
      return a.minimumAmount - b.minimumAmount;
    }

    return a.minimumTerm - b.minimumTerm;
  });

const normalizeTermRanges = (
  rates: CDTRate[],
  config: CdtMapperConfig,
): CDTRate[] => {
  const ratesByUnit = new Map<CDTTermUnit, CDTRate[]>();

  for (const rate of rates) {
    const current = ratesByUnit.get(rate.termUnit) ?? [];
    current.push({ ...rate });
    ratesByUnit.set(rate.termUnit, current);
  }

  const normalized: CDTRate[] = [];

  for (const [_, unitRates] of ratesByUnit) {
    unitRates.sort((a, b) => a.minimumTerm - b.minimumTerm);

    for (let index = 0; index < unitRates.length; index++) {
      const current = unitRates[index];
      const next = unitRates[index + 1];

      if (current.minimumTerm >= config.terminalMinTerm) {
        current.maximumTerm = config.terminalMaxTerm;
        normalized.push(current);
        continue;
      }

      if (current.maximumTerm < current.minimumTerm) {
        current.maximumTerm = current.minimumTerm;
      }

      if (
        current.maximumTerm === current.minimumTerm &&
        next &&
        next.minimumTerm > current.minimumTerm
      ) {
        current.maximumTerm = next.minimumTerm - 1;
      }

      if (
        index === unitRates.length - 1 &&
        current.maximumTerm === current.minimumTerm
      ) {
        current.maximumTerm = Math.max(
          current.maximumTerm,
          config.fallbackMaxTerm,
        );
      }

      normalized.push(current);
    }
  }

  return normalized;
};

const createCdtMapper =
  (config: CdtMapperConfig) =>
  (rows: CdtPdfRow[]): CDTRate[] => {
    const sanitized = sanitizeRates(rows);
    const deduplicated = deduplicateRates(sanitized);
    return sortRates(normalizeTermRanges(deduplicated, config));
  };

export const cdtMapper = createCdtMapper({
  terminalMinTerm: MAXIMUM_INVESTMENT_TERM_DAYS,
  terminalMaxTerm: MAXIMUM_INVESTMENT_TERM_DAYS,
  fallbackMaxTerm: MAXIMUM_INVESTMENT_TERM_DAYS,
});
