import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";
import { CdtRQ } from "./models/cdt-rq.model.js";

export async function calculateCDTRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const { amount, term } = (await request.json()) as CdtRQ;
    const rate = await cdtUseCase.getCDTRate(amount, term);
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
