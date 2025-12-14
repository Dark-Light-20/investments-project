import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTTermUnit, CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapters/cdt.service.js";

export async function getCDTSimulation(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const amount = Number(request.query.get("amount"));
    const term = Number(request.query.get("term"));
    const termUnit =
      (request.query.get("termUnit") as CDTTermUnit) || CDTTermUnit.DAYS;
    if (!Object.values(CDTTermUnit).includes(termUnit))
      throw new Error("Invalid term unit");
    const invest = await cdtUseCase.simulateCDT(amount, term, termUnit);
    return { jsonBody: invest };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getCDTSimulation", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getCDTSimulation,
});
