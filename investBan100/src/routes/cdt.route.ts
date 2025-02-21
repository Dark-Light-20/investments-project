import { Request, Response, Router } from "express";
import { CdtRS } from "../models/cdt-rs.model";
import { CDT } from "../models/cdt.model";
import { CDTRatesMapper } from "../utils/cdt.mapper";
import {
  DAYS_IN_YEAR,
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
  const data: CdtRS[] = await (await fetch(CDT_INFO_URL)).json();
  const rates: CDT[] = CDTRatesMapper(data);
  return rates;
}

export async function getCDTRateByParams(days: number): Promise<CDT> {
  const rates: CDT[] = (await getCDTRates()).toSorted(
    (a, b) => a.baseTerm - b.baseTerm
  );
  const cdt = rates.find((rate, index) => {
    const nextRate = rates[index + 1];
    return days >= rate.baseTerm && (!nextRate || days < nextRate.baseTerm);
  });
  if (!cdt) throw new Error("Invalid days");
  return cdt;
}

export async function calculateInvest(
  amount: number,
  days: number
): Promise<number> {
  const cdt: CDT = await getCDTRateByParams(days);
  const efectiveRate = cdt.rate / PERCENTAGE_DIV;
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

module.exports = route;
