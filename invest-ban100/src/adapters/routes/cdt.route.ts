import { Request, Response, Router } from "express";
import { CDTTermUnit, CdtUseCase } from "@dark-light-20/invest-domain";

export const cdtRoutesBuilder = (cdtUseCase: CdtUseCase): Router => {
  const route = Router();

  route.get("/rates", async (_: Request, res: Response) => {
    try {
      const cdts = await cdtUseCase.getAllCDTRates();
      res.json(cdts);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.post("/calculateRate", async (req: Request, res: Response) => {
    try {
      const { amount, term } = req.body;
      const termUnit = (req.body.termUnit as CDTTermUnit) || CDTTermUnit.DAYS;
      if (!Object.values(CDTTermUnit).includes(termUnit))
        throw new Error("Invalid term unit");
      const rate = await cdtUseCase.getCDTRate(amount, term, termUnit);
      res.json(rate || "No rate found");
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.post("/calculateInvest", async (req: Request, res: Response) => {
    try {
      const { amount, term, termUnit } = req.body;
      const invest = await cdtUseCase.calculateInvest(amount, term, termUnit);
      res.json(invest.toFixed(2));
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  return route;
};
