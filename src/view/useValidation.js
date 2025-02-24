import {
  validateNumber,
  validateLottoPriceUnit,
  validatePriceRange,
  validateLottoLength,
  validateLottoRange,
  validateUniqueLottoNumbers,
  validateUniqueBonusNumber,
  validateRestartInput,
} from "../validation/validationRules.js";

const useValidation = () => {
  return {
    validatePrice: (input) =>
      executeValidations(Number(input), [
        validateNumber,
        validateLottoPriceUnit,
        validatePriceRange,
      ]),

    validateWinningNumbers: (input) => {
      const numbers = input.split(",").map(Number);
      return executeValidations(numbers, [
        validateLottoLength,
        validateLottoRange,
        validateUniqueLottoNumbers,
      ]);
    },

    validateBonusNumber: (bonusNumber, winningNumbers) => {
      const number = Number(bonusNumber);
      return executeValidations(number, [
        (num) => validateLottoRange([num]),
        (num) => validateUniqueBonusNumber(num, winningNumbers),
      ]);
    },

    validateRestart: (input) => {
      const lowered = input.trim().toLowerCase();
      return executeValidations(lowered, [validateRestartInput]) === "y";
    },
  };
};

const executeValidations = (input, rules) => {
  for (const rule of rules) {
    rule(input);
  }
  return input;
};

export default useValidation;
