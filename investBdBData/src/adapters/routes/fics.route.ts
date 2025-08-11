import { FICUseCase } from "@dark-light-20/invest-domain";
import { Request, Response, Router } from "express";

export const ficRoutesBuilder = (ficUseCase: FICUseCase): Router => {
  const route = Router();

  route.get("/", async (_: Request, res: Response) => {
    try {
      const fics = await ficUseCase.getFICs();
      res.json(fics);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json(message);
    }
  });

  return route;
};
