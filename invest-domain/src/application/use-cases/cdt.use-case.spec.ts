import { DAYS_IN_MONTH } from "../../domain/constants/investment";
import { CdtUseCase } from "./cdt.use-case";
import { CDTTermUnit, type CDTRate } from "../../domain/value-objects/cdt-rate";
import { CdtGateway } from "../ports/cdt.gateway";

const mockCDTRates: CDTRate[] = [
  {
    minimumAmount: 100000,
    maximumAmount: 10000000,
    minimumTerm: 30,
    maximumTerm: 360,
    termUnit: CDTTermUnit.DAYS,
    rate: 10,
  },
  {
    minimumAmount: 100000,
    maximumAmount: 10000000,
    minimumTerm: 1,
    maximumTerm: 12,
    termUnit: CDTTermUnit.MONTHS,
    rate: 12,
  },
];

const mockCdtGateway: jest.Mocked<CdtGateway> = {
  getAllCDTRates: jest.fn().mockResolvedValue(mockCDTRates),
};

describe("CdtUseCase", () => {
  let cdtUseCase: CdtUseCase;

  beforeEach(() => {
    cdtUseCase = new CdtUseCase(mockCdtGateway);
    jest.clearAllMocks();
  });

  test("should return all CDT rates", async () => {
    const rates = await cdtUseCase.getAllCDTRates();
    expect(rates).toEqual(mockCDTRates);
    expect(mockCdtGateway.getAllCDTRates).toHaveBeenCalledTimes(1);
  });

  test("should get applicable CDT rate for days", async () => {
    const rate = await cdtUseCase.getCDTRate(500000, 90, CDTTermUnit.DAYS);
    expect(rate).toEqual(mockCDTRates[0]);
  });

  test("should get applicable CDT rate for months", async () => {
    const rate = await cdtUseCase.getCDTRate(500000, 6, CDTTermUnit.MONTHS);
    expect(rate).toEqual(mockCDTRates[1]);
  });

  test("should throw error if no applicable CDT rate found", async () => {
    await expect(
      cdtUseCase.getCDTRate(50000, 90, CDTTermUnit.DAYS)
    ).rejects.toThrow(
      "No applicable CDT found for the specified amount and term."
    );
  });

  test("should simulate CDT investment in days", async () => {
    const amount = 1000000;
    const term = 360;
    const simulation = await cdtUseCase.simulateCDT(
      amount,
      term,
      CDTTermUnit.DAYS
    );

    expect(simulation.investedAmount).toBe(amount);
    expect(simulation.term).toBe(term);
    expect(simulation.rate).toEqual(mockCDTRates[0]);
    expect(simulation.earnings).toBeGreaterThan(0);
    expect(simulation.finalAmount).toBeGreaterThan(amount);
  });

  test("should simulate CDT investment in months", async () => {
    const amount = 1000000;
    const term = 12;
    const simulation = await cdtUseCase.simulateCDT(
      amount,
      term,
      CDTTermUnit.MONTHS
    );

    expect(simulation.investedAmount).toBe(amount);
    expect(simulation.term).toBe(term * DAYS_IN_MONTH);
    expect(simulation.rate).toEqual(mockCDTRates[1]);
    expect(simulation.earnings).toBeGreaterThan(0);
    expect(simulation.finalAmount).toBeGreaterThan(amount);
  });
});
