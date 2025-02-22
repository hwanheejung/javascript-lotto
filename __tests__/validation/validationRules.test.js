import { ERROR_MESSAGE } from "../../src/constants/error.js";
import {
  isNumber,
  isLottoPriceUnit,
  isValidPriceRange,
  isValidLottoLength,
  isValidLottoRange,
  isUniqueLottoNumbers,
  isUniqueBonusNumber,
  isValidRestartInput,
} from "../../src/validation/validationRules.js";

describe("validation/validationRules", () => {
  test.each([
    ["123", false],
    ["0", false],
    ["12.3", true],
    ["abc", true],
    ["", true],
    [" ", true],
  ])(
    "isNumber(%s): 숫자 형식이 아닌 경우 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => isNumber(input)).toThrow(ERROR_MESSAGE.INVALID_NUMBER);
      } else {
        expect(() => isNumber(input)).not.toThrow();
      }
    },
  );

  test.each([
    [1000, false],
    [5000, false],
    [10000, false],
    [0, false],
    [999, true],
    [1500, true],
    [1001, true],
  ])(
    "isLottoPriceUnit(%i): 로또 한 장 가격 단위가 아닌 경우 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => isLottoPriceUnit(input)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT,
        );
      } else {
        expect(() => isLottoPriceUnit(input)).not.toThrow();
      }
    },
  );

  test.each([
    [1000, false],
    [50000, false],
    [100000, false],
    [999, true],
    [100001, true],
    [-500, true],
  ])(
    "isValidPriceRange(%i): 구매 금액이 범위를 벗어나면 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => isValidPriceRange(input)).toThrow(
          ERROR_MESSAGE.INVALID_PRICE_RANGE,
        );
      } else {
        expect(() => isValidPriceRange(input)).not.toThrow();
      }
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], false],
    [[1, 2, 3, 4, 5], true],
    [[1, 2, 3, 4, 5, 6, 7], true],
  ])(
    "isValidLottoLength(%p): 로또 번호 개수가 6개가 아니면 예외를 발생시킨다.",
    (numbers, throwsError) => {
      if (throwsError) {
        expect(() => isValidLottoLength(numbers)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH,
        );
      } else {
        expect(() => isValidLottoLength(numbers)).not.toThrow();
      }
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], false],
    [[1, 2, 3, 4, 5, 46], true],
    [[0, 2, 3, 4, 5, 6], true],
  ])(
    "isValidLottoRange(%p): 로또 번호가 1~45 범위를 벗어나면 예외를 발생시킨다.",
    (numbers, throwsError) => {
      if (throwsError) {
        expect(() => isValidLottoRange(numbers)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE,
        );
      } else {
        expect(() => isValidLottoRange(numbers)).not.toThrow();
      }
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], false],
    [[1, 1, 2, 3, 4, 5], true],
    [[7, 7, 7, 7, 7, 7], true],
  ])(
    "isUniqueLottoNumbers(%p): 로또 번호에 중복이 있으면 예외를 발생시킨다.",
    (numbers, throwsError) => {
      if (throwsError) {
        expect(() => isUniqueLottoNumbers(numbers)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER,
        );
      } else {
        expect(() => isUniqueLottoNumbers(numbers)).not.toThrow();
      }
    },
  );

  test.each([
    [7, [1, 2, 3, 4, 5, 6], false],
    [3, [1, 2, 3, 4, 5, 6], true],
  ])(
    "isUniqueBonusNumber(%i, %p): 보너스 번호가 당첨 번호와 중복되면 예외를 발생시킨다.",
    (bonusNumber, winningNumbers, throwsError) => {
      if (throwsError) {
        expect(() => isUniqueBonusNumber(bonusNumber, winningNumbers)).toThrow(
          ERROR_MESSAGE.INVALID_BONUS_NUMBER,
        );
      } else {
        expect(() =>
          isUniqueBonusNumber(bonusNumber, winningNumbers),
        ).not.toThrow();
      }
    },
  );

  test.each([
    ["y", false],
    ["Y", false],
    ["n", false],
    ["N", false],
    ["yes", true],
    ["no", true],
    ["123", true],
    [" ", true],
  ])(
    "isValidRestartInput(%s): 'y' 또는 'n'이 아닌 경우 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => isValidRestartInput(input)).toThrow(
          ERROR_MESSAGE.INVALID_RESTART_FORMAT,
        );
      } else {
        expect(() => isValidRestartInput(input)).not.toThrow();
      }
    },
  );
});
