import { Request, Response, Router } from "express";
import { CdtRS } from "../models/cdt-rs.model";
import { CDT } from "../models/cdt.model";
import { CDTRatesMapper } from "../utils/cdt.mapper";
import {
  AMOUNT_DECIMAL_PRECISION,
  DAYS_IN_YEAR,
  INTEREST_DECIMAL_PRECISION,
  PERCENTAGE_DIV,
  PERIOTICITY,
} from "../utils/number-constants";

const CDT_INFO_URL = process.env.CDT_INFO_URL!;

const route = Router();

route.get("/rates", async (_: Request, res: Response) => {
  try {
    const rates: CDT[] = await getCDTRates();
    res.json(rates);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json(message);
  }
});

route.post("/calculateRate", async (req: Request, res: Response) => {
  try {
    const { days } = req.body;
    const rate: CDT = await getCDTRateByParams(days);
    res.json(rate);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json(message);
  }
});

route.post("/calculateInvest", async (req: Request, res: Response) => {
  try {
    const { amount, days } = req.body;
    const invest: number = await calculateInvest(amount, days);
    res.json(invest.toFixed(2));
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json(message);
  }
});

export async function getCDTRates(): Promise<CDT[]> {
  const data: CdtRS = await (await fetch(CDT_INFO_URL)).json();
  const rates: CDT[] = CDTRatesMapper(data);
  return rates;
}

export async function getCDTRateByParams(days: number): Promise<CDT> {
  const rates: CDT[] = await getCDTRates();
  const cdt = rates.find((rate) => rate.term === days);
  if (!cdt) throw new Error("Invalid days");
  return cdt;
}

export async function calculateInvest(
  amount: number,
  days: number
): Promise<number> {
  const cdt: CDT = await getCDTRateByParams(days);
  const efectiveRate = cdt.rate / PERCENTAGE_DIV;
  const periodRate = getPeriodRate(efectiveRate, days);
  const invest = customRound(
    amount * periodRate,
    AMOUNT_DECIMAL_PRECISION,
    false
  );
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

export function customRound(value: number, decimals = 0, upRound = true) {
  const n = 10 ** decimals;
  return upRound ? Math.ceil(value * n) / n : Math.round(value * n) / n;
}

export function getPeriodRate(efectiveRate: number, days: number): number {
  return customRound(
    (1 + efectiveRate) ** (days / DAYS_IN_YEAR) - 1,
    INTEREST_DECIMAL_PRECISION
  );
}

module.exports = route;
