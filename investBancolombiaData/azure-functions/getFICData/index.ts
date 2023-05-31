import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getFICByID } from "../utils/fic.functions";
import { FIC } from "../models/fic.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const fic: FIC = await getFICByID(req.params.id);
    context.res = { body: fic };
  } catch (error) {
    const { message } = error as Error;
    context.res = { status: 500, body: message };
  }
  context.res.headers = { "Content-Type": "application/json" };
};

export default httpTrigger;
