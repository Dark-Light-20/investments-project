import { FIC } from "@dark-light-20/invest-domain";
import { FICRawModel } from "../models/fic.model.js";

const parseRate = (value: string | undefined): number => {
  if (!value) return 0;
  return parseFloat(value.replace(",", "."));
};

export const ficMapper = (rawFIC: FICRawModel): FIC => {
  return {
    name: rawFIC["name"],
    rates: [
      {
        historicDays: 1,
        rate: parseRate(rawFIC["Diaria"]),
      },
      {
        historicDays: 30,
        rate: parseRate(rawFIC["30 días"]),
      },
      {
        historicDays: 180,
        rate: parseRate(rawFIC["180 días"]),
      },
      {
        historicDays: 360,
        rate: parseRate(rawFIC["1° año"]),
      },
      {
        historicDays: 720,
        rate: parseRate(rawFIC["2° año"]),
      },
      {
        historicDays: 1080,
        rate: parseRate(rawFIC["3° año"]),
      },
    ],
  };
};
