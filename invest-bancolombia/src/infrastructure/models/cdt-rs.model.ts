export interface CDTRS {
  Caracteristicas: Feature[];
  simuladorContent: SimulatorContent;
  infoService: InfoService;
  backgroundSuperiorApp: string;
  backgroundInferiorApp: string;
  backgroundSuperiorAppNegocios: string;
  backgroundInferiorAppNegocios: string;
}

export interface Feature {
  wcmNombre: string;
  wcmImagen: string;
  wcmTitulo: string;
  wcmNombreDescripcion: string;
  wcmIcono: string;
}

export interface InfoService {
  withholdingTaxRate: string;
  settings: Settings;
}

export interface Settings {
  defaultDays: string[];
  daysRangesOld: DaysRangesOld[];
  daysRanges: DaysRanges;
}

export interface DaysRanges {
  allRates: AllRate[];
}

export interface AllRate {
  montoMin: number;
  montoMax: number;
  tasas: DaysRangesOld[];
}

export interface DaysRangesOld {
  minimumDays: string;
  maximumDays: string;
  effectiveInterestRate: string;
}

export interface SimulatorContent {
  TituloSimulador: string;
  TituloSimulacion: string;
  TituloResultado: string;
  SubtituloSimulador: string;
  Subtitulo1: string;
  TextoBotonSimulador: string;
  UrlSvp: string;
  TextoCaracteristicas: string;
  textoBotonSimular: string;
  urlBotonSimular: string;
  urlBotonSimularNegocios: string;
  InformacionLegal: string;
  DiasMinimos: string;
  DiasMaximos: string;
  DiasRecomendados: string;
  InfoChat: string;
  InfoCard: string;
  InfoAviso: string;
  InfoAvisoNegocios: string;
  MontoMinimo: string;
  MontoMaximo: string;
  TooltipGanancia: string;
  TooltipTasaEfectiva: string;
  TooltipRetencionFuente: string;
  TooltipNominal: string;
  TooltipInteresesAntes: string;
  TooltipInteresesRecibidos: string;
  Asistencia: string;
  Multiplo: string;
  TiempoInteres: TiempoIntere[];
}

export interface TiempoIntere {
  valor: string;
}
