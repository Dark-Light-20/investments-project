import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTRQ } from "../models/cdt-rq.model";
import { CDT, CDTTermUnitTypes } from "../models/cdt.model";
import { getRates } from "./getCDTRates";

export async function getCDTRate(
  amount: number,
  term: number,
  termUnit: CDTTermUnitTypes
): Promise<CDT | undefined> {
  const cdts = await getRates();
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

export async function calculateCDTRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const {
      amount,
      term,
      termUnit = CDTTermUnitTypes.DAYS,
    } = (await request.json()) as CDTRQ;
    if (!Object.values(CDTTermUnitTypes).includes(termUnit))
      throw new Error("Invalid term unit");
    const rate = await getCDTRate(amount, term, termUnit);
    return { jsonBody: rate || "No rate found" };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateCDTRate", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateCDTRate,
});
