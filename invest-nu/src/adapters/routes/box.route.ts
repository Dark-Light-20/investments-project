import { Request, Response, Router } from "express";
import { CdtUseCase } from "@dark-light-20/invest-domain";

const PERCENTAGE_DIV = 100;
const MONTHS_IN_YEAR = 12;

export const boxRoutesBuilder = (cdtUseCase: CdtUseCase): Router => {
  const route = Router();

  route.get("/rate", async (_: Request, res: Response) => {
    try {
      const rate = (await cdtUseCase.getAllCDTRates()).find(
        (item) => item.minimumTerm === 0
      );
      res.json(rate?.rate);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.post("/calculateInvest", async (req: Request, res: Response) => {
    try {
      const { amount, months, monthlyIncrement } = req.body;
      const boxRate = (await cdtUseCase.getAllCDTRates()).find(
        (item) => item.minimumTerm === 0
      );
      if (!boxRate) {
        throw new Error("No box rate found");
      }
      const invest = calculateInvest(
        amount,
        months,
        boxRate.rate,
        monthlyIncrement
      );
      res.json(invest.toFixed(2));
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json(message);
    }
  });

  return route;
};

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
