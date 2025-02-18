import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTRQ } from "../models/cdt-rq.model";
import {
  DAYS_IN_YEAR,
  PERCENTAGE_DIV,
  PERIOTICITY,
} from "../utils/number-constants";
import { CDTData } from "../models/cdt.model";
import { getCDTRateByParams } from "./calculateRate";

export async function getInvest(amount: number, days: number): Promise<number> {
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

export async function calculateInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, days } = (await request.json()) as CDTRQ;
    const invest: number = await getInvest(amount, days);
    return { jsonBody: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateInvest,
});
