import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { PocketUseCase } from "@dark-light-20/invest-domain/dist/application/use-cases/pocket.use-case.js";
import { BoxInvestRQ } from "./models/cdt-rq.model.js";
import { PocketService } from "../infrastructure/http-adapter/pocket.service.js";

export async function calculatePocketInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const pocketUseCase = new PocketUseCase(new PocketService());
    const { amount, months, monthlyIncrement } =
      (await request.json()) as BoxInvestRQ;
    const invest = await pocketUseCase.calculateInvest(
      amount,
      months,
      monthlyIncrement
    );
    return { jsonBody: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("calculatePocketInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculatePocketInvest,
});
