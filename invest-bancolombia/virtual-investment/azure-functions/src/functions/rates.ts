import { app, HttpResponseInit } from "@azure/functions";
import { CDTRange } from "../models/cdt.model";
import { CDTRS } from "../models/cdt-rs.model";
import { CDTRatesMapper } from "../utils/cdt.mapper";

const CDT_INFO_URL = process.env.CDT_INFO_URL;

export async function getCDTRates(): Promise<CDTRange[]> {
  const data: CDTRS = await (await fetch(CDT_INFO_URL)).json();
  const rates: CDTRange[] = CDTRatesMapper(data);
  return rates;
}

export async function rates(): Promise<HttpResponseInit> {
  try {
    const rates: CDTRange[] = await getCDTRates();
    return { jsonBody: rates };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("rates", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: rates,
});
