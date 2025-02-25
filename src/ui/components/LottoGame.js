import { Lotto } from "../../constants/rules.js";
import Component from "./Component.js";
import LottoForm from "./LottoForm.js";
import LottoList from "./LottoList.js";
import ResultModal from "./ResultModal.js";
import WinningNumbersForm from "./WinningNumbersForm.js";

class LottoGame extends Component {
  setup() {
    this.state = {
      isPurchased: false,
      price: 0,
      lottoBundle: [],
      isModalOpen: false,
      winningNumbers: Array(Lotto.SIZE).fill(""),
      bonusNumber: "",
    };
  }

  handlePurchase(price, lottoBundle) {
    this.setState({ isPurchased: true, price, lottoBundle });
  }

  handleModalOpen() {
    this.setState({ isModalOpen: true });
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  template() {
    return `
      <section id="lotto-game">
        <h2 class="text-title">🎱 내 번호 당첨 확인 🎱</h2>
        <div id="lotto-form"></div>
        <div id="lotto-list"></div>
        <div id="winning-numbers-form"></div>
      </section>
      <div id="modal-root"></div>
    `;
  }

  renderChildren() {
    new LottoForm(document.querySelector("#lotto-form"), {
      onPurchase: (price, lottoBundle) =>
        this.handlePurchase(price, lottoBundle),
    });

    if (!this.state.isPurchased) return;

    new LottoList(document.querySelector("#lotto-list"), {
      lottoBundle: this.state.lottoBundle,
    });

    new WinningNumbersForm(document.querySelector("#winning-numbers-form"), {
      onModalOpen: () => this.handleModalOpen(),
      setWinningNumbers: (winningNumbers) => this.setState({ winningNumbers }),
      setBonusNumber: (bonusNumber) => this.setState({ bonusNumber }),
    });

    if (this.state.isModalOpen) {
      new ResultModal(document.querySelector("#modal-root"), {
        isOpen: this.state.isModalOpen,
        onClose: () => this.handleModalClose(),
        price: this.state.price,
        lottoBundle: this.state.lottoBundle,
        winningNumbers: this.state.winningNumbers,
        bonusNumber: this.state.bonusNumber,
      });
    }
  }
}

export default LottoGame;
