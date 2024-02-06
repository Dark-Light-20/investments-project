export interface CdtRS {
  status: boolean;
  data: Data;
}

export interface Data {
  cdt_plazos: CdtRange[];
  cdt_retefuente: string;
}

export interface CdtRange {
  plazo_min: string;
  plazo_max: string;
  monto_min: string;
  monto_max: string;
  interes_ea: string;
}
