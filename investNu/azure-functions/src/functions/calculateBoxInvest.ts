import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { BoxInvestRQ } from "../models/cdt-rq.model";
import { getRates } from "./getCDTRates";
import { CDT } from "../models/cdt.model";
import {
  AMOUNT_DECIMAL_PRECISION,
  MONTHS_IN_YEAR,
  PERCENTAGE_DIV,
} from "../utils/number-constants";

export async function calculateInvest(
  amount: number,
  months: number,
  monthlyIncrement: number = 0
): Promise<number> {
  const data: CDT | undefined = (await getRates()).find(
    (rate) => rate.term === 0
  );
  if (!data) throw new Error("Box rate not found");
  const effectiveRate = data.rate / PERCENTAGE_DIV;
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
    const { amount, months, monthlyIncrement } =
      (await request.json()) as BoxInvestRQ;
    const invest: number = await calculateInvest(
      amount,
      months,
      monthlyIncrement
    );
    return { jsonBody: invest.toFixed(AMOUNT_DECIMAL_PRECISION) };
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
