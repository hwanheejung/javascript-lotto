import { Lotto, LottoNumber } from "../../constants/rules.js";
import Component from "./Component.js";

class WinningNumbersForm extends Component {
  setup() {
    this.events = {
      "click@.open-result-button": this.openResult,
    };
  }

  openResult() {
    const { setWinningNumbers, setBonusNumber, onModalOpen } = this.props;
    const winningNumbers = Array.from(
      this.$target.querySelectorAll(".winning-numbers__input[data-index]"),
      (input) => Number(input.value),
    );

    const bonusNumber = Number(
      this.$target.querySelector(".winning-numbers__bonus input").value,
    );

    setWinningNumbers(winningNumbers);
    setBonusNumber(bonusNumber);
    onModalOpen();
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
                    />
                </div>
            </div>
        </div>
        <button class="open-result-button">결과 확인하기</button>
    `;
  }
}

export default WinningNumbersForm;
