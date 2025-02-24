import commaizeNumber from "../../src/utils/commaizeNumber.js";

describe("utils/commaizeNumber", () => {
  test.each([
    [1000, "1,000"],
    [50000, "50,000"],
    [1000000, "1,000,000"],
    [123456789, "123,456,789"],
    [0, "0"],
    [-1000, "-1,000"],
    [-987654321, "-987,654,321"],
    ["300000", "300,000"],
  ])(
    "commaizeNumber(%s) -> %s: 숫자를 천 단위로 콤마로 변환한다.",
    (input, expectedOutput) => {
      expect(commaizeNumber(input)).toBe(expectedOutput);
    },
  );
});
