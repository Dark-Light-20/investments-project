import {
  MONTHS_IN_YEAR,
  PERCENTAGE_DIV,
} from "../../domain/constants/investment";
import type { PocketSimulation } from "../../domain/value-objects/pocket-simulation";
import { PocketGateway } from "../ports/pocket.gateway";

export class PocketUseCase {
  private readonly pocketGateway: PocketGateway;

  constructor(gateway: PocketGateway) {
    this.pocketGateway = gateway;
  }

  async getPocketRate(): Promise<number> {
    const rate = await this.pocketGateway.getPocketRate();
    if (!rate) {
      throw new Error("No pocket rate found");
    }
    return rate;
  }

  async simulateInvest(
    amount: number,
    months: number,
    monthlyIncrement: number = 0
  ): Promise<PocketSimulation> {
    const rate = await this.getPocketRate();
    const effectiveRate = rate / PERCENTAGE_DIV;
    const periodRate = (1 + effectiveRate) ** (1 / MONTHS_IN_YEAR) - 1;
    let totalBalance = amount,
      generatedInterest = 0,
      monthlyInterest = 0,
      invest = 0,
      balance = amount,
      interestBalance = 0;
    for (let count = 0; count < months; count++) {
      totalBalance += monthlyIncrement;
      generatedInterest = totalBalance + invest;
      monthlyInterest = generatedInterest * periodRate;
      invest += monthlyInterest;
      balance += monthlyIncrement + interestBalance;
      interestBalance = balance * periodRate;
    }
    return {
      investedAmount: totalBalance,
      term: months,
      rate: rate,
      earnings: invest,
      finalAmount: totalBalance + invest,
    };
  }
}
