import { FICIdentityRS, FICRS } from "../models/fic-rs.model";
import { FIC, FICIdentity } from "../models/fic.model";

export const FICMapper = (data: FICRS): FIC => {
  return {
    nit: data.nit,
    name: data.nombre,
    score: data.calificacion,
    term: data.plazo,
    unitValue: data.valorDeUnidad,
    valueInPesos: data.valorEnPesos,
    profitability: {
      days: {
        weekly: data.rentabilidad.dias.semanal,
        monthly: data.rentabilidad.dias.mensual,
        biannual: data.rentabilidad.dias.semestral,
      },
      years: {
        currentYear: data.rentabilidad.anios.anioCorrido,
        lastYear: data.rentabilidad.anios.ultimoAnio,
        lastTwoYears: data.rentabilidad.anios.ultimos2Anios,
        lastThreeYears: data.rentabilidad.anios.ultimos3Anios,
      },
    },
    closeDate: data.fechaCierre
      ? `${data.fechaCierre.substring(0, 4)}/${data.fechaCierre.substring(
          4,
          6
        )}/${data.fechaCierre.substring(6, 8)}`
      : "",
    managmentCompany: data.sociedadAdministradora,
  };
};

export const FICIdentityMapper = (data: FICIdentityRS): FICIdentity => {
  return {
    nit: data.nit,
    name: data.nombre,
  };
};
