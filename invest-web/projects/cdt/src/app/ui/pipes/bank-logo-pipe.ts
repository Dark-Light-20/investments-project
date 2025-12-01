import { Pipe, PipeTransform } from '@angular/core';
import { Bank } from '@cdt/domain/models/cdt.model';
import { environment } from '@cdt/environments/environment';

@Pipe({
  name: 'bankLogo',
})
export class BankLogoPipe implements PipeTransform {
  private readonly _assetsUrl = environment.assetsUrl;

  private readonly _bankLogosMap = new Map<Bank, string>([
    [Bank.Ban100, `${this._assetsUrl}/logos/LogoBan100.png`],
    [Bank.Bancolombia, `${this._assetsUrl}/logos/LogoBancolombia.png`],
    [Bank.BancoDeBogota, `${this._assetsUrl}/logos/LogoBancoDeBogota.png`],
    [Bank.Finandina, `${this._assetsUrl}/logos/LogoFinandina.png`],
    [Bank.Nu, `${this._assetsUrl}/logos/LogoNu.png`],
  ]);

  transform(value: Bank): string {
    return this._bankLogosMap.get(value) ?? value;
  }
}
