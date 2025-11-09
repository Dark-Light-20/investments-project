import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTTermUnit, CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapters/cdt.service.js";
import { CdtRQ } from "./models/cdt-rq.model.js";

export async function calculateCDTInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const {
      amount,
      term,
      termUnit = CDTTermUnit.DAYS,
    } = (await request.json()) as CdtRQ;
    if (!Object.values(CDTTermUnit).includes(termUnit))
      throw new Error("Invalid term unit");
    const invest = await cdtUseCase.calculateInvest(amount, term, termUnit);
    return { jsonBody: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculateCDTInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateCDTInvest,
});
