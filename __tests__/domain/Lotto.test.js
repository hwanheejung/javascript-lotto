import { ERROR_MESSAGE } from "../../src/constants/error.js";
import Lotto from "../../src/domain/Lotto.js";

describe("domain/Lotto", () => {
  test("로또 번호가 정상적으로 생성된다.", () => {
    const lotto = new Lotto([10, 2, 45, 33, 7, 18]);
    expect(lotto.getNumbers()).toEqual([2, 7, 10, 18, 33, 45]);
  });

  test.each([
    [[1, 2, 3, 4, 5], "개수 부족", ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH],
    [
      [1, 2, 3, 4, 5, 6, 7],
      "개수 초과",
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH,
    ],
    [[0, 2, 3, 4, 5, 6], "범위 초과", ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE],
    [
      [1, 2, 3, 4, 5, 46],
      "범위 초과",
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE,
    ],
    [
      [1, 1, 2, 3, 4, 5],
      "중복 있음",
      ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER,
    ],
  ])(
    "유효하지 않은 번호 %p 입력 시 %s 예외 발생",
    (numbers, _, expectedError) => {
      expect(() => new Lotto(numbers)).toThrow(expectedError);
    },
  );

  test("로또 번호는 항상 오름차순으로 정렬된다.", () => {
    const lotto = new Lotto([30, 5, 10, 15, 20, 25]);
    expect(lotto.getNumbers()).toEqual([5, 10, 15, 20, 25, 30]);
  });

  test("getNumbers()가 내부 상태를 직접 수정할 수 없어야 한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const numbers = lotto.getNumbers();

    numbers.push(99);
    numbers[0] = 100;

    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test.each([
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 6],
    [[10, 20, 30, 40, 41, 42], [10, 20, 30, 35, 36, 37], 3],
    [[5, 10, 15, 20, 25, 30], [1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], 0],
  ])(
    "로또 번호 %p와 당첨 번호 %p를 비교하면 %i개 일치해야 한다.",
    (lottoNumbers, winningNumbers, expectedMatch) => {
      const lotto = new Lotto(lottoNumbers);
      expect(lotto.matchCount(winningNumbers)).toBe(expectedMatch);
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 6, true],
    [[10, 20, 30, 40, 41, 42], 25, false],
    [[5, 10, 15, 20, 25, 30], 10, true],
    [[1, 2, 3, 4, 5, 6], 45, false],
  ])(
    "로또 번호 %p가 보너스 번호 %i를 포함하는지 확인",
    (lottoNumbers, bonusNumber, expected) => {
      const lotto = new Lotto(lottoNumbers);
      expect(lotto.hasBonus(bonusNumber)).toBe(expected);
    },
  );
});
