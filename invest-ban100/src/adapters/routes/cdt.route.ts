import { Request, Response, Router } from "express";
import { CdtUseCase } from "@dark-light-20/invest-domain";

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
      const { amount, term } = req.query;
      const rate = await cdtUseCase.getCDTRate(Number(amount), Number(term));
      res.json(rate || "No rate found");
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  route.get("/simulation", async (req: Request, res: Response) => {
    try {
      const { amount, term } = req.query;
      const simulation = await cdtUseCase.simulateCDT(
        Number(amount),
        Number(term)
      );
      res.json(simulation);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  return route;
};
