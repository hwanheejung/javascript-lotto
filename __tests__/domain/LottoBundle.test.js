import LottoBundle from "../../src/domain/LottoBundle.js";
import Lotto from "../../src/domain/Lotto.js";
import pickUniqueNumbers from "../../src/utils/pickUniqueNumbers.js";

jest.mock("../../src/utils/pickUniqueNumbers.js");

describe("domain/LottoBundle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([1, 5, 10])(
    "LottoBundle(%i): %i개의 Lotto 인스턴스를 생성해야 한다.",
    (count) => {
      pickUniqueNumbers.mockImplementation(() => [1, 2, 3, 4, 5, 6]);

      const lottoBundle = new LottoBundle(count);
      expect(lottoBundle.size()).toBe(count);
    },
  );

  test("getLottos()는 Lotto 인스턴스 목록을 반환해야 한다.", () => {
    pickUniqueNumbers
      .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
      .mockReturnValueOnce([7, 8, 9, 10, 11, 12]);

    const lottoBundle = new LottoBundle(2);
    const lottos = lottoBundle.getLottos();

    expect(lottos).toHaveLength(2);
    expect(lottos.map((lotto) => lotto.getNumbers())).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);
  });

  test("getLottos()가 Lotto 배열을 직접 수정할 수 없어야 한다.", () => {
    pickUniqueNumbers.mockImplementation(() => [1, 2, 3, 4, 5, 6]);

    const lottoBundle = new LottoBundle(2);
    const lottos = lottoBundle.getLottos();

    lottos.push(new Lotto([10, 20, 30, 40, 41, 42])); // 추가 시도
    lottos[0] = new Lotto([1, 2, 3, 4, 5, 7]); // 변경 시도

    expect(lottoBundle.getLottos()).toHaveLength(2); // 개수 유지
    expect(lottoBundle.getLottos().map((lotto) => lotto.getNumbers())).toEqual([
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ]); // 원본 데이터 유지
  });
});
