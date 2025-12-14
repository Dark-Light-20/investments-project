import { FIC } from "../../domain/value-objects/fic-rate";
import { FICGateway } from "../ports/fic.gateway";
import { FICUseCase } from "./fic.use-case";

const mockFICs: FIC[] = [
  {
    name: "FIC Conservative",
    rates: [{ rate: 7.45, historicDays: 30 }],
  },
];

const mockFICGateway: jest.Mocked<FICGateway> = {
  getFICs: jest.fn().mockResolvedValue(mockFICs),
};

describe("FicUseCase", () => {
  let ficUseCase: FICUseCase;

  beforeEach(() => {
    ficUseCase = new FICUseCase(mockFICGateway);
  });

  test("should return mock FICs", async () => {
    const fics = await ficUseCase.getFICs();
    expect(fics).toEqual(mockFICs);
  });
});
