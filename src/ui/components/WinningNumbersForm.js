import { Lotto, LottoNumber } from "../../constants/rules.js";
import Component from "./Component.js";

class WinningNumbersForm extends Component {
  setup() {
    this.state = {
      winningNumbers: Array(Lotto.SIZE).fill(""),
      bonusNumber: "",
    };
    this.events = {
      "click@.open-result-button": this.openResult,
      "input@.winning-numbers__input": this.handleInput,
    };
  }

  openResult() {
    const { setWinningNumbers, setBonusNumber } = this.props;
    const { winningNumbers, bonusNumber } = this.state;

    setWinningNumbers(winningNumbers.map(Number));
    setBonusNumber(Number(bonusNumber));

    this.props.onModalOpen();
  }

  handleInput(event) {
    const { value, dataset } = event.target;
    const index = dataset.index ? Number(dataset.index) : null;

    if (index !== null) {
      const updatedWinningNumbers = [...this.state.winningNumbers];
      updatedWinningNumbers[index] = value;
      this.setState({ winningNumbers: updatedWinningNumbers });
    } else {
      this.setState({ bonusNumber: value });
    }
  }

  template() {
    return `
        <p class="winning-numbers__title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <div>
            <div class="winning-numbers winning-numbers__main">
                <span>당첨 번호</span>  
                <div>
                ${Array.from({ length: Lotto.SIZE }, (_, index) => {
                  return `
                    <input 
                        type="number" 
                        class="winning-numbers__input" 
                        min="${LottoNumber.MIN}" 
                        max="${LottoNumber.MAX}" 
                        value="${this.state.winningNumbers[index] || ""}"
                        data-index="${index}"
                    />
                    `;
                }).join("")}
                </div>
            </div>

            <div class="winning-numbers winning-numbers__bonus">
                <span>보너스 번호</span>
                <div>
                    <input 
                        type="number" 
                        class="winning-numbers__input" 
                        min="${LottoNumber.MIN}" 
                        max="${LottoNumber.MAX}" 
                        value="${this.state.bonusNumber || ""}"
                    />
                </div>
            </div>
        </div>
        <button class="open-result-button">결과 확인하기</button>
    `;
  }
}

export default WinningNumbersForm;
