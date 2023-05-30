export interface FICRS {
  nit: string;
  nombre: string;
  calificacion: string;
  plazo: string;
  valorDeUnidad: string;
  valorEnPesos: string;
  rentabilidad: Profitability;
  fechaCierre?: string;
  sociedadAdministradora: string;
}

export interface FICIdentityRS {
  nit: string;
  nombre: string;
}

export interface Profitability {
  dias: Days;
  anios: Years;
}

export interface Years {
  anioCorrido: string;
  ultimoAnio: string;
  ultimos2Anios: string;
  ultimos3Anios: string;
}

export interface Days {
  semanal: string;
  mensual: string;
  semestral: string;
}
