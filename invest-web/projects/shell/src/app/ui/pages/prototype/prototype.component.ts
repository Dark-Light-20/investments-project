import { ChangeDetectionStrategy, Component, computed, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Banco, ResultadoCalculo } from './invest.model';
import { DEFAULT_BANCOS } from './data.mock';

@Component({
  selector: 'app-prototype',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe], // Importar pipes necesarios
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrototypeComponent {
  // --- SEÑALES (STATE MANAGEMENT) ---

  /** Monto de inversión ingresado por el usuario */
  monto: WritableSignal<number | null> = signal(null);

  /** Plazo en días ingresado por el usuario */
  dias: WritableSignal<number | null> = signal(null);

  /** Listado de bancos y sus tasas (datos maestros) */
  bancos: WritableSignal<Banco[]> = signal(DEFAULT_BANCOS);

  /** Año actual para el footer */
  currentYear = new Date().getFullYear();

  /**
   * (Funcionalidad 2 y 3)
   * Señal computada que calcula los resultados de la simulación
   * cada vez que el monto, los días o los bancos cambian.
   */
  resultados = computed<ResultadoCalculo[]>(() => {
    const m = this.monto();
    const d = this.dias();
    const b = this.bancos();

    // No calcular si faltan datos
    if (m === null || d === null || m <= 0 || d <= 0) {
      return [];
    }

    // Procesar cada banco
    return b.map(banco => {
      // Encontrar la tasa que aplica (Funcionalidad 2)
      const tasaAplicada = banco.tasas.find(
        tasa => m >= tasa.montoMin && m <= tasa.montoMax && d >= tasa.diasMin && d <= tasa.diasMax
      );

      if (tasaAplicada) {
        // Calcular ganancia (Funcionalidad 3)
        // Fórmula de interés compuesto para un período específico:
        // Ganancia = Monto * ((1 + TasaEA)^(Dias / 365) - 1)
        const ganancia = m * (Math.pow(1 + tasaAplicada.tasaEA, d / 365) - 1);

        return {
          banco: banco,
          tasaAplicada: tasaAplicada,
          gananciaEstimada: ganancia,
          mensaje: `Aplica tasa de ${tasaAplicada.tasaEA * 100}%`,
        };
      } else {
        // No se encontró tasa
        return {
          banco: banco,
          tasaAplicada: null,
          gananciaEstimada: null,
          mensaje: 'Monto o plazo no aplica para las tasas de este banco.',
        };
      }
    });
  });

  // --- MANEJADORES DE EVENTOS ---

  /** Actualiza la señal 'monto' cuando el usuario escribe */
  onMontoChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.monto.set(Number.isNaN(value) ? null : value);
  }

  /** Actualiza la señal 'dias' cuando el usuario escribe */
  onDiasChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.dias.set(Number.isNaN(value) ? null : value);
  }
}
