import { environment } from '@pocket/environments/environment';
import { BankLogoPipe } from './bank-logo-pipe';
import { Bank } from '@pocket/domain/models/pocket.model';

describe('BankLogoPipe', () => {
  let pipe: BankLogoPipe;
  const assetsUrl = environment.assetsUrl;

  beforeEach(() => {
    pipe = new BankLogoPipe();
  });

  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('should return correct logo path for Finandina', () => {
    const result = pipe.transform(Bank.Finandina);
    expect(result).toBe(`${assetsUrl}/logos/LogoFinandina.png`);
  });

  test('should return correct logo path for Nu', () => {
    const result = pipe.transform(Bank.Nu);
    expect(result).toBe(`${assetsUrl}/logos/LogoNu.png`);
  });

  test('should return the input value if bank is not found in map', () => {
    const unknownBank = 'UnknownBank' as Bank;
    const result = pipe.transform(unknownBank);
    expect(result).toBe(unknownBank);
  });
});
