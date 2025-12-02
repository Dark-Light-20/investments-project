import { app, HttpResponseInit } from "@azure/functions";
import { FIC, FICUseCase } from "@dark-light-20/invest-domain";
import { FICService } from "../infrastructure/http-adapter/fic.service.js";

export async function ficRates(): Promise<HttpResponseInit> {
  try {
    const ficUseCase = new FICUseCase(new FICService());
    const rates: FIC[] = await ficUseCase.getFICs();
    return { jsonBody: rates };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getFICs", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: ficRates,
});
