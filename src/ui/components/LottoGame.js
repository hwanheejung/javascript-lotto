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
      isModalOpen: false,
      winningNumbers: Array(Lotto.SIZE).fill(""),
      bonusNumber: "",
    };
  }

  setIsModalOpen(isModalOpen) {
    this.setState({ isModalOpen });
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

  renderChildren() {
    new LottoForm(document.querySelector("#lotto-form"), {
      onPurchase: (price, lottoBundle) => this.setState({ price, lottoBundle }),
    });

    if (!this.state.price) return;

    new LottoList(document.querySelector("#lotto-list"), {
      lottoBundle: this.state.lottoBundle,
    });

    new WinningNumbersForm(document.querySelector("#winning-numbers-form"), {
      onModalOpen: () => this.setIsModalOpen(true),
      setWinningNumbers: (winningNumbers) => this.setState({ winningNumbers }),
      setBonusNumber: (bonusNumber) => this.setState({ bonusNumber }),
    });

    if (this.state.isModalOpen) {
      new ResultModal(document.querySelector("#modal-root"), {
        isOpen: this.state.isModalOpen,
        onClose: () => this.setIsModalOpen(false),
        price: this.state.price,
        lottoBundle: this.state.lottoBundle,
        winningNumbers: this.state.winningNumbers,
        bonusNumber: this.state.bonusNumber,
      });
    }
  }
}

export default LottoGame;
