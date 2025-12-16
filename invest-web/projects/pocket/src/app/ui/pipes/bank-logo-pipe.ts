import { Pipe, PipeTransform } from '@angular/core';
import { Bank } from '@pocket/domain/models/pocket.model';
import { environment } from '@pocket/environments/environment';

@Pipe({
  name: 'bankLogo',
})
export class BankLogoPipe implements PipeTransform {
  private readonly _assetsUrl = environment.assetsUrl;

  private readonly _bankLogosMap = new Map<Bank, string>([
    [Bank.Finandina, `${this._assetsUrl}/logos/LogoFinandina.png`],
    [Bank.Nu, `${this._assetsUrl}/logos/LogoNu.png`],
  ]);

  transform(value: Bank): string {
    return this._bankLogosMap.get(value) ?? value;
  }
}
