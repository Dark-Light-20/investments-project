import { Provider } from '@angular/core';
import { Fic as FicService } from '@fic/infrastructure/http-adapters/fic/fic';
import { FicGateway } from '@fic/domain/models/fic.gateway';
import { Fic as FicUseCase } from '@fic/application/use-cases/fic/fic';

export const FicProviders: Provider[] = [{ provide: FicGateway, useClass: FicService }, FicUseCase];
