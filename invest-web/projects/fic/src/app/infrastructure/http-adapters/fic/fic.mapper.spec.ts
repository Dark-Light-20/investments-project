import { Bank } from '@fic/domain/models/fic.model';
import { FicDTO } from '@fic/infrastructure/models/fic.dto';
import { ficMapper } from './fic.mapper';

describe('ficMapper', () => {
  test('should map FicDTO to Fic correctly', () => {
    const mockDto: FicDTO = {
      name: 'Fic Example',
      rates: [
        {
          rate: 12.5,
          historicDays: 30,
        },
      ],
    };
    const bankName = Bank.Bancolombia;

    const result = ficMapper(mockDto, bankName);

    expect(result).toEqual({
      id: expect.any(String),
      bankName: Bank.Bancolombia,
      name: 'Fic Example',
      rates: [
        {
          rate: 12.5,
          historicDays: 30,
        },
      ],
    });
  });
});
