import { app, HttpResponseInit } from "@azure/functions";
import { getRates } from "./getCDTRates";
import { CDT } from "../models/cdt.model";

export async function getBoxRate(): Promise<HttpResponseInit> {
  try {
    const rates: CDT[] = await getRates();
    return { jsonBody: rates.find((rate) => rate.term === 0) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getBoxRate", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getBoxRate,
});
