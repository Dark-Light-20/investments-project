import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { GetRateBody } from "../models/cdt-rq.model";
import { CDT } from "../models/cdt.model";
import { getCDTRateByParams } from "../utils/cdt.functions";

export async function calculateCDTRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, days } = (await request.json()) as GetRateBody;
    const rate: CDT = await getCDTRateByParams(amount, days);
    return { jsonBody: rate };
  } catch (error) {
    const { message } = error as Error;
    return { status: 500, body: message };
  }
}

app.http("calculateCDTRate", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateCDTRate,
});
