import Component from "./Component.js";
import LottoForm from "./LottoForm.js";
import LottoList from "./LottoList.js";
import ResultModal from "./ResultModal.js";
import WinningNumbersForm from "./WinningNumbersForm.js";

class LottoGame extends Component {
  setup() {
    this.state = {
      isPurchased: false,
      lottoBundle: [],
      isModalOpen: false,
    };
  }

  handlePurchase(lottoBundle) {
    this.setState({ isPurchased: true, lottoBundle });
  }

  handleModalOpen() {
    this.setState({ isModalOpen: true });
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  template() {
    return `
      <section id="lotto-game" class="text-body">
        <h2 class="text-title">🎱 내 번호 당첨 확인 🎱</h2>
        <div id="lotto-form"></div>
        <div id="lotto-list"></div>
        <div id="winning-numbers-form"></div>
      </section>
      <div id="modal-root"></div>
    `;
  }

  mounted() {
    new LottoForm(document.querySelector("#lotto-form"), {
      onPurchase: (lottoBundle) => this.handlePurchase(lottoBundle),
    });

    if (this.state.isPurchased) {
      new LottoList(document.querySelector("#lotto-list"), {
        lottoBundle: this.state.lottoBundle,
      });
      new WinningNumbersForm(document.querySelector("#winning-numbers-form"), {
        onModalOpen: () => this.handleModalOpen(),
      });
    }
    new ResultModal(document.querySelector("#modal-root"), {
      isOpen: this.state.isModalOpen,
      onClose: () => this.handleModalClose(),
    });
  }
}

export default LottoGame;
