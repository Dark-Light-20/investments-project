import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getCDTRates } from "../utils/cdt.functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const cdts = await getCDTRates();
    context.res = { body: cdts };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
