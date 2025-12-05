import { Pipe, PipeTransform } from '@angular/core';
import { Bank } from '@fic/domain/models/fic.model';
import { environment } from '@fic/environments/environment';

@Pipe({
  name: 'bankLogo',
})
export class BankLogoPipe implements PipeTransform {
  private readonly _assetsUrl = environment.assetsUrl;

  private readonly _bankLogosMap = new Map<Bank, string>([
    [Bank.Bancolombia, `${this._assetsUrl}/logos/LogoBancolombia.png`],
    [Bank.BancoDeBogota, `${this._assetsUrl}/logos/LogoBancoDeBogota.png`],
  ]);

  transform(value: Bank): string {
    return this._bankLogosMap.get(value) ?? value;
  }
}
