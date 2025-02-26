import { Lotto } from "../../constants/rules.js";
import Component from "./Component.js";
import LottoForm from "./LottoForm.js";
import LottoList from "./LottoList.js";
import ResultModal from "./ResultModal.js";
import WinningNumbersForm from "./WinningNumbersForm.js";

const TITLE = "🎱 내 번호 당첨 확인 🎱";
class LottoGame extends Component {
  setup() {
    this.state = {
      price: 0,
      lottoBundle: [],
      winningNumbers: Array(Lotto.SIZE).fill(""),
      bonusNumber: "",
      isModalOpen: false,
    };
  }

  setIsModalOpen(openModal) {
    this.setState({ isModalOpen: openModal });
  }

  resetGame() {
    this.render();
  }

  template() {
    return `
      <section id="lotto-game">
        <h2 class="text-title">${TITLE}</h2>
        <div id="lotto-form"></div>
        <div id="lotto-list"></div>
        <div id="winning-numbers-form"></div>
      </section>
      <div id="modal-root"></div>
    `;
  }

  componentDidUpdate(changedKeys) {
    if (changedKeys.includes("price")) {
      new LottoList(document.querySelector("#lotto-list"), {
        lottoBundle: this.state.lottoBundle,
      });
      new WinningNumbersForm(document.querySelector("#winning-numbers-form"), {
        onModalOpen: () => this.setIsModalOpen(true),
        setWinningNumbers: (winningNumbers) =>
          this.setState({ winningNumbers }),
        setBonusNumber: (bonusNumber) => this.setState({ bonusNumber }),
      });
    }

    if (changedKeys.includes("isModalOpen")) {
      const modalRoot = document.querySelector("#modal-root");

      if (this.state.isModalOpen) {
        new ResultModal(modalRoot, {
          isOpen: this.state.isModalOpen,
          onClose: () => this.setState({ isModalOpen: false }),
          onRestart: () => this.resetGame(),

          price: this.state.price,
          lottoBundle: this.state.lottoBundle,
          winningNumbers: this.state.winningNumbers,
          bonusNumber: this.state.bonusNumber,
        });
      } else {
        modalRoot.innerHTML = "";
      }
    }
  }

  renderChildren() {
    new LottoForm(document.querySelector("#lotto-form"), {
      onPurchase: (price, lottoBundle) => this.setState({ price, lottoBundle }),
    });
  }
}

export default LottoGame;
