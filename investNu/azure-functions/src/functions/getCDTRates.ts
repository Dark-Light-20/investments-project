import { app, HttpResponseInit } from "@azure/functions";
import { CDT } from "../models/cdt.model";
import { CdtRS } from "../models/cdt-rs.model";
import { CDTRatesMapper } from "../utils/cdt.mapper";

const CDT_INFO_URL = process.env.CDT_INFO_URL;

export async function getRates(): Promise<CDT[]> {
  const data: CdtRS = await (await fetch(CDT_INFO_URL)).json();
  const rates: CDT[] = CDTRatesMapper(data);
  return rates;
}

export async function getCDTRates(): Promise<HttpResponseInit> {
  try {
    const rates: CDT[] = await getRates();
    return { jsonBody: rates };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getCDTRates", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getCDTRates,
});
