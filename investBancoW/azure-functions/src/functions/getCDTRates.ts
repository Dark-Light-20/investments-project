import { app, HttpResponseInit } from "@azure/functions";
import { CDT } from "../models/cdt.model";
import { getCDTRates as getRates } from "../utils/cdt.functions";

export async function getCDTRates(): Promise<HttpResponseInit> {
  try {
    const rates: CDT[] = await getRates();
    return { jsonBody: rates };
  } catch (error) {
    const { message } = error as Error;
    return { status: 500, body: message };
  }
}

app.http("getCDTRates", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getCDTRates,
});
