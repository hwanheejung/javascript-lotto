import Component from "./Component.js";
import LottoForm from "./LottoForm.js";
import LottoList from "./LottoList.js";

class LottoGame extends Component {
  setup() {
    this.state = {
      isPurchased: false,
      lottoBundle: [],
    };
  }

  handlePurchase(lottoBundle) {
    this.setState({ isPurchased: true, lottoBundle });
  }

  template() {
    return `
      <section id="lotto-game">
        <h2 class="text-title">🎱 내 번호 당첨 확인 🎱</h2>
        <div id="lotto-form" class="text-body"></div>
        <div id="lotto-list" class="text-body"></div>
        <div id="winning-numbers-form"></div>
      </section>
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
      //   new WinningNumbersForm(document.querySelector("#winning-numbers-form"));
    }
  }
}

export default LottoGame;
