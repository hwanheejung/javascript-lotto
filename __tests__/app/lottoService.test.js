import lottoService from "../../src/app/lottoService.js";
import { PRIZE } from "../../src/constants/prize.js";
import LottoBundle from "../../src/domain/LottoBundle.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

jest.mock("../../src/domain/LottoBundle.js");
jest.mock("../../src/domain/WinningLotto.js");

describe("app/lottoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [1000, 1], // 1장
    [5000, 5], // 5장
    [10000, 10], // 10장
  ])("generateLottoBundle(%i) → %i개의 Lotto 생성", (price, expectedCount) => {
    LottoBundle.mockImplementation((count) => ({
      size: () => count,
    }));

    const lottoBundle = lottoService.generateLottoBundle(price);
    expect(lottoBundle.size()).toBe(expectedCount);
  });

  test("evaluateResults()가 당첨 결과와 총 당첨금을 반환해야 한다.", () => {
    // given
    const mockLottos = [
      { getNumbers: () => [1, 2, 3, 4, 5, 6] },
      { getNumbers: () => [7, 8, 9, 10, 11, 12] },
    ];

    LottoBundle.mockImplementation(() => ({
      getLottos: () => mockLottos,
    }));

    // 1을 포함하면 1등, 아니면 5등 당첨되도록 설정
    WinningLotto.mockImplementation(() => ({
      evaluate: (lotto) =>
        lotto.getNumbers().includes(1) ? PRIZE.FIRST : PRIZE.FIFTH,
    }));

    const lottoBundle = new LottoBundle(2);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    const { formattedResults, totalReward } = lottoService.evaluateResults(
      lottoBundle,
      winningNumbers,
      bonusNumber,
    );

    // then
    expect(formattedResults).toEqual([
      { rank: "FIRST", winningCriteria: 6, reward: 2000000000, count: 1 },
      { rank: "SECOND", winningCriteria: 5, reward: 30000000, count: 0 },
      { rank: "THIRD", winningCriteria: 5, reward: 1500000, count: 0 },
      { rank: "FOURTH", winningCriteria: 4, reward: 50000, count: 0 },
      { rank: "FIFTH", winningCriteria: 3, reward: 5000, count: 1 },
    ]);

    // 1등 1개, 5등 1개
    expect(totalReward).toBe(2000005000);
  });

  test("countResults()가 각 등수별 개수를 정확히 계산해야 한다.", () => {
    const results = [PRIZE.FIRST, PRIZE.THIRD, PRIZE.FIFTH, PRIZE.FIFTH];

    const resultCount = lottoService.countResults(results);

    expect(resultCount).toEqual([0, 1, 0, 1, 0, 2]);
  });

  test("formatResults()가 올바른 형태로 결과를 반환해야 한다.", () => {
    const resultCount = [0, 1, 0, 1, 0, 2];

    const formattedResults = lottoService.formatResults(resultCount);

    expect(formattedResults).toEqual([
      { rank: "FIRST", winningCriteria: 6, reward: 2000000000, count: 1 },
      { rank: "SECOND", winningCriteria: 5, reward: 30000000, count: 0 },
      { rank: "THIRD", winningCriteria: 5, reward: 1500000, count: 1 },
      { rank: "FOURTH", winningCriteria: 4, reward: 50000, count: 0 },
      { rank: "FIFTH", winningCriteria: 3, reward: 5000, count: 2 },
    ]);
  });

  test("calculateTotalReward()가 정확한 당첨금을 계산해야 한다.", () => {
    const formattedResults = [
      { rank: "FIRST", winningCriteria: 6, reward: 2000000000, count: 1 },
      { rank: "SECOND", winningCriteria: 5, reward: 30000000, count: 0 },
      { rank: "THIRD", winningCriteria: 5, reward: 1500000, count: 0 },
      { rank: "FOURTH", winningCriteria: 4, reward: 50000, count: 0 },
      { rank: "FIFTH", winningCriteria: 3, reward: 5000, count: 2 },
    ];

    const totalReward = lottoService.calculateTotalReward(formattedResults);

    expect(totalReward).toBe(2000010000);
  });
});
