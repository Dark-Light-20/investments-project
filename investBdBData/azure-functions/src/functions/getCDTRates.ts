import { app, HttpResponseInit } from "@azure/functions";
import { CDT, CDTRawModel } from "../models/cdt.model";
import { randUserAgent } from "@ngneat/falso";
import { CDTMapper } from "../utils/cdt.mapper";

const CDT_RATES_ENDPOINT = process.env.CDT_RATES_ENDPOINT;

export async function getRates(): Promise<CDT[]> {
  const cdtInfo: CDTRawModel[] = await (
    await fetch(CDT_RATES_ENDPOINT, {
      headers: { "user-agent": randUserAgent() },
    })
  ).json();
  const cdtTypes = cdtInfo.map((item) => item.ratesAttributes).flat();
  const cdtRates = cdtTypes.map((item) => CDTMapper(item));
  return cdtRates;
}

export async function getCDTRates(): Promise<HttpResponseInit> {
  try {
    const cdts = await getRates();
    return { jsonBody: cdts };
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
