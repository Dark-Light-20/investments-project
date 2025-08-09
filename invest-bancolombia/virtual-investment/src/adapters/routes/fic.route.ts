import { Request, Response, Router } from "express";
import { FIC, FICUseCase } from "@dark-light-20/invest-domain";

export const ficRoutesBuilder = (ficUseCase: FICUseCase): Router => {
  const route = Router();

  route.get("/rates", async (_: Request, res: Response) => {
    try {
      const fics: FIC[] = await ficUseCase.getFICs();
      res.json(fics);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  return route;
};
