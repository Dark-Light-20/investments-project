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
  /**
   * CDT Term. "Code" { "Unit" }
   * @see RateUnitType for Unit
   * @example 2 { Dias}
   */
  UnidadPlazo: string;
  MontoMinimo: string;
  PlazoMinimo: string;
  MontoMaximo: string;
  PlazoMaximo: string;
  ProductoCDT: string;
}

export enum RateUnitType {
  DAYS = "Dias",
  MONTHS = "Meses",
}
