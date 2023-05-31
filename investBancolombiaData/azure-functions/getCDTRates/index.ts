import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CDTRange } from "../models/cdt.model";
import { getCDTRates } from "../utils/cdt.functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const rates: CDTRange[] = await getCDTRates();
    context.res = { body: rates };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
