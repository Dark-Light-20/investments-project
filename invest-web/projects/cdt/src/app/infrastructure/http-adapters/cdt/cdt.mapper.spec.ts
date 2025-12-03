import { cdtMapper } from './cdt.mapper';
import { Bank } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';
import { CDTTermUnit } from '@dark-light-20/invest-domain';

describe('cdtMapper', () => {
  test('should map CdtRateDTO to CdtRate correctly', () => {
    const mockDto: CdtRateDTO = {
      rate: 12.5,
      minimumTerm: 90,
      maximumTerm: 180,
      minimumAmount: 100000,
      maximumAmount: 5000000,
      termUnit: CDTTermUnit.DAYS,
    };
    const bankName = Bank.Bancolombia;

    const result = cdtMapper(mockDto, bankName);

    expect(result).toEqual({
      id: expect.any(String),
      bankName: Bank.Bancolombia,
      rate: 12.5,
      minimumTerm: 90,
      maximumTerm: 180,
      minimumAmount: 100000,
      maximumAmount: 5000000,
      termUnit: CDTTermUnit.DAYS,
    });
  });
});
