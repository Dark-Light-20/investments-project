import { Bank, Fic } from '@fic/domain/models/fic.model';
import { FicDTO } from '@fic/infrastructure/models/fic.dto';

export const ficMapper = (dto: FicDTO, bankName: Bank): Fic => ({
  id: crypto.randomUUID(),
  bankName,
  name: dto.name,
  rates: dto.rates,
});
