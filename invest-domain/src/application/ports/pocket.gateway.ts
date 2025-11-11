export abstract class PocketGateway {
  abstract getPocketRate(): Promise<number>;
}
