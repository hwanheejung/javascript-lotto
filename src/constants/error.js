import { Lotto, LottoNumber, LottoShop } from "./rules.js";

export const ERROR_MESSAGE = {
  INVALID_NUMBER: "숫자를 입력해주세요.",
  INVALID_LOTTO_PRICE_UNIT: `${LottoShop.PRICE_UNIT}원 단위로 입력해주세요.`,
  INVALID_PRICE_RANGE: `${LottoShop.MIN_PURCHASE_AMOUNT}원 이상 ${LottoShop.MAX_PURCHASE_AMOUNT / 10000}만원 이하로 입력해주세요.`,
  INVALID_LOTTO_NUMBER_RANGE: `${LottoNumber.MIN}부터 ${LottoNumber.MAX} 사이의 숫자를 입력해주세요.`,
  INVALID_LOTTO_NUMBER_LENGTH: `${Lotto.SIZE}개의 숫자를 입력해주세요.`,
  INVALID_LOTTO_DUPLICATE_NUMBER: "중복된 숫자가 있습니다.",
  INVALID_BONUS_NUMBER: "당첨 번호와 중복되지 않는 숫자를 입력해주세요.",
  INVALID_RESTART_FORMAT: "y 또는 n을 입력해주세요.",
};
