import { Request, Response, Router } from "express";
import { CDTRS } from "../models/cdt-rs.model";
import { CDTData, CDTRange, CDTRate } from "../models/cdt.model";
import { CDTRatesMapper } from "../utils/cdt.mapper";
import {
  DAYS_IN_YEAR,
  PERCENTAGE_DIV,
  PERIOTICITY,
} from "../utils/number-constants";

const CDT_INFO_URL = process.env.CDT_INFO_URL!;

const route = Router();

route.get("/rates", async (req: Request, res: Response) => {
  try {
    const rates: CDTRange[] = await getCDTRates();
    res.json(rates);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

route.post("/calculateRate", async (req: Request, res: Response) => {
  try {
    const { amount, days } = req.body;
    const rate: CDTRate = await getCDTRateByParams(amount, days);
    res.json(rate);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

route.post("/calculateInvest", async (req: Request, res: Response) => {
  try {
    const { amount, days } = req.body;
    const invest: number = await calculateInvest(amount, days);
    res.json(invest.toFixed(2));
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

export async function getCDTRates(): Promise<CDTRange[]> {
  const data: CDTRS = await (await fetch(CDT_INFO_URL)).json();
  const rates: CDTRange[] = CDTRatesMapper(data);
  return rates;
}

export async function getCDTRateByParams(
  amount: number,
  days: number
): Promise<CDTData> {
  const rates: CDTRange[] = await getCDTRates();
  const amountRates = rates.find(
    (rate) => amount >= rate.minimumAmount && amount <= rate.maximumAmount
  );
  if (!amountRates) throw new Error("Invalid amount");
  const rate = amountRates.rates.find(
    (rate) => days >= rate.minimumDays && days <= rate.maximumDays
  );
  if (!rate) throw new Error("Invalid days");
  const cdt: CDTData = {
    minimumAmount: amountRates.minimumAmount,
    maximumAmount: amountRates.maximumAmount,
    minimumDays: rate.minimumDays,
    maximumDays: rate.maximumDays,
    rate: rate.rate,
  };
  return cdt;
}

export async function calculateInvest(
  amount: number,
  days: number
): Promise<number> {
  const cdt: CDTData = await getCDTRateByParams(amount, days);
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

module.exports = route;
