import { Provider } from '@angular/core';
import { Cdt as CdtService } from '@cdt/infrastructure/http-adapters/cdt/cdt';
import { CdtGateway } from '@cdt/domain/models/cdt.gateway';
import { Cdt as CdtUseCase } from '@cdt/application/use-cases/cdt/cdt';

export const CdtProviders: Provider[] = [{ provide: CdtGateway, useClass: CdtService }, CdtUseCase];
