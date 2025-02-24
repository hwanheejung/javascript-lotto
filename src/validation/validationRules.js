import { ERROR_MESSAGE } from "../constants/error.js";
import {
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBER_COUNT,
  LOTTO_PRICE_UNIT,
  MAX_PURCHASE_AMOUNT,
  MIN_PURCHASE_AMOUNT,
  VALID_RESTART_INPUTS,
} from "../constants/rules.js";

/**
 * 입력값이 숫자인지 확인
 */
export const isNumber = (input) => {
  if (!/^\d+$/.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
  }
};

/**
 * 로또 한 장 가격 단위인지 확인
 */
export const isLottoPriceUnit = (input) => {
  if (input % LOTTO_PRICE_UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
  }
};

/**
 * 구매 금액 범위 확인
 */
export const isValidPriceRange = (input) => {
  if (input < MIN_PURCHASE_AMOUNT || input > MAX_PURCHASE_AMOUNT) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_RANGE);
  }
};

/**
 * 로또 번호 개수 확인
 */
export const isValidLottoLength = (numbers) => {
  if (numbers.length !== LOTTO_NUMBER_COUNT) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH);
  }
};

/**
 * 로또 번호 범위 확인 (1~45)
 */
export const isValidLottoRange = (numbers) => {
  if (numbers.some((num) => num < LOTTO_MIN_NUMBER || num > LOTTO_MAX_NUMBER)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};

/**
 * 로또 번호 중복 확인
 */
export const isUniqueLottoNumbers = (numbers) => {
  if (new Set(numbers).size !== 6) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER);
  }
};

/**
 * 보너스 번호가 당첨 번호와 중복되지 않는지 확인
 */
export const isUniqueBonusNumber = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER);
  }
};

/**
 * y/n 입력 확인
 */
export const isValidRestartInput = (input) => {
  const lowered = input.trim().toLowerCase();
  if (!VALID_RESTART_INPUTS.includes(lowered)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);
  }
};
