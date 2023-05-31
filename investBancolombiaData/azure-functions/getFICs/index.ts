import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { FICIdentity } from "../models/fic.model";
import { getFICs } from "../utils/fic.functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const fics: FICIdentity[] = await getFICs();
    context.res = { body: fics };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
