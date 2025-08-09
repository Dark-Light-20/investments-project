import type { FIC } from "../../domain/value-objects/fic-rate.js";

export abstract class FICGateway {
  abstract getFICs(): Promise<FIC[]>;
}
