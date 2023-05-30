export interface FICRawModel {
  "0": string;
  "1 Día": string;
  "7 Días": string;
  Mensual: string;
  Trimestral: string;
  Semestral: string;
  "Año Corrido": string;
  "Último Año": string;
  "Últimos 2 Años": string;
  "Últimos 3 Años": string;
  "Valor Unidad": string;
  "Valor del Fondo*": string;
}

export interface FICModel {
  name: string;
  dayProfitability?: string;
  weekProfitability?: string;
  monthProfitability: string;
  trimestralProfitability: string;
  semestralProfitability: string;
  runningYearProfitability: string;
  lastYearProfitability: string;
  lastTwoYearProfitability: string;
  lastThreeYearProfitability: string;
  unitValue: string;
  fundValue: string;
}
