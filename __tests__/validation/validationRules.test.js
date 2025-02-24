import { ERROR_MESSAGE } from "../../src/constants/error.js";
import {
  validateNumber,
  validateLottoPriceUnit,
  validatePriceRange,
  validateLottoLength,
  validateLottoRange,
  validateUniqueLottoNumbers,
  validateUniqueBonusNumber,
  validateRestartInput,
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
    "validateNumber(%s): 숫자 형식이 아닌 경우 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => validateNumber(input)).toThrow(
          ERROR_MESSAGE.INVALID_NUMBER,
        );
      } else {
        expect(() => validateNumber(input)).not.toThrow();
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
    "validateLottoPriceUnit(%i): 로또 한 장 가격 단위가 아닌 경우 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => validateLottoPriceUnit(input)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT,
        );
      } else {
        expect(() => validateLottoPriceUnit(input)).not.toThrow();
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
    "validatePriceRange(%i): 구매 금액이 범위를 벗어나면 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => validatePriceRange(input)).toThrow(
          ERROR_MESSAGE.INVALID_PRICE_RANGE,
        );
      } else {
        expect(() => validatePriceRange(input)).not.toThrow();
      }
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], false],
    [[1, 2, 3, 4, 5], true],
    [[1, 2, 3, 4, 5, 6, 7], true],
  ])(
    "validateLottoLength(%p): 로또 번호 개수가 6개가 아니면 예외를 발생시킨다.",
    (numbers, throwsError) => {
      if (throwsError) {
        expect(() => validateLottoLength(numbers)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH,
        );
      } else {
        expect(() => validateLottoLength(numbers)).not.toThrow();
      }
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], false],
    [[1, 2, 3, 4, 5, 46], true],
    [[0, 2, 3, 4, 5, 6], true],
  ])(
    "validateLottoRange(%p): 로또 번호가 1~45 범위를 벗어나면 예외를 발생시킨다.",
    (numbers, throwsError) => {
      if (throwsError) {
        expect(() => validateLottoRange(numbers)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE,
        );
      } else {
        expect(() => validateLottoRange(numbers)).not.toThrow();
      }
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], false],
    [[1, 1, 2, 3, 4, 5], true],
    [[7, 7, 7, 7, 7, 7], true],
  ])(
    "validateUniqueLottoNumbers(%p): 로또 번호에 중복이 있으면 예외를 발생시킨다.",
    (numbers, throwsError) => {
      if (throwsError) {
        expect(() => validateUniqueLottoNumbers(numbers)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER,
        );
      } else {
        expect(() => validateUniqueLottoNumbers(numbers)).not.toThrow();
      }
    },
  );

  test.each([
    [7, [1, 2, 3, 4, 5, 6], false],
    [3, [1, 2, 3, 4, 5, 6], true],
  ])(
    "validateUniqueBonusNumber(%i, %p): 보너스 번호가 당첨 번호와 중복되면 예외를 발생시킨다.",
    (bonusNumber, winningNumbers, throwsError) => {
      if (throwsError) {
        expect(() =>
          validateUniqueBonusNumber(bonusNumber, winningNumbers),
        ).toThrow(ERROR_MESSAGE.INVALID_BONUS_NUMBER);
      } else {
        expect(() =>
          validateUniqueBonusNumber(bonusNumber, winningNumbers),
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
    "validateRestartInput(%s): 'y' 또는 'n'이 아닌 경우 예외를 발생시킨다.",
    (input, throwsError) => {
      if (throwsError) {
        expect(() => validateRestartInput(input)).toThrow(
          ERROR_MESSAGE.INVALID_RESTART_FORMAT,
        );
      } else {
        expect(() => validateRestartInput(input)).not.toThrow();
      }
    },
  );
});
