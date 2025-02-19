import { FICModel, FICRawModel } from "../models/fic.model";

export const FICMapper = (rawFIC: FICRawModel): FICModel => {
  return {
    name: rawFIC["0"],
    dayProfitability: rawFIC["1 Día"],
    weekProfitability: rawFIC["7 Días"],
    monthProfitability: rawFIC["Mensual"],
    trimestralProfitability: rawFIC["Trimestral"],
    semestralProfitability: rawFIC["Semestral"],
    runningYearProfitability: rawFIC["Año Corrido"],
    lastYearProfitability: rawFIC["Último Año"],
    lastTwoYearProfitability: rawFIC["Últimos 2 Años"],
    lastThreeYearProfitability: rawFIC["Últimos 3 Años"],
    unitValue: rawFIC["Valor Unidad"],
    fundValue: rawFIC["Valor del Fondo*"],
  };
};
