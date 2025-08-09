import { FIC } from "@dark-light-20/invest-domain";
import { FicData, HISTORIC_DAYS } from "../models/fic.model.js";

export const ficMapper = (ficData: FicData[]): FIC[] =>
  ficData.map((fic) => ({
    name: fic.name,
    rates: HISTORIC_DAYS.map((days, index) => ({
      historicDays: days,
      rate: parseFloat(fic.rates[index]),
    })),
  }));
