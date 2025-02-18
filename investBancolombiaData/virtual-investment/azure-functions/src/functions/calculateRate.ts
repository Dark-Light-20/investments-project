import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTData, CDTRange, CDTRate } from "../models/cdt.model";
import { CDTRQ } from "../models/cdt-rq.model";
import { getCDTRates } from "./rates";

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

export async function calculateRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, days } = (await request.json()) as CDTRQ;
    const rate: CDTRate = await getCDTRateByParams(amount, days);
    return { jsonBody: rate };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateRate", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateRate,
});
