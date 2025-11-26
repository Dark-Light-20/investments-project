import { Pipe, PipeTransform } from '@angular/core';
import { Bank } from '@cdt/domain/models/cdt.model';

@Pipe({
  name: 'bankInitials',
})
export class BankInitialsPipe implements PipeTransform {
  private readonly _bankInitialsMap = new Map<Bank, string>([
    [Bank.Ban100, 'B100'],
    [Bank.Bancolombia, 'BC'],
    [Bank.BancoDeBogota, 'BdB'],
    [Bank.Finandina, 'Fnd'],
    [Bank.Nu, 'Nu'],
  ]);

  transform(value: Bank): string {
    return this._bankInitialsMap.get(value) ?? value;
  }
}
