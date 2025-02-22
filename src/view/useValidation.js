import {
  isNumber,
  isLottoPriceUnit,
  isValidPriceRange,
  isValidLottoLength,
  isValidLottoRange,
  isUniqueLottoNumbers,
  isUniqueBonusNumber,
  isValidRestartInput,
} from "../validation/validationRules.js";

const useValidation = () => {
  return {
    validatePrice: (input) =>
      useValidationExecutor(Number(input), [
        isNumber,
        isLottoPriceUnit,
        isValidPriceRange,
      ]),

    validateWinningNumbers: (input) => {
      const numbers = input.split(",").map(Number);
      return useValidationExecutor(numbers, [
        isValidLottoLength,
        isValidLottoRange,
        isUniqueLottoNumbers,
      ]);
    },

    validateBonusNumber: (bonusNumber, winningNumbers) => {
      const number = Number(bonusNumber);
      return useValidationExecutor(number, [
        (num) => isValidLottoRange([num]),
        (num) => isUniqueBonusNumber(num, winningNumbers),
      ]);
    },

    validateRestart: (input) => {
      const lowered = input.trim().toLowerCase();
      return useValidationExecutor(lowered, [isValidRestartInput]) === "y";
    },
  };
};

const useValidationExecutor = (input, rules) => {
  for (const rule of rules) {
    rule(input);
  }
  return input;
};

export default useValidation;
