import useValidation from "../validation/useValidation.js";
import retryUntilValid from "./retryUntilValid.js";

const executeValidations = (input, rules) => {
  for (const rule of rules) {
    rule(input);
  }
  return input;
};

const useConsoleValidation = useValidation(executeValidations);

const input = {
  /**
   * @returns {number} - 구입 금액
   */
  getLottoPrice() {
    const { validatePrice } = useConsoleValidation();
    return retryUntilValid("구입 금액을 입력해 주세요: ", validatePrice);
  },

  /**
   * @returns {number[]} - 당첨 번호
   */
  getWinningNumbers() {
    const { validateWinningNumbers } = useConsoleValidation();
    return retryUntilValid(
      "\n당첨 번호를 입력해 주세요: ",
      validateWinningNumbers,
    );
  },

  /**
   *
   * @param {number[]} winningNumbers - 당첨 번호
   * @returns {number} - 보너스 번호
   */
  getBonusNumber(winningNumbers) {
    const { validateBonusNumber } = useConsoleValidation();
    return retryUntilValid("\n보너스 번호를 입력해 주세요: ", (bonusNumber) =>
      validateBonusNumber(bonusNumber, winningNumbers),
    );
  },

  /**
   * @returns {boolean} - 재시작 여부
   */
  getRestart() {
    const { validateRestart } = useConsoleValidation();
    return retryUntilValid("\n다시 시작하시겠습니까? (y/n): ", validateRestart);
  },
};

export default input;
