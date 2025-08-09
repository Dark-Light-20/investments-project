import { app, HttpResponseInit } from "@azure/functions";
import { CDTRate, CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";

export async function rates(): Promise<HttpResponseInit> {
  const cdtUseCase = new CdtUseCase(new CdtService());
  try {
    const rates: CDTRate[] = await cdtUseCase.getAllCDTRates();
    return { jsonBody: rates };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("rates", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: rates,
});
