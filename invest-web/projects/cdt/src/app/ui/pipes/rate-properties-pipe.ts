import { inject, Pipe, PipeTransform } from '@angular/core';
import { CdtRate } from '@cdt/domain/models/cdt.model';
import { CurrencyPipe } from '@angular/common';
import { DECIMAL_PLACES, MAX_AMOUNT_THRESHOLD, MAX_TERM_THRESHOLD } from '../utils/number.constants';
import { FROM_LABEL } from '@cdt/ui/utils/text.constants';

@Pipe({
  name: 'rateProperties',
})
export class RatePropertiesPipe implements PipeTransform {
  private readonly _currencyPipe = inject(CurrencyPipe);

  transform(value: CdtRate): { amountRange: string; termRange: string; rateValue: string } {
    const rateValue = `${value.rate.toFixed(DECIMAL_PLACES)}%`;
    const termRange =
      value.maximumTerm > MAX_TERM_THRESHOLD
        ? `${FROM_LABEL} ${value.minimumTerm}`
        : `${value.minimumTerm} - ${value.maximumTerm}`;
    const amountRange =
      value.maximumAmount > MAX_AMOUNT_THRESHOLD
        ? `${FROM_LABEL} ${this._currencyPipe.transform(value.minimumAmount, 'COP', 'symbol-narrow')}`
        : `${this._currencyPipe.transform(value.minimumAmount, 'COP', 'symbol-narrow')} - ${this._currencyPipe.transform(value.maximumAmount, 'COP', 'symbol-narrow')}`;
    return { amountRange, termRange, rateValue };
  }
}
