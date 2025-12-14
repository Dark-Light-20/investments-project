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

  route.get("/simulation", async (req: Request, res: Response) => {
    try {
      const { amount, months, monthlyIncrement } = req.query;
      const simulation = await pocketUseCase.simulateInvest(
        Number(amount),
        Number(months),
        Number(monthlyIncrement) || undefined
      );
      res.json(simulation);
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json(message);
    }
  });

  return route;
};
