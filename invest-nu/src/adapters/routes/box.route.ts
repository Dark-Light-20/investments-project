import { Request, Response, Router } from "express";
import { PocketUseCase } from "@dark-light-20/invest-domain";

export const boxRoutesBuilder = (pocketUseCase: PocketUseCase): Router => {
  const route = Router();

  route.get("/rate", async (_: Request, res: Response) => {
    try {
      const rate = await pocketUseCase.getPocketRate();
      res.json(rate);
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json(message);
    }
  });

  route.post("/calculateInvest", async (req: Request, res: Response) => {
    try {
      const { amount, months, monthlyIncrement } = req.body;
      const invest = await pocketUseCase.calculateInvest(
        amount,
        months,
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
