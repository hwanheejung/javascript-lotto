import useValidation from "../validation/useValidation.js";

const executeValidations = (input, rules) => {
  for (const rule of rules) {
    rule(input);
  }
  return input;
};

const useConsoleValidation = useValidation(executeValidations);

export default useConsoleValidation;
