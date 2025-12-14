import {
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  PERCENTAGE_DIV,
  PERIODICITY,
} from "../../domain/constants/investment";
import type { CdtGateway } from "../ports/cdt.gateway";
import { CDTTermUnit, type CDTRate } from "../../domain/value-objects/cdt-rate";
import type { CDTSimulation } from "../../domain/value-objects/cdt-simulation";

export class CdtUseCase {
  private readonly cdtGateway: CdtGateway;

  constructor(gateway: CdtGateway) {
    this.cdtGateway = gateway;
  }

  async getAllCDTRates(): Promise<CDTRate[]> {
    return this.cdtGateway.getAllCDTRates();
  }

  async simulateCDT(
    amount: number,
    term: number,
    termUnit = CDTTermUnit.DAYS
  ): Promise<CDTSimulation> {
    const cdtRate: CDTRate = await this.getCDTRate(amount, term, termUnit);
    const invest = this.calculateEarnings(amount, term, cdtRate, termUnit);
    const operationTerm =
      termUnit === CDTTermUnit.DAYS ? term : term * DAYS_IN_MONTH;

    return {
      investedAmount: amount,
      term: operationTerm,
      rate: cdtRate,
      earnings: invest,
      finalAmount: amount + invest,
    };
  }

  async getCDTRate(
    amount: number,
    term: number,
    termUnit = CDTTermUnit.DAYS
  ): Promise<CDTRate> {
    const rates: CDTRate[] = await this.cdtGateway.getAllCDTRates();
    const rate = rates
      .filter((rate) => rate.termUnit === termUnit)
      .find(
        (rate) =>
          amount >= rate.minimumAmount &&
          amount <= rate.maximumAmount &&
          term >= rate.minimumTerm &&
          term <= rate.maximumTerm
      );

    if (!rate) {
      throw new Error(
        "No applicable CDT found for the specified amount and term."
      );
    }

    return rate;
  }

  private calculateEarnings(
    amount: number,
    term: number,
    cdtRate: CDTRate,
    termUnit = CDTTermUnit.DAYS
  ): number {
    const effectiveRate = cdtRate.rate / PERCENTAGE_DIV;
    const operationTerm =
      termUnit === CDTTermUnit.DAYS ? term : term * DAYS_IN_MONTH;
    const capitalization = DAYS_IN_YEAR / operationTerm;
    const nominalRate = this.getNominalRate(effectiveRate, capitalization);
    const invest = amount * (nominalRate / (DAYS_IN_YEAR / operationTerm));
    return invest;
  }

  private getNominalRate(
    efectiveRate: number,
    capitalization: number,
    periodicity: number = PERIODICITY
  ): number {
    return (
      (((1 + efectiveRate) * periodicity) ** (1 / capitalization) - 1) *
      capitalization
    );
  }
}
