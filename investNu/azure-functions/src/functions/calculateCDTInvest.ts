import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { getCDTRateByParams } from "./calculateCDTRate";
import { CDT } from "../models/cdt.model";
import {
  AMOUNT_DECIMAL_PRECISION,
  DAYS_IN_YEAR,
  INTEREST_DECIMAL_PRECISION,
  PERCENTAGE_DIV,
} from "../utils/number-constants";
import { CDTInvestRQ } from "../models/cdt-rq.model";

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

export async function calculateCDTInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, days } = (await request.json()) as CDTInvestRQ;
    const invest: number = await calculateInvest(amount, days);
    return { jsonBody: invest.toFixed(AMOUNT_DECIMAL_PRECISION) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateCDTInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateCDTInvest,
});
