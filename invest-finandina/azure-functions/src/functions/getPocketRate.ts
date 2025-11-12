import { app, HttpResponseInit } from "@azure/functions";
import { PocketUseCase } from "@dark-light-20/invest-domain";
import { PocketService } from "../infrastructure/http-adapter/pocket.service.js";

export async function getPocketRate(): Promise<HttpResponseInit> {
  try {
    const pocketUseCase = new PocketUseCase(new PocketService());
    const rate = await pocketUseCase.getPocketRate();
    return { jsonBody: rate };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getPocketRate", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getPocketRate,
});
