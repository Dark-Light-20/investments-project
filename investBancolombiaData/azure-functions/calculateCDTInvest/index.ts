import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { calculateInvest } from "../utils/cdt.functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { amount, days } = req.body;
    const invest: number = await calculateInvest(amount, days);
    context.res = { body: invest.toFixed(2) };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
