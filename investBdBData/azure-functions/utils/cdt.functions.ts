import { randUserAgent } from "@ngneat/falso";
import { CDT, CDTRawModel, CDTTermUnitTypes } from "../models/cdt.model";
import { CDTMapper } from "./cdt.mapper";
import {
  PERCENTAGE_DIV,
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  PERIOTICITY,
} from "./number-constants";

const CDT_RATES_ENDPOINT = process.env.CDT_RATES_ENDPOINT;

export async function getCDTRates(): Promise<CDT[]> {
  const cdtInfo: CDTRawModel[] = await (
    await fetch(CDT_RATES_ENDPOINT, {
      headers: { "user-agent": randUserAgent() },
    })
  ).json();
  const cdtTypes = cdtInfo.map((item) => item.ratesAttributes).flat();
  const cdtRates = cdtTypes.map((item) => CDTMapper(item));
  return cdtRates;
}

export async function getCDTRate(
  amount: number,
  term: number,
  termUnit: CDTTermUnitTypes
): Promise<CDT | undefined> {
  const cdts = await getCDTRates();
  const rate = cdts.find(
    (rate) =>
      rate.minimumAmount <= amount &&
      rate.maximumAmount >= amount &&
      rate.minimumTerm <= term &&
      rate.maximumTerm >= term &&
      rate.termUnitType === termUnit
  );
  return rate;
}

export async function calculateInvest(
  amount: number,
  term: number,
  termUnit: CDTTermUnitTypes
): Promise<number> {
  const cdt: CDT | undefined = await getCDTRate(amount, term, termUnit);
  if (!cdt) throw new Error("No rate found");
  const efectiveRate = parseFloat(cdt.rate) / PERCENTAGE_DIV;
  const days = termUnit === CDTTermUnitTypes.DAYS ? term : term * DAYS_IN_MONTH;
  const capitalization = DAYS_IN_YEAR / days;
  const nominalRate = getNominalRate(efectiveRate, capitalization);
  const invest = amount * (nominalRate / (DAYS_IN_YEAR / days));
  return invest;
}

export function getNominalRate(
  efectiveRate: number,
  capitalization: number,
  perioticity: number = PERIOTICITY
): number {
  return (
    (((1 + efectiveRate) * perioticity) ** (1 / capitalization) - 1) *
    capitalization
  );
}
