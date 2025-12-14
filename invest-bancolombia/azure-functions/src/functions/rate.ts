import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CDTRate, CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";

export async function rate(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const amount = Number(request.query.get("amount"));
    const term = Number(request.query.get("term"));
    const rate: CDTRate = await cdtUseCase.getCDTRate(amount, term);
    return { jsonBody: rate };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getCDTRate", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: rate,
});
