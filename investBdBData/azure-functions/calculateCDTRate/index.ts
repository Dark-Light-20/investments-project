import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CDTTermUnitTypes } from "../models/cdt.model";
import { getCDTRate } from "../utils/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { amount, term } = req.body;
    const cdtAmount = parseInt(amount);
    const cdtTerm = parseInt(term);
    if (isNaN(cdtAmount) || isNaN(cdtTerm))
      throw new Error("Invalid amount or term");
    const termUnit =
      (req.body.termUnit as CDTTermUnitTypes) || CDTTermUnitTypes.DAYS;
    if (!Object.values(CDTTermUnitTypes).includes(termUnit))
      throw new Error("Invalid term unit");
    const rate = await getCDTRate(cdtAmount, cdtTerm, termUnit);
    context.res = { body: rate || "No rate found" };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
