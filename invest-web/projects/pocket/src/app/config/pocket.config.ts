import { Provider } from '@angular/core';
import { Pocket as PocketUseCase } from '@pocket/application/use-cases/pocket/pocket';
import { PocketGateway } from '@pocket/domain/models/pocket.gateway';
import { Pocket as PocketService } from '@pocket/infrastructure/http-adapters/pocket/pocket';

export const PocketProviders: Provider[] = [{ provide: PocketGateway, useClass: PocketService }, PocketUseCase];
