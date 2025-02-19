import { Request, Response, Router } from "express";
import { JSDOM } from "jsdom";
import { Tabletojson } from "tabletojson";
import { FICModel } from "../models/fic.model";
import { FICMapper } from "../utils/fic.mapper";

const FICS_ENDPOINT = process.env.FICS_ENDPOINT!;
const RENT_TABLE_CLASS = process.env.RENT_TABLE_CLASS!;

const route = Router();

route.get("/", async (_: Request, res: Response) => {
  try {
    const fics = await getFICsProfitability();
    res.json(fics);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json(message);
  }
});

export async function getFICsProfitability(): Promise<FICModel[]> {
  const htmlData = await (await fetch(FICS_ENDPOINT)).text();
  const dom = new JSDOM(htmlData);
  const document = dom.window.document;
  const tableElementsDOM = document.querySelector(`.${RENT_TABLE_CLASS}`)!;
  const tableJsonData = Tabletojson.convert(tableElementsDOM.innerHTML)
    .flat()
    .filter((item) => Object.keys(item).length > 1);
  const ficsData = tableJsonData.map((item) => FICMapper(item));
  return ficsData;
}

module.exports = route;
