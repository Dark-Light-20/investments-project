import { Component, input } from '@angular/core';

@Component({
  selector: 'app-failed-banks-alert',
  templateUrl: './failed-banks-alert.html',
})
export class FailedBanksAlert {
  readonly failedBanks = input<string[]>([]);
  readonly alertMessage = input('Could not fetch rates from Banks');
}
