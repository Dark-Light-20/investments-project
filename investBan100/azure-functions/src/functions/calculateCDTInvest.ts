import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CdtInvestRQ } from "../models/cdt-rq.model";
import { CDT } from "../models/cdt.model";
import { getCDTRateByParams } from "./calculateCDTRate";
import {
  DAYS_IN_YEAR,
  PERCENTAGE_DIV,
  PERIOTICITY,
} from "../utils/number-constants";

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

export async function calculateCDTInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, days } = (await request.json()) as CdtInvestRQ;
    const invest: number = await calculateInvest(amount, days);
    return { jsonBody: invest.toFixed(2) };
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
