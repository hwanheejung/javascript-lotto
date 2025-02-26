import lottoService from "../../../app/lottoService.js";
import commaizeNumber from "../../../utils/commaizeNumber.js";
import Modal from "./Modal.js";

class ResultModal extends Modal {
  constructor($target, props) {
    super($target, props);
  }

  setup() {
    super.setup();
    this.events = {
      ...this.events,
      "click@.modal__restart": this.handleClickRestart,
    };
  }

  calculateProfitRate(totalReward) {
    const { price } = this.props;

    return ((totalReward - price) / price) * 100;
  }

  handleClickRestart() {
    this.props.onRestart();
  }

  content() {
    const { lottoBundle, winningNumbers, bonusNumber } = this.props;
    const { formattedResults, totalReward } = lottoService.evaluateResults(
      lottoBundle,
      winningNumbers,
      bonusNumber,
    );

    return ` 
        <h2 class="modal__title text-subtitle">🏆 당첨 통계 🏆</h2>
        <div class="modal__result">
            <table class="modal__table">
                <thead>
                    <tr>
                        <th>일치 개수</th>
                        <th>당첨금</th>
                        <th>당첨 개수</th>
                    </tr>
                </thead>
                <tbody>
                    ${formattedResults
                      .slice()
                      .reverse()
                      .map(
                        ({ rank, winningCriteria, reward, count }) => `
                            <tr>
                                <td>${winningCriteria}개${rank === "SECOND" ? "+보너스볼" : ""}</td>
                                <td>${commaizeNumber(reward)}</td>
                                <td>${count}개</td>
                            </tr>
                          `,
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
        <p class="modal__profitRate">
          당신의 총 수익률은 ${this.calculateProfitRate(totalReward).toFixed(2)}%입니다.
        </p>
        <button class="button">다시 시작하기</button>
    `;
  }
}

export default ResultModal;
