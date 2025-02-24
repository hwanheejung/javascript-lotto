import commaizeNumber from "../utils/commaizeNumber.js";

const output = {
  /**
   * 구매한 로또 개수 출력
   */
  printLottoCount(count) {
    console.log(`${count}개를 구매했습니다.`);
  },

  /**
   * 로또 번호 출력
   */
  printLottoNumbers(numbers) {
    console.log(numbers);
  },

  /**
   * 당첨 결과 출력
   */
  printResult(result) {
    console.log("\n당첨 통계\n--------------------");
    result.reverse().map(({ rank, winningCriteria, reward, count }) => {
      const bonusText = rank === "SECOND" ? ", 보너스 볼 일치" : "";
      console.log(
        `${winningCriteria}개 일치${bonusText} (${commaizeNumber(
          reward,
        )}원) - ${count}개`,
      );
    });
  },

  /**
   * 수익률 출력
   */
  printProfitRate(price, reward) {
    const rate = (reward / price) * 100;
    console.log(`총 수익률은 ${commaizeNumber(rate.toFixed(2))}%입니다.`);
  },
};

export default output;
