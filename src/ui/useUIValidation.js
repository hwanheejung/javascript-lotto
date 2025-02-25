import useValidation from "../validation/useValidation.js";

const executeValidations = (input, rules) => {
  for (const rule of rules) {
    try {
      rule(input);
    } catch (error) {
      alert(error.message);
      return;
    }
  }
  return input;
};

const useUIValidation = useValidation(executeValidations);

export default useUIValidation;
