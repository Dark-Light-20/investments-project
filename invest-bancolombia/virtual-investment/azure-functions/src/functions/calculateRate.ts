import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTRate, CdtUseCase } from "invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";
import { CdtRQ } from "./models/cdt-rq.model.js";

export async function calculateRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  const cdtUseCase = new CdtUseCase(new CdtService());
  try {
    const { amount, days } = (await request.json()) as CdtRQ;
    const rate: CDTRate = await cdtUseCase.getCDTRate(amount, days);
    return { jsonBody: rate };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateRate", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateRate,
});
