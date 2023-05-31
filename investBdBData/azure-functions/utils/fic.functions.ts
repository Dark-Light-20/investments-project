import { Tabletojson } from "tabletojson";
import { JSDOM } from "jsdom";
import { FICModel } from "../models/fic.model";
import { FICMapper } from "./fic.mapper";

const { FICS_ENDPOINT, RENT_TABLE_CLASS } = process.env;

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
