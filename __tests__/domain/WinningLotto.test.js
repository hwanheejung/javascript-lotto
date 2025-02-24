import { ERROR_MESSAGE } from "../../src/constants/error.js";
import Lotto from "../../src/domain/Lotto.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("domain/WinningLotto", () => {
  test("WinningLotto가 유효한 당첨 번호와 보너스 번호로 생성된다.", () => {
    expect(() => new WinningLotto([1, 2, 3, 4, 5, 6], 7)).not.toThrow();
  });

  test("보너스 번호가 당첨 번호와 중복되면 예외 발생", () => {
    expect(() => new WinningLotto([1, 2, 3, 4, 5, 6], 6)).toThrow(
      ERROR_MESSAGE.INVALID_BONUS_NUMBER,
    );
  });

  test.each([
    [
      [1, 2, 3, 4, 5, 6],
      7,
      [1, 2, 3, 4, 5, 6],
      {
        RANK: 1,
        WINNING_CRITERIA: 6,
        REWARD: 2_000_000_000,
      },
    ], // 6개: 1등
    [
      [1, 2, 3, 4, 5, 6],
      7,
      [1, 2, 3, 4, 5, 7],
      {
        RANK: 2,
        WINNING_CRITERIA: 5,
        BONUS_MATCHED: true,
        REWARD: 30_000_000,
      },
    ], // 5개 + 보너스: 2등
    [
      [1, 2, 3, 4, 5, 6],
      7,
      [1, 2, 3, 4, 5, 8],
      {
        RANK: 3,
        WINNING_CRITERIA: 5,
        REWARD: 1_500_000,
      },
    ], // 5개: 3등
    [
      [10, 20, 30, 40, 41, 42],
      25,
      [10, 20, 30, 40, 43, 45],
      {
        RANK: 4,
        WINNING_CRITERIA: 4,
        REWARD: 50_000,
      },
    ], // 4개 일치 → 4등
    [
      [10, 20, 30, 40, 41, 43],
      25,
      [10, 20, 30, 42, 44, 45],
      {
        RANK: 5,
        WINNING_CRITERIA: 3,
        REWARD: 5_000,
      },
    ], // 3개 일치 → 5등
    [[5, 10, 15, 20, 25, 30], 35, [1, 2, 3, 4, 5, 6], null], // 1개 이하 → 미당첨
  ])(
    "당첨 번호 %p, 보너스 번호 %i, 로또 %p -> %s",
    (winningNumbers, bonusNumber, lottoNumbers, expectedRank) => {
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      const lotto = new Lotto(lottoNumbers);

      const rank = winningLotto.evaluate(lotto);
      if (rank) expect(rank).toEqual(expectedRank);
    },
  );
});
