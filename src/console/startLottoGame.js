import input from "./view/input.js";
import output from "./view/output.js";
import lottoService from "../app/lottoService.js";

const startLottoGame = async () => {
  // 1. 구입 금액 입력 및 로또 생성
  const price = await input.getLottoPrice();
  const lottoBundle = lottoService.generateLottoBundle(price);

  output.printLottoCount(lottoBundle.size());
  lottoBundle
    .getLottos()
    .forEach((lotto) => output.printLottoNumbers(lotto.getNumbers()));

  // 2. 당첨 번호 & 보너스 번호 입력
  const winningNumbers = await input.getWinningNumbers();
  const bonusNumber = await input.getBonusNumber(winningNumbers);

  // 3. 당첨 결과 확인
  const { formattedResults, totalReward } = lottoService.evaluateResults(
    lottoBundle,
    winningNumbers,
    bonusNumber,
  );

  // 4. 결과 출력
  output.printResult(formattedResults);
  output.printProfitRate(price, totalReward);

  // 5. 재시작 여부 확인
  const shouldRestart = await input.getRestart();
  if (shouldRestart) startLottoGame();
};

export default startLottoGame;
