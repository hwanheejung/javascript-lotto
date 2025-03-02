import lottoService from "../../../services/lottoService.js";
import commaizeNumber from "../../../utils/commaizeNumber.js";
import Modal from "./Modal.js";

class ResultModal extends Modal {
  static TITLE = "🏆 당첨 통계 🏆";
  static TABLE = {
    WINNING_CRITERIA: "일치 개수",
    REWARD: "당첨금",
    COUNT: "당첨 개수",
  };
  static RESTART = "다시 시작하기";

  static SELECTOR = {
    RESTART_BUTTON: "modal__restart",
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
      [`click@.${ResultModal.SELECTOR.RESTART_BUTTON}`]:
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
        <h2 class="modal__title text-subtitle">${ResultModal.TITLE}</h2>
        <div class="modal__result">
            <table class="modal__table">
                <thead>
                    <tr>
                        <th>${ResultModal.TABLE.WINNING_CRITERIA}</th>
                        <th>${ResultModal.TABLE.REWARD}</th>
                        <th>${ResultModal.TABLE.COUNT}</th>
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
        <button class="${ResultModal.SELECTOR.RESTART_BUTTON} button">${
      ResultModal.RESTART
    }</button>
    `;
  }
}

export default ResultModal;
