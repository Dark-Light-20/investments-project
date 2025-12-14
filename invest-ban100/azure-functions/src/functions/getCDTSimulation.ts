import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapters/cdt.service.js";

export async function getCDTSimulation(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const amount = Number(request.query.get("amount"));
    const term = Number(request.query.get("term"));
    const simulation = await cdtUseCase.simulateCDT(amount, term);
    return { jsonBody: simulation };
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
