import { Request, Response, Router } from "express";
import { CDT } from "../models/cdt.model";
import { CdtRS } from "../models/cdt-rs.model";
import { CDTRatesMapper } from "../utils/cdt.mapper";
import { MONTHS_IN_YEAR, PERCENTAGE_DIV } from "../utils/number-constants";

const CDT_INFO_URL = process.env.CDT_INFO_URL!;

const route = Router();

route.get("/rate", async (_: Request, res: Response) => {
  try {
    const rates: CDT[] = await getCDTRates();
    res.json(rates.find((rate) => rate.term === 0));
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json(message);
  }
});

route.post("/calculateInvest", async (req: Request, res: Response) => {
  try {
    const { amount, months, monthlyIncrement } = req.body;
    const invest: number = await calculateInvest(
      amount,
      months,
      monthlyIncrement
    );
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

export async function calculateInvest(
  amount: number,
  months: number,
  monthlyIncrement: number = 0
): Promise<number> {
  const data: CDT | undefined = (await getCDTRates()).find(
    (rate) => rate.term === 0
  );
  if (!data) throw new Error("Box rate not found");
  const effectiveRate = data.rate / PERCENTAGE_DIV;
  const periodRate = (1 + effectiveRate) ** (1 / MONTHS_IN_YEAR) - 1;
  let totalBalance = amount,
    generatedInterest = 0,
    monthlyInterest = 0,
    invest = 0,
    balance = amount,
    interestBalance = 0;
  for (let count = 0; count < months; count++) {
    totalBalance += monthlyIncrement;
    generatedInterest = totalBalance + invest;
    monthlyInterest = generatedInterest * periodRate;
    invest += monthlyInterest;
    balance += monthlyIncrement + interestBalance;
    interestBalance = balance * periodRate;
  }
  return invest;
}

module.exports = route;
