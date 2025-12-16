import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { PocketSimulation } from '@pocket/domain/models/simulation.model';
import { BankLogoPipe } from '@pocket/ui/pipes/bank-logo-pipe';

@Component({
  selector: 'app-simulations-table',
  imports: [NgOptimizedImage, BankLogoPipe, DecimalPipe, CurrencyPipe],
  templateUrl: './simulations-table.html',
})
export class SimulationsTable {
  readonly simulations = input.required<PocketSimulation[]>();
}
