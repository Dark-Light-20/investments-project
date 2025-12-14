import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapters/cdt.service.js";

export async function getCDTRate(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const amount = Number(request.query.get("amount"));
    const term = Number(request.query.get("term"));
    const rate = await cdtUseCase.getCDTRate(amount, term);
    return { jsonBody: rate || "No rate found" };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getCDTRate", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getCDTRate,
});
