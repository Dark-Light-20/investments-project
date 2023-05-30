import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { calculateInvest } from "../utils/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { amount, term, termUnit } = req.body;
    const invest = await calculateInvest(amount, term, termUnit);
    context.res = { body: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
