import { app, HttpResponseInit } from "@azure/functions";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapters/cdt.service.js";

export async function getCDTRates(): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const cdts = await cdtUseCase.getAllCDTRates();
    return { jsonBody: cdts };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getCDTRates", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getCDTRates,
});
