import { Request, Response, Router } from "express";
import { CDT, CDTRawModel, CDTTermUnitTypes } from "../models/cdt.model";
import { CDTMapper } from "../utils/cdt.mapper";
import {
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  PERCENTAGE_DIV,
  PERIOTICITY,
} from "../utils/number-constants";
import { randUserAgent } from "@ngneat/falso";

const CDT_RATES_ENDPOINT = process.env.CDT_RATES_ENDPOINT!;

const route = Router();

route.get("/rates", async (req: Request, res: Response) => {
  try {
    const cdts = await getCDTRates();
    res.json(cdts);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

route.post("/calculateRate", async (req: Request, res: Response) => {
  try {
    const { amount, term } = req.body;
    const cdtAmount = parseInt(amount);
    const cdtTerm = parseInt(term);
    if (isNaN(cdtAmount) || isNaN(cdtTerm))
      throw new Error("Invalid amount or term");
    const termUnit =
      (req.body.termUnit as CDTTermUnitTypes) || CDTTermUnitTypes.DAYS;
    if (!Object.values(CDTTermUnitTypes).includes(termUnit))
      throw new Error("Invalid term unit");
    const rate = await getCDTRate(cdtAmount, cdtTerm, termUnit);
    res.json(rate || "No rate found");
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

route.post("/calculateInvest", async (req: Request, res: Response) => {
  try {
    const { amount, term, termUnit } = req.body;
    const invest = await calculateInvest(amount, term, termUnit);
    res.json(invest.toFixed(2));
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

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

module.exports = route;
