import { ERROR_MESSAGE } from "../constants/error.js";
import {
  LottoShop,
  LottoNumber,
  VALID_RESTART_INPUTS,
} from "../constants/rules.js";
import Lotto from "../domain/Lotto.js";

export const validateNumber = (input) => {
  if (!/^\d+$/.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
  }
};

export const validateLottoPriceUnit = (input) => {
  if (input % LottoShop.PRICE_UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
  }
};

export const validatePriceRange = (input) => {
  if (
    input < LottoShop.MIN_PURCHASE_AMOUNT ||
    input > LottoShop.MAX_PURCHASE_AMOUNT
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_RANGE);
  }
};

export const validateLottoLength = (numbers) => {
  if (numbers.length !== Lotto.SIZE) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH);
  }
};

export const validateLottoRange = (numbers) => {
  if (numbers.some((num) => num < LottoNumber.MIN || num > LottoNumber.MAX)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};

export const validateUniqueLottoNumbers = (numbers) => {
  if (new Set(numbers).size !== 6) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER);
  }
};

export const validateUniqueBonusNumber = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER);
  }
};

export const validateRestartInput = (input) => {
  const lowered = input.trim().toLowerCase();
  if (!VALID_RESTART_INPUTS.includes(lowered)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);
  }
};
