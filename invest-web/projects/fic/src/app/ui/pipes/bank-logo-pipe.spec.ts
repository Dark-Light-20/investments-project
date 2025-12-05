import { environment } from '@fic/environments/environment';
import { BankLogoPipe } from './bank-logo-pipe';
import { Bank } from '@fic/domain/models/fic.model';

describe('BankLogoPipe', () => {
  let pipe: BankLogoPipe;
  const assetsUrl = environment.assetsUrl;

  beforeEach(() => {
    pipe = new BankLogoPipe();
  });

  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('should return correct logo path for Bancolombia', () => {
    const result = pipe.transform(Bank.Bancolombia);
    expect(result).toBe(`${assetsUrl}/logos/LogoBancolombia.png`);
  });

  test('should return correct logo path for BancoDeBogota', () => {
    const result = pipe.transform(Bank.BancoDeBogota);
    expect(result).toBe(`${assetsUrl}/logos/LogoBancoDeBogota.png`);
  });

  test('should return the input value if bank is not found in map', () => {
    const unknownBank = 'UnknownBank' as Bank;
    const result = pipe.transform(unknownBank);
    expect(result).toBe(unknownBank);
  });
});
