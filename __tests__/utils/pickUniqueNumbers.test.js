import pickUniqueNumbers from "../../src/utils/pickUniqueNumbers.js";

describe("utils/pickUniqueNumbers", () => {
  test.each([
    [{ min: 1, max: 45 }, 6],
    [{ min: 10, max: 20 }, 5],
    [{ min: 5, max: 10 }, 3],
  ])(
    "범위 %p에서 %i개의 unique한 숫자를 선택하고, 오름차순으로 정렬한다.",
    (range, count) => {
      const result = pickUniqueNumbers(range, count);

      // 개수 확인
      expect(result).toHaveLength(count);

      // 범위 내에 있는지 확인
      result.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(range.min);
        expect(num).toBeLessThanOrEqual(range.max);
      });

      // 중복 없는지 확인
      expect(new Set(result).size).toBe(count);

      // 오름차순 정렬 확인
      expect([...result].sort((a, b) => a - b)).toEqual(result);
    },
  );

  test("선택할 개수가 범위보다 크면 에러를 발생시킨다.", () => {
    expect(() => pickUniqueNumbers({ min: 1, max: 5 }, 6)).toThrow(
      "선택할 개수가 범위보다 클 수 없습니다.",
    );
  });
});
