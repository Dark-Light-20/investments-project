/**
 * Representa una tasa de interés específica ofrecida por un banco.
 */
export interface Tasa {
  id: string;
  tasaEA: number; // Tasa Efectiva Anual (ej: 0.10 para 10%)
  montoMin: number;
  montoMax: number;
  diasMin: number;
  diasMax: number;
}

/**
 * Representa una entidad bancaria y sus tasas disponibles.
 */
export interface Banco {
  id: string;
  nombre: string;
  logoUrl: string; // Usaremos placeholders de placehold.co
  tasas: Tasa[];
}

/**
 * Representa el resultado del cálculo para un banco específico.
 */
export interface ResultadoCalculo {
  banco: Banco;
  tasaAplicada: Tasa | null;
  gananciaEstimada: number | null;
  mensaje: string;
}
