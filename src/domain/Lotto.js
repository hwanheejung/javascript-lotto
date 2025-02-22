import {
  isUniqueLottoNumbers,
  isValidLottoLength,
  isValidLottoRange,
} from "../validation/validationRules.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    isValidLottoLength(numbers);
    isValidLottoRange(numbers);
    isUniqueLottoNumbers(numbers);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  matchCount(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
