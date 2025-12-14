import { PocketGateway } from "../ports/pocket.gateway";
import { PocketUseCase } from "./pocket.use-case";

const mockPocketRate = 8.25; // 8,25% EA

const mockPocketGateway: jest.Mocked<PocketGateway> = {
  getPocketRate: jest.fn().mockResolvedValue(mockPocketRate),
};

describe("PocketUseCase", () => {
  let pocketUseCase: PocketUseCase;

  beforeEach(() => {
    pocketUseCase = new PocketUseCase(mockPocketGateway);
    jest.clearAllMocks();
  });

  test("should return pocket rate", async () => {
    const rate = await pocketUseCase.getPocketRate();
    expect(rate).toBe(mockPocketRate);
    expect(mockPocketGateway.getPocketRate).toHaveBeenCalledTimes(1);
  });

  test("should throw error if no pocket rate found", async () => {
    mockPocketGateway.getPocketRate.mockResolvedValueOnce(
      null as unknown as number
    );
    await expect(pocketUseCase.getPocketRate()).rejects.toThrow(
      "No pocket rate found"
    );
  });

  test("should simulate pocket investment without monthly increment", async () => {
    const amount = 500000;
    const months = 6;
    const simulation = await pocketUseCase.simulateInvest(amount, months);

    expect(simulation.investedAmount).toBe(amount);
    expect(simulation.term).toBe(months);
    expect(simulation.rate).toBe(mockPocketRate);
    expect(simulation.earnings).toBeGreaterThan(0);
    expect(simulation.finalAmount).toBeGreaterThan(amount);
  });

  test("should simulate pocket investment with monthly increment", async () => {
    const amount = 1000000;
    const months = 12;
    const monthlyIncrement = 20000;
    const simulation = await pocketUseCase.simulateInvest(
      amount,
      months,
      monthlyIncrement
    );

    expect(simulation.investedAmount).toBe(amount + monthlyIncrement * months);
    expect(simulation.term).toBe(months);
    expect(simulation.rate).toBe(mockPocketRate);
    expect(simulation.earnings).toBeGreaterThan(0);
    expect(simulation.finalAmount).toBeGreaterThan(
      amount + monthlyIncrement * months
    );
  });
});
