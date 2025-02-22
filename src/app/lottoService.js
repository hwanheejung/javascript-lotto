import { PRIZE } from "../constants/prize.js";
import LottoBundle from "../domain/LottoBundle.js";
import WinningLotto from "../domain/WinningLotto.js";

const lottoService = {
  /**
   * 로또를 생성하는 서비스
   */
  generateLottoBundle(price) {
    return new LottoBundle(price / 1000);
  },

  /**
   * 당첨 결과를 계산하는 서비스
   */
  evaluateResults(lottoBundle, winningNumbers, bonusNumber) {
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    const results = lottoBundle
      .getLottos()
      .map((lotto) => winningLotto.evaluate(lotto));

    const resultCount = this.countResults(results);
    const formattedResults = this.formatResults(resultCount);
    const totalReward = this.calculateTotalReward(formattedResults);

    return { formattedResults, totalReward };
  },

  /**
   * 당첨 개수를 세는 함수
   */
  countResults(results) {
    const resultCount = new Array(6).fill(0);
    results.forEach((rank) => {
      if (rank) resultCount[rank.RANK]++;
    });
    return resultCount;
  },

  /**
   * 당첨 결과를 포맷하는 함수
   */
  formatResults(resultCount) {
    return Object.entries(PRIZE).map(
      ([key, { WINNING_CRITERIA, REWARD }], index) => ({
        rank: key, // "FIFTH", "FOURTH"...
        winningCriteria: WINNING_CRITERIA, // 당첨 조건으로 필요한 숫자 개수
        reward: REWARD, // 당첨 금액
        count: resultCount[index + 1] || 0, // 당첨된 개수 (없으면 0)
      }),
    );
  },

  /**
   * 총 당첨금 계산
   */
  calculateTotalReward(formattedResults) {
    return formattedResults.reduce(
      (total, { count, reward }) => total + count * reward,
      0,
    );
  },
};

export default lottoService;
