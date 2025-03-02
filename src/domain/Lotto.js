import {
  validateUniqueLottoNumbers,
  validateLottoLength,
  validateLottoRange,
} from "../validation/validationRules.js";

class Lotto {
  static SIZE = 6;

  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    validateLottoLength(numbers);
    validateLottoRange(numbers);
    validateUniqueLottoNumbers(numbers);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  matchCount(numbers) {
    return this.#numbers.filter((num) => numbers.includes(num)).length;
  }

  has(number) {
    return this.#numbers.includes(number);
  }
}

export default Lotto;
