import { Bank, CdtRate } from '@cdt/domain/models/cdt.model';
import { CdtRateDTO } from '../../models/cdt.dto';

export const cdtMapper = (dto: CdtRateDTO, bankName: Bank): CdtRate => ({
  id: crypto.randomUUID(),
  bankName,
  rate: dto.rate,
  minimumTerm: dto.minimumTerm,
  maximumTerm: dto.maximumTerm,
  minimumAmount: dto.minimumAmount,
  maximumAmount: dto.maximumAmount,
  termUnit: dto.termUnit,
});
