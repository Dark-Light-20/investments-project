import { TestBed } from '@angular/core/testing';
import { RatePropertiesPipe } from './rate-properties-pipe';
import { CurrencyPipe } from '@angular/common';
import { Bank, CdtRate } from '@cdt/domain/models/cdt.model';
import { CDTTermUnit } from '@dark-light-20/invest-domain';
import { MAX_AMOUNT_THRESHOLD, MAX_TERM_THRESHOLD } from '../utils/number.constants';

describe('RatePropertiesPipe', () => {
  let pipe: RatePropertiesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatePropertiesPipe, CurrencyPipe],
    });
    pipe = TestBed.inject(RatePropertiesPipe);
  });

  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('transform should format rate properties correctly', () => {
    const rate: CdtRate = {
      rate: 4.56789,
      minimumTerm: 30,
      maximumTerm: 365,
      minimumAmount: 1000000,
      maximumAmount: 5000000,
      bankName: Bank.Bancolombia,
      termUnit: CDTTermUnit.DAYS,
    };

    const result = pipe.transform(rate);

    expect(result).toEqual({
      rateValue: '4.57%',
      termRange: '30 - 365',
      amountRange: '$1,000,000.00 - $5,000,000.00',
    });
  });

  test('transform should handle maximum term and amount thresholds', () => {
    const rate = {
      rate: 3.2,
      minimumTerm: 60,
      maximumTerm: MAX_TERM_THRESHOLD + 10,
      minimumAmount: 2000000,
      maximumAmount: MAX_AMOUNT_THRESHOLD + 1000000,
      bankName: Bank.Nu,
      termUnit: CDTTermUnit.DAYS,
    };

    const result = pipe.transform(rate);

    expect(result).toEqual({
      rateValue: '3.20%',
      termRange: 'From 60',
      amountRange: 'From $2,000,000.00',
    });
  });
});
