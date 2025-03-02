import { LottoNumber } from "../../../constants/rules.js";
import Lotto from "../../../domain/Lotto.js";
import useUIValidation from "../../useUIValidation.js";
import Component from "../core/Component.js";

class WinningNumbersForm extends Component {
  static MESSAGE = {
    TITLE: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
    WINNING_NUMBERS: "당첨 번호",
    BONUS_NUMBER: "보너스 번호",
    CHECK_RESULT: "결과 확인하기",
  };

  static SELECTOR = {
    NUMBER_INPUT: ".number__input",
    OPEN_RESULT_BUTTON: ".open-result-button",
    BONUS_INPUT: ".winning-numbers__bonus input",
    WINNING_INPUT: ".number__input[data-index]",
  };

  setup() {
    this.validation = useUIValidation();
    this.events = {
      [`click@${WinningNumbersForm.SELECTOR.OPEN_RESULT_BUTTON}`]:
        this.openResult.bind(this),
      [`input@${WinningNumbersForm.SELECTOR.NUMBER_INPUT}`]:
        this.activateButton.bind(this),
    };
  }

  openResult(event) {
    if (event.target.disabled) return;

    const { setWinningNumbers, setBonusNumber, onModalOpen } = this.props;
    const _winningNumbers = Array.from(
      this.target.querySelectorAll(WinningNumbersForm.SELECTOR.WINNING_INPUT),
      (input) => input.value
    ).join(",");

    const _bonusNumber = this.target.querySelector(
      WinningNumbersForm.SELECTOR.BONUS_INPUT
    ).value;

    const winningNumbers =
      this.validation.validateWinningNumbers(_winningNumbers);
    if (!winningNumbers) return;
    const bonusNumber = this.validation.validateBonusNumber(
      _bonusNumber,
      winningNumbers
    );
    if (!bonusNumber) return;

    setWinningNumbers(winningNumbers);
    setBonusNumber(bonusNumber);
    onModalOpen();
  }

  activateButton() {
    const winningInputs = this.target.querySelectorAll(
      WinningNumbersForm.SELECTOR.WINNING_INPUT
    );
    const bonusInput = this.target.querySelector(
      WinningNumbersForm.SELECTOR.BONUS_INPUT
    );
    const isAllFilled = Array.from(winningInputs).every((input) => input.value);
    const isBonusFilled = bonusInput.value;

    this.target.querySelector(
      WinningNumbersForm.SELECTOR.OPEN_RESULT_BUTTON
    ).disabled = !(isAllFilled && isBonusFilled);
  }

  template() {
    return `
        <p class="winning-numbers__title">${
          WinningNumbersForm.MESSAGE.TITLE
        }</p>
        <div>
          <div class="winning-numbers winning-numbers__main">
            <span>${WinningNumbersForm.MESSAGE.WINNING_NUMBERS}</span>  
            <div>
            ${Array.from({ length: Lotto.SIZE }, (_, index) => {
              return `
                <input 
                  type="number" 
                  name="winning-number"
                  class="${WinningNumbersForm.SELECTOR.NUMBER_INPUT.slice(1)}" 
                  min="${LottoNumber.MIN}" 
                  max="${LottoNumber.MAX}" 
                  data-index="${index}"
                />
                `;
            }).join("")}
            </div>
          </div>

          <div class="winning-numbers winning-numbers__bonus">
            <span>${WinningNumbersForm.MESSAGE.BONUS_NUMBER}</span>
            <div>
              <input 
                type="number" 
                name="bonus-number"
                class="${WinningNumbersForm.SELECTOR.NUMBER_INPUT.slice(1)}" 
                min="${LottoNumber.MIN}" 
                max="${LottoNumber.MAX}" 
              />
            </div>
          </div>
        </div>
        <button class="${WinningNumbersForm.SELECTOR.OPEN_RESULT_BUTTON.slice(
          1
        )} button" disabled>
        ${WinningNumbersForm.MESSAGE.CHECK_RESULT}
        </button>
    `;
  }
}

export default WinningNumbersForm;
