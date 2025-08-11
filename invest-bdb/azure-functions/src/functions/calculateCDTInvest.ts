import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTRQ } from "../models/cdt-rq.model";
import {
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  PERCENTAGE_DIV,
  PERIOTICITY,
} from "../utils/number-constants";
import { CDT, CDTTermUnitTypes } from "../models/cdt.model";
import { getCDTRate } from "./calculateCDTRate";

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

export async function calculateCDTInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, term, termUnit } = (await request.json()) as CDTRQ;
    const invest = await calculateInvest(amount, term, termUnit);
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
