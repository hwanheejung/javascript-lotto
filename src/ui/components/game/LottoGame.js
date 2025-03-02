import { Lotto } from "../../../constants/rules.js";
import ResultModal from "../modal/ResultModal.js";
import Component from "../core/Component.js";
import LottoForm from "./LottoForm.js";
import LottoList from "./LottoList.js";
import WinningNumbersForm from "./WinningNumbersForm.js";
import "./game.css";

class LottoGame extends Component {
  static MESSAGE = {
    TITLE: "🎱 내 번호 당첨 확인 🎱",
  };

  setup() {
    this.state = {
      price: 0,
      lottoBundle: [],
      winningNumbers: Array(Lotto.SIZE).fill(""),
      bonusNumber: "",
      opened: false,
    };

    this.watchState("price", this.renderLottoUI.bind(this));
    this.watchState("opened", this.toggleModal.bind(this));
  }

  setOpened(openModal) {
    this.setState({ opened: openModal });
  }

  resetGame() {
    this.initialRender();
  }

  template() {
    return `
      <section id="lotto-game">
        <h2 class="text-title">${LottoGame.MESSAGE.TITLE}</h2>
        <div id="lotto-form"></div>
        <div id="lotto-list"></div>
        <div id="winning-numbers-form"></div>
      </section>
      <div id="modal-root"></div>
    `;
  }

  componentDidMount() {
    new LottoForm(document.querySelector("#lotto-form"), {
      onPurchase: (price, lottoBundle) => this.setState({ price, lottoBundle }),
    });
  }

  renderLottoUI() {
    new LottoList(document.querySelector("#lotto-list"), {
      lottoBundle: this.state.lottoBundle,
    });
    new WinningNumbersForm(document.querySelector("#winning-numbers-form"), {
      onModalOpen: () => this.setOpened(true),
      setWinningNumbers: (winningNumbers) => this.setState({ winningNumbers }),
      setBonusNumber: (bonusNumber) => this.setState({ bonusNumber }),
    });
  }

  toggleModal() {
    const modalRoot = document.querySelector("#modal-root");
    if (this.state.opened) {
      new ResultModal(modalRoot, {
        onClose: () => this.setState({ opened: false }),
        onRestart: () => this.resetGame(),
        price: this.state.price,
        lottoBundle: this.state.lottoBundle,
        winningNumbers: this.state.winningNumbers,
        bonusNumber: this.state.bonusNumber,
      });
      return;
    }
    modalRoot.innerHTML = "";
  }
}

export default LottoGame;
