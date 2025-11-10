import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { BoxInvestRQ } from "./models/cdt-rq.model.js";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "../infrastructure/http-adapter/cdt.service.js";

const PERCENTAGE_DIV = 100;
const MONTHS_IN_YEAR = 12;

export function calculateInvest(
  amount: number,
  months: number,
  rate: number,
  monthlyIncrement: number = 0
): number {
  const effectiveRate = rate / PERCENTAGE_DIV;
  const periodRate = (1 + effectiveRate) ** (1 / MONTHS_IN_YEAR) - 1;
  let totalBalance = amount,
    generatedInterest = 0,
    monthlyInterest = 0,
    invest = 0,
    balance = amount,
    interestBalance = 0;
  for (let count = 0; count < months; count++) {
    totalBalance += monthlyIncrement;
    generatedInterest = totalBalance + invest;
    monthlyInterest = generatedInterest * periodRate;
    invest += monthlyInterest;
    balance += monthlyIncrement + interestBalance;
    interestBalance = balance * periodRate;
  }
  return invest;
}

export async function calculateBoxInvest(
  request: HttpRequest
): Promise<HttpResponseInit> {
  try {
    const cdtUseCase = new CdtUseCase(new CdtService());
    const { amount, months, monthlyIncrement } =
      (await request.json()) as BoxInvestRQ;
    const boxRate = (await cdtUseCase.getAllCDTRates()).find(
      (item) => item.minimumTerm === 0
    );
    if (!boxRate) {
      throw new Error("No box rate found");
    }
    const invest: number = calculateInvest(
      amount,
      months,
      boxRate.rate,
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
