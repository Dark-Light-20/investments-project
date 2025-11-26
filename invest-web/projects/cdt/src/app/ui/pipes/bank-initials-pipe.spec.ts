import { Bank } from '@cdt/domain/models/cdt.model';
import { BankInitialsPipe } from './bank-initials-pipe';

describe('BankInitialsPipe', () => {
  test('create an instance', () => {
    const pipe = new BankInitialsPipe();
    expect(pipe).toBeTruthy();
  });

  test('transform should return correct bank initials', () => {
    const pipe = new BankInitialsPipe();

    expect(pipe.transform(Bank.Ban100)).toBe('B100');
    expect(pipe.transform(Bank.Bancolombia)).toBe('BC');
    expect(pipe.transform(Bank.BancoDeBogota)).toBe('BdB');
    expect(pipe.transform(Bank.Finandina)).toBe('Fnd');
    expect(pipe.transform(Bank.Nu)).toBe('Nu');
    expect(pipe.transform('Unknown Bank' as Bank)).toBe('Unknown Bank');
  });
});
