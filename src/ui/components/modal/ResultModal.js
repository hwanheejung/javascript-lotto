import lottoService from "../../../services/lottoService.js";
import commaizeNumber from "../../../utils/commaizeNumber.js";
import Modal from "./Modal.js";

class ResultModal extends Modal {
  static MESSAGE = {
    TITLE: "🏆 당첨 통계 🏆",
    WINNING_CRITERIA: "일치 개수",
    REWARD: "당첨금",
    COUNT: "당첨 개수",
    RESTART: "다시 시작하기",
  };

  static SELECTOR = {
    RESTART_BUTTON: ".modal__restart",
  };

  constructor(target, props) {
    super(target, props);
  }

  setup() {
    super.setup();
    this.state = {
      formattedResults: [],
      totalReward: 0,
    };

    this.setupEvents();
    this.calculateResults();
  }

  setupEvents() {
    this.events = {
      ...this.events,
      [`click@${ResultModal.SELECTOR.RESTART_BUTTON}`]:
        this.handleRestart.bind(this),
    };
  }

  calculateResults() {
    const { lottoBundle, winningNumbers, bonusNumber } = this.props;
    const { formattedResults, totalReward } = lottoService.evaluateResults(
      lottoBundle,
      winningNumbers,
      bonusNumber
    );

    this.setState({ formattedResults, totalReward });
  }

  getProfitRate() {
    const { totalReward } = this.state;
    const { price } = this.props;
    return ((totalReward - price) / price) * 100;
  }

  generateTableRows() {
    return this.state.formattedResults
      .reverse()
      .map(
        ({ rank, winningCriteria, reward, count }) => `
          <tr>
            <td>${winningCriteria}개${rank === "SECOND" ? "+보너스볼" : ""}</td>
            <td>${commaizeNumber(reward)}</td>
            <td>${count}개</td>
          </tr>
        `
      )
      .join("");
  }

  handleRestart() {
    this.props.onRestart();
  }

  content() {
    return ` 
        <h2 class="modal__title text-subtitle">${ResultModal.MESSAGE.TITLE}</h2>
        <div class="modal__result">
            <table class="modal__table">
                <thead>
                    <tr>
                        <th>${ResultModal.MESSAGE.WINNING_CRITERIA}</th>
                        <th>${ResultModal.MESSAGE.REWARD}</th>
                        <th>${ResultModal.MESSAGE.COUNT}</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateTableRows()}
                </tbody>
            </table>
        </div>
        <p class="modal__profitRate">
          당신의 총 수익률은 ${this.getProfitRate(
            this.state.totalReward
          ).toFixed(2)}%입니다.
        </p>
        <button class="${ResultModal.SELECTOR.RESTART_BUTTON.slice(
          1
        )} button">${ResultModal.MESSAGE.RESTART}</button>
    `;
  }
}

export default ResultModal;
