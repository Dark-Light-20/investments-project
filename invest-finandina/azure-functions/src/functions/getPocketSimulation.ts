import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { PocketService } from "../infrastructure/http-adapter/pocket.service.js";
import { PocketUseCase } from "@dark-light-20/invest-domain";

export async function getPocketSimulation(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const pocketUseCase = new PocketUseCase(new PocketService());
    const amount = Number(request.query.get("amount"));
    const months = Number(request.query.get("months"));
    const monthlyIncrement = Number(request.query.get("monthlyIncrement"));
    const simulation = await pocketUseCase.simulateInvest(
      amount,
      months,
      monthlyIncrement || undefined
    );
    return { jsonBody: simulation };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getPocketSimulation", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getPocketSimulation,
});
