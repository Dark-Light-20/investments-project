import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDT } from "../models/cdt.model";
import { getRates } from "./getCDTRates";
import { CDTRateRQ } from "../models/cdt-rq.model";

export async function getCDTRateByParams(days: number): Promise<CDT> {
  const rates: CDT[] = await getRates();
  const cdt = rates.find((rate) => rate.term === days);
  if (!cdt) throw new Error("Invalid days");
  return cdt;
}

export async function calculateCDTRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { days } = (await request.json()) as CDTRateRQ;
    const rate: CDT = await getCDTRateByParams(days);
    return { jsonBody: rate };
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
