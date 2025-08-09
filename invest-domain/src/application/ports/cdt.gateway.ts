import type { CDTRate } from "../../domain/value-objects/cdt-rate.js";

export abstract class CdtGateway {
  abstract getAllCDTRates(): Promise<CDTRate[]>;
}
