import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTTermUnit, CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapters/cdt.service.js";
import { CdtRQ } from "./models/cdt-rq.model.js";

export async function calculateCDTRate(
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
    const rate = await cdtUseCase.getCDTRate(amount, term, termUnit);
    return { jsonBody: rate || "No rate found" };
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
