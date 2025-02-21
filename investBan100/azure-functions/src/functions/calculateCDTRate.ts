import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CdtRateRQ } from "../models/cdt-rq.model";
import { CDT } from "../models/cdt.model";
import { getRates } from "./getCDTRates";

export async function getCDTRateByParams(days: number): Promise<CDT> {
  const rates: CDT[] = (await getRates()).sort(
    (a, b) => a.baseTerm - b.baseTerm
  );
  const cdt = rates.find((rate, index) => {
    const nextRate = rates[index + 1];
    return days >= rate.baseTerm && (!nextRate || days < nextRate.baseTerm);
  });
  if (!cdt) throw new Error("Invalid days");
  return cdt;
}

export async function calculateCDTRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { days } = (await request.json()) as CdtRateRQ;
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
