import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";
import { CdtRQ } from "./models/cdt-rq.model.js";

export async function calculateInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const { amount, days } = (await request.json()) as CdtRQ;
    const invest: number = await cdtUseCase.calculateInvest(amount, days);
    return { jsonBody: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateInvest,
});
