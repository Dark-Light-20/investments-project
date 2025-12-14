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

  route.get("/rate", async (req: Request, res: Response) => {
    try {
      const amount = Number(req.query.amount);
      const term = Number(req.query.term);
      const termUnit = (req.query.termUnit as CDTTermUnit) || CDTTermUnit.DAYS;
      if (!Object.values(CDTTermUnit).includes(termUnit))
        throw new Error("Invalid term unit");
      const rate = await cdtUseCase.getCDTRate(amount, term, termUnit);
      res.json(rate || "No rate found");
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.get("/simulation", async (req: Request, res: Response) => {
    try {
      const amount = Number(req.query.amount);
      const term = Number(req.query.term);
      const termUnit = (req.query.termUnit as CDTTermUnit) || CDTTermUnit.DAYS;
      const simulation = await cdtUseCase.simulateCDT(amount, term, termUnit);
      res.json(simulation);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  return route;
};
