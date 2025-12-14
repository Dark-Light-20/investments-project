import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { PocketUseCase } from "@dark-light-20/invest-domain";
import { PocketService } from "../infrastructure/http-adapter/pocket.service.js";

export async function getBoxSimulation(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const pocketUseCase = new PocketUseCase(new PocketService());
    const amount = Number(request.query.get("amount"));
    const months = Number(request.query.get("months"));
    const monthlyIncrement =
      Number(request.query.get("monthlyIncrement")) || undefined;
    const simulation = await pocketUseCase.simulateInvest(
      amount,
      months,
      monthlyIncrement
    );
    return { jsonBody: simulation };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getBoxSimulation", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getBoxSimulation,
});
