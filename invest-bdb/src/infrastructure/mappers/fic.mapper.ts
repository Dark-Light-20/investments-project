import { FIC } from "@dark-light-20/invest-domain";
import { FICRawModel } from "../models/fic.model.js";

export const ficMapper = (rawFIC: FICRawModel): FIC => {
  return {
    name: rawFIC["0"],
    rates: [
      {
        historicDays: 1,
        rate: parseFloat(rawFIC["1 Día"]),
      },
      {
        historicDays: 7,
        rate: parseFloat(rawFIC["7 Días"]),
      },
      {
        historicDays: 30,
        rate: parseFloat(rawFIC["Mensual"]),
      },
      {
        historicDays: 90,
        rate: parseFloat(rawFIC["Trimestral"]),
      },
      {
        historicDays: 180,
        rate: parseFloat(rawFIC["Semestral"]),
      },
      {
        historicDays: 360,
        rate: parseFloat(rawFIC["Último Año"]),
      },
      {
        historicDays: 720,
        rate: parseFloat(rawFIC["Últimos 2 Años"]),
      },
      {
        historicDays: 1080,
        rate: parseFloat(rawFIC["Últimos 3 Años"]),
      },
    ],
  };
};
