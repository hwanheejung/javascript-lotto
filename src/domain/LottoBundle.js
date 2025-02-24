import pickUniqueNumbers from "../utils/pickUniqueNumbers.js";
import Lotto from "./Lotto.js";

class LottoBundle {
  #lottos;

  constructor(count) {
    this.#lottos = Array.from(
      { length: count },
      () => new Lotto(pickUniqueNumbers({ min: 1, max: 45 }, 6)),
    );
  }

  /**
   * 구매한 로또 개수 반환
   */
  size() {
    return this.#lottos.length;
  }

  /**
   * 모든 로또 반환
   */
  getLottos() {
    return [...this.#lottos];
  }
}
export default LottoBundle;
