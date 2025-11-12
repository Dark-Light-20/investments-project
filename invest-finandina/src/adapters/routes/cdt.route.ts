import { Request, Response, Router } from "express";
import { CDTRate, CdtUseCase } from "@dark-light-20/invest-domain";

export const cdtRoutesBuilder = (cdtUseCase: CdtUseCase): Router => {
  const route = Router();

  route.get("/rates", async (_: Request, res: Response) => {
    try {
      const rates: CDTRate[] = await cdtUseCase.getAllCDTRates();
      res.json(rates);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.post("/calculateRate", async (req: Request, res: Response) => {
    try {
      const { amount, term } = req.body;
      const rate: CDTRate = await cdtUseCase.getCDTRate(amount, term);
      res.json(rate || "No rate found");
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.post("/calculateInvest", async (req: Request, res: Response) => {
    try {
      const { amount, term } = req.body;
      const invest: number = await cdtUseCase.calculateInvest(amount, term);
      res.json(invest.toFixed(2));
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  return route;
};
