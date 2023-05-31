import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getFICsProfitability } from "../utils/fic.functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const fics = await getFICsProfitability();
    context.res = { body: fics };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
