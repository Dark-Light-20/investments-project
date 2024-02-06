import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { GetRateBody } from "../models/cdt-rq.model";
import { calculateInvest } from "../utils/cdt.functions";

export async function calculateCDTInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const { amount, days } = (await request.json()) as GetRateBody;
    const invest: number = await calculateInvest(amount, days);
    return { jsonBody: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 500, body: message };
  }
}

app.http("calculateCDTInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateCDTInvest,
});
