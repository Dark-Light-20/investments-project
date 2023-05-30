import { Request, Response, Router } from "express";
import { FICIdentityRS, FICRS } from "../models/fic-rs.model";
import { FIC, FICIdentity } from "../models/fic.model";
import { FICIdentityMapper, FICMapper } from "../utils/fic.mapper";

const { FICS_BASE_URL, GET_FICS_ENDPOINT, GET_FIC_INFO_ENDPOINT } = process.env;
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const fics: FICIdentity[] = await getFICs();
    res.json(fics);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

route.get("/summary", async (req: Request, res: Response) => {
  try {
    const identitiesData: FICIdentity[] = await getFICs();
    const ficsPromises: Promise<FIC>[] = identitiesData.map(async (fic) =>
      getFICByID(fic.nit)
    );
    const fics = await Promise.all(ficsPromises);
    res.json(fics);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

route.get("/:id", async (req: Request, res: Response) => {
  try {
    const fic: FIC = await getFICByID(req.params.id);
    res.json(fic);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

export async function getFICs(): Promise<FICIdentity[]> {
  const data: FICIdentityRS[] = await (
    await fetch(`${FICS_BASE_URL}/${GET_FICS_ENDPOINT}`)
  ).json();
  const fics: FICIdentity[] = data.map((fic) => FICIdentityMapper(fic));
  return fics;
}

export async function getFICByID(id: string): Promise<FIC> {
  const data: FICRS = await (
    await fetch(`${FICS_BASE_URL}/${GET_FIC_INFO_ENDPOINT}/${id}`)
  ).json();
  const fic: FIC = FICMapper(data);
  return fic;
}

module.exports = route;
