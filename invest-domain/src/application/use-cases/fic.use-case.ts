import type { FIC } from "../../domain/value-objects/fic-rate";
import type { FICGateway } from "../ports/fic.gateway";

export class FICUseCase {
  private readonly ficGateway: FICGateway;

  constructor(gateway: FICGateway) {
    this.ficGateway = gateway;
  }

  async getFICs(): Promise<FIC[]> {
    return this.ficGateway.getFICs();
  }
}
