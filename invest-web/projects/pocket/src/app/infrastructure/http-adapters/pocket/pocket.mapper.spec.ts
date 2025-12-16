import { pocketMapper } from './pocket.mapper';
import { Bank } from '@pocket/domain/models/pocket.model';

describe('pocketMapper', () => {
  test('should map rate value to PocketRate correctly', () => {
    const mockRateValue = 12.5;
    const bankName = Bank.Nu;

    const result = pocketMapper(mockRateValue, bankName);

    expect(result).toEqual({
      id: expect.any(String),
      bankName: Bank.Nu,
      rate: 12.5,
    });
  });
});
