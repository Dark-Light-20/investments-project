import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { BoxInvestRQ } from "./models/cdt-rq.model.js";
import { PocketUseCase } from "@dark-light-20/invest-domain";
import { PocketService } from "../infrastructure/http-adapter/pocket.service.js";

export async function calculateBoxInvest(
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

app.http("calculateBoxInvest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: calculateBoxInvest,
});
