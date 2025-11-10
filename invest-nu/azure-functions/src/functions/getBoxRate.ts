import { app, HttpResponseInit } from "@azure/functions";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";

export async function getBoxRate(): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const rate = (await cdtUseCase.getAllCDTRates()).find(
      (item) => item.minimumTerm === 0
    );
    return { jsonBody: rate?.rate };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getBoxRate", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getBoxRate,
});
