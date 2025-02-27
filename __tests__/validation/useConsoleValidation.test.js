import useConsoleValidation from "../../src/console/useConsoleValidation.js";
import { ERROR_MESSAGE } from "../../src/constants/error.js";

describe("view/useConsoleValidation", () => {
  const {
    validatePrice,
    validateWinningNumbers,
    validateBonusNumber,
    validateRestart,
  } = useConsoleValidation();

  test.each([
    ["1000", undefined],
    ["5000", undefined],
    ["abc", ERROR_MESSAGE.INVALID_NUMBER], // 숫자 아님
    ["5500", ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT], // 로또 가격 단위 아님
    ["900", ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT], // 로또 가격 단위 아님
    ["101000", ERROR_MESSAGE.INVALID_PRICE_RANGE], // 범위 초과
  ])(
    "validatePrice(%s): 올바른 로또 구매 금액인지 검증",
    (input, expectedError) => {
      if (expectedError) {
        expect(() => validatePrice(input)).toThrow(expectedError);
      } else {
        expect(() => validatePrice(input)).not.toThrow();
      }
    },
  );

  test.each([
    ["1,2,3,4,5,6", undefined],
    ["1,2,3,4,5", ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH], // 개수 부족
    ["1,2,3,4,5,6,7", ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH], // 개수 초과
    ["1,2,3,4,5,46", ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE], // 범위 초과
    ["1,1,2,3,4,5", ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER], // 중복 있음
  ])(
    "validateWinningNumbers(%s): 올바른 로또 당첨 번호인지 검증",
    (input, expectedError) => {
      if (expectedError) {
        expect(() => validateWinningNumbers(input)).toThrow(expectedError);
      } else {
        expect(() => validateWinningNumbers(input)).not.toThrow();
      }
    },
  );

  test.each([
    ["7", [1, 2, 3, 4, 5, 6], undefined],
    ["46", [1, 2, 3, 4, 5, 6], ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE], // 범위 초과
    ["3", [1, 2, 3, 4, 5, 6], ERROR_MESSAGE.INVALID_BONUS_NUMBER], // 중복된 보너스 번호
  ])(
    "validateBonusNumber(%s, %p): 보너스 번호가 적절한지 검증",
    (bonusNumber, winningNumbers, expectedError) => {
      if (expectedError) {
        expect(() => validateBonusNumber(bonusNumber, winningNumbers)).toThrow(
          expectedError,
        );
      } else {
        expect(() =>
          validateBonusNumber(bonusNumber, winningNumbers),
        ).not.toThrow();
      }
    },
  );

  test.each([
    ["y", undefined],
    ["Y", undefined],
    ["n", undefined],
    ["N", undefined],
    ["yes", ERROR_MESSAGE.INVALID_RESTART_FORMAT], // 잘못된 입력
    ["no", ERROR_MESSAGE.INVALID_RESTART_FORMAT],
    ["123", ERROR_MESSAGE.INVALID_RESTART_FORMAT],
    [" ", ERROR_MESSAGE.INVALID_RESTART_FORMAT],
  ])("validateRestart(%s): 'y' 또는 'n'인지 검증", (input, expectedError) => {
    if (expectedError) {
      expect(() => validateRestart(input)).toThrow(expectedError);
    } else {
      expect(() => validateRestart(input)).not.toThrow();
    }
  });
});
