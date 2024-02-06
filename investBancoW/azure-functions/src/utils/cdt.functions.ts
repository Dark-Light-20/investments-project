import { CdtRS } from "../models/cdt-rs.model";
import { CDT } from "../models/cdt.model";
import { CDTRatesMapper } from "./cdt.mapper";
import { PERCENTAGE_DIV, DAYS_IN_YEAR, PERIOTICITY } from "./number-constants";

const CDT_INFO_URL = process.env.CDT_INFO_URL!;

export async function getCDTRates(): Promise<CDT[]> {
  const data: CdtRS = await (await fetch(CDT_INFO_URL)).json();
  const rates: CDT[] = CDTRatesMapper(data);
  return rates;
}

export async function getCDTRateByParams(
  amount: number,
  days: number
): Promise<CDT> {
  const rates: CDT[] = await getCDTRates();
  const amountRates = rates.filter(
    (rate) => amount >= rate.minAmount && amount <= rate.maxAmount
  );
  if (!amountRates) throw new Error("Invalid amount");
  const cdt = amountRates.find(
    (rate) => days >= rate.minTerm && days <= rate.maxTerm
  );
  if (!cdt) throw new Error("Invalid days");
  return cdt;
}

export async function calculateInvest(
  amount: number,
  days: number
): Promise<number> {
  const cdt: CDT = await getCDTRateByParams(amount, days);
  const efectiveRate =
    parseFloat(cdt.rate.substring(0, cdt.rate.length - 1)) / PERCENTAGE_DIV;
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
