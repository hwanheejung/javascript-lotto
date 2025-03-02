import { Lotto, LottoNumber } from "../../../constants/rules.js";
import useUIValidation from "../../useUIValidation.js";
import Component from "../core/Component.js";

class WinningNumbersForm extends Component {
  static TITLE = "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";
  static WINNING_NUMBERS = "당첨 번호";
  static BONUS_NUMBER = "보너스 번호";
  static CHECK_RESULT = "결과 확인하기";

  setup() {
    this.events = {
      "click@.open-result-button": this.openResult,
      "input@.winning-numbers__input": this.activateButton,
    };
  }

  openResult(event) {
    if (event.target.disabled) return;

    const { setWinningNumbers, setBonusNumber, onModalOpen } = this.props;
    const _winningNumbers = Array.from(
      this.target.querySelectorAll(".winning-numbers__input[data-index]"),
      (input) => input.value
    ).join(",");

    const _bonusNumber = this.target.querySelector(
      ".winning-numbers__bonus input"
    ).value;

    const { validateWinningNumbers, validateBonusNumber } = useUIValidation();
    const winningNumbers = validateWinningNumbers(_winningNumbers);
    if (!winningNumbers) return;
    const bonusNumber = validateBonusNumber(_bonusNumber, winningNumbers);
    if (!bonusNumber) return;

    setWinningNumbers(winningNumbers);
    setBonusNumber(bonusNumber);
    onModalOpen();
  }

  activateButton() {
    const winningInputs = this.target.querySelectorAll(
      ".winning-numbers__input[data-index]"
    );
    const bonusInput = this.target.querySelector(
      ".winning-numbers__bonus input"
    );
    const isAllFilled = Array.from(winningInputs).every((input) => input.value);
    const isBonusFilled = bonusInput.value;

    if (isAllFilled && isBonusFilled) {
      this.target.querySelector(".open-result-button").disabled = false;
    } else {
      this.target.querySelector(".open-result-button").disabled = true;
    }
  }

  template() {
    return `
        <p class="winning-numbers__title">${WinningNumbersForm.TITLE}</p>
        <div>
          <div class="winning-numbers winning-numbers__main">
            <span>${WinningNumbersForm.WINNING_NUMBERS}</span>  
            <div>
            ${Array.from({ length: Lotto.SIZE }, (_, index) => {
              return `
                <input 
                  type="number" 
                  name="winning-number"
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
            <span>${WinningNumbersForm.BONUS_NUMBER}</span>
            <div>
              <input 
                type="number" 
                name="bonus-number"
                class="winning-numbers__input" 
                min="${LottoNumber.MIN}" 
                max="${LottoNumber.MAX}" 
              />
            </div>
          </div>
        </div>
        <button class="open-result-button button" disabled>${
          WinningNumbersForm.CHECK_RESULT
        }</button>
    `;
  }
}

export default WinningNumbersForm;
