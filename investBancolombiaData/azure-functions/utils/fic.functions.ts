import { FICIdentityRS, FICRS } from "../models/fic-rs.model";
import { FICIdentity, FIC } from "../models/fic.model";
import { FICIdentityMapper, FICMapper } from "./fic.mapper";

const { FICS_BASE_URL, GET_FICS_ENDPOINT, GET_FIC_INFO_ENDPOINT } = process.env;

export async function getFICs(): Promise<FICIdentity[]> {
  const data: FICIdentityRS[] = await (
    await fetch(`${FICS_BASE_URL}/${GET_FICS_ENDPOINT}`)
  ).json();
  const fics: FICIdentity[] = data.map((fic) => FICIdentityMapper(fic));
  return fics;
}

export async function getFICByID(id: string): Promise<FIC> {
  const data: FICRS = await (
    await fetch(`${FICS_BASE_URL}/${GET_FIC_INFO_ENDPOINT}/${id}`)
  ).json();
  const fic: FIC = FICMapper(data);
  return fic;
}
