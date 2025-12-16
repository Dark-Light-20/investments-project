import { Bank, PocketRate } from '@pocket/domain/models/pocket.model';

export const pocketMapper = (rate: number, bankName: Bank): PocketRate => ({
  id: crypto.randomUUID(),
  bankName,
  rate,
});
