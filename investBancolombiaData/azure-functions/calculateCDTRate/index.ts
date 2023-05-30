import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CDTRate } from "../models/cdt.model";
import { getCDTRateByParams } from "../utils/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { amount, days } = req.body;
    const rate: CDTRate = await getCDTRateByParams(amount, days);
    context.res = { body: rate };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
