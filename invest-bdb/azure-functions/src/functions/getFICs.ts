import { app, HttpResponseInit } from "@azure/functions";
import { FICUseCase } from "@dark-light-20/invest-domain";
import { FicService } from "../infrastructure/http-adapters/fic.service.js";

export async function getFICs(): Promise<HttpResponseInit> {
  try {
    const ficUseCase = new FICUseCase(new FicService());
    const fics = await ficUseCase.getFICs();
    return { jsonBody: fics };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getFICs", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getFICs,
});
