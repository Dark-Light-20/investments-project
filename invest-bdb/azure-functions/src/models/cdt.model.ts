export interface CDTRawModel {
  channel: string;
  productsAttributes: ProductsAttributes;
  ratesAttributes: RatesAttribute[];
}

export interface ProductsAttributes {
  CondyBenef: string;
  TipoMercado: string;
  TipoModalidad: string;
  Descripcion: string;
  FechaFinal: string;
  TipoPlazo: string;
  TipoTasa: string;
  TipoMoneda: string;
  FechaInicial: Date;
  TipoBase: string;
  Estado: string;
}

export interface RatesAttribute {
  Signo: string;
  TasaSpread: string;
  UnidadPlazo: string;
  MontoMinimo: string;
  PlazoMinimo: string;
  MontoMaximo: string;
  PlazoMaximo: string;
  ProductoCDT: string;
}

export interface CDT {
  sign: string;
  type: string;
  rate: string;
  termUnit: number;
  termUnitType: string;
  minimumAmount: number;
  minimumTerm: number;
  maximumAmount: number;
  maximumTerm: number;
}

export enum CDTTermUnitTypes {
  DAYS = "Dias",
  MONTHS = "Meses",
}
