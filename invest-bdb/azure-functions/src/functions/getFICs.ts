import { app, HttpResponseInit } from "@azure/functions";
import { JSDOM } from "jsdom";
import { FICModel } from "../models/fic.model";
import { Tabletojson } from "tabletojson";
import { FICMapper } from "../utils/fic.mapper";

const FICS_ENDPOINT = process.env.FICS_ENDPOINT;
const RENT_TABLE_CLASS = process.env.RENT_TABLE_CLASS;

export async function getFICsProfitability(): Promise<FICModel[]> {
  const htmlData = await (await fetch(FICS_ENDPOINT)).text();
  const dom = new JSDOM(htmlData);
  const document = dom.window.document;
  const tableElementsDOM = document.querySelector(`.${RENT_TABLE_CLASS}`);
  const tableJsonData = Tabletojson.convert(tableElementsDOM.innerHTML)
    .flat()
    .filter((item) => Object.keys(item).length > 1);
  const ficsData = tableJsonData.map((item) => FICMapper(item));
  return ficsData;
}

export async function getFICs(): Promise<HttpResponseInit> {
  try {
    const fics = await getFICsProfitability();
    return { jsonBody: fics };
  } catch (error) {
    const { message } = error as Error;
    return { status: 400, body: message };
  }
}

app.http("getFICs", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getFICs,
});
