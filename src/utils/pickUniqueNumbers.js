/**
 * 주어진 범위에서 중복 없이 랜덤한 숫자 N개를 선택하여 오름차순 정렬
 * @param {Object} range - 숫자 범위 ({ min, max })
 * @param {number} count - 선택할 숫자의 개수
 * @returns {number[]} - 중복 없는 랜덤 숫자 배열 (오름차순 정렬)
 * @throws {Error} - 선택할 개수가 범위를 초과할 경우 예외 발생
 */
const pickUniqueNumbers = (range, count) => {
  if (count > range.max - range.min + 1) {
    throw new Error("선택할 개수가 범위보다 클 수 없습니다.");
  }

  const randomNumbers = new Set();

  while (randomNumbers.size < count) {
    randomNumbers.add(
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
    );
  }
  return Array.from(randomNumbers).sort((a, b) => a - b);
};

export default pickUniqueNumbers;
