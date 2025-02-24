import { PRIZE } from "../constants/prize.js";
import { isUniqueBonusNumber } from "../validation/validationRules.js";
import Lotto from "./Lotto.js";

class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningLotto = new Lotto(winningNumbers);
    isUniqueBonusNumber(bonusNumber, winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  evaluate(lotto) {
    const matchCount = lotto.matchCount(this.#winningLotto.getNumbers());
    const isBonusMatched = lotto.hasBonus(this.#bonusNumber);
    return this.#getRank(matchCount, isBonusMatched);
  }

  #getRank(matchCount, isBonusMatched) {
    return (
      Object.values(PRIZE).find(
        ({ WINNING_CRITERIA, BONUS_MATCHED }) =>
          WINNING_CRITERIA === matchCount &&
          (BONUS_MATCHED === undefined || BONUS_MATCHED === isBonusMatched),
      ) || null
    );
  }
}

export default WinningLotto;
