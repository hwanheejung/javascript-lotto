import { Lotto, LottoNumber } from "../../../constants/rules.js";
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
    WINNING_NUMBERS_INPUT: "winning-numbers__input",
    OPEN_RESULT_BUTTON: "open-result-button",
  };

  setup() {
    this.events = {
      [`click@.${WinningNumbersForm.SELECTOR.OPEN_RESULT_BUTTON}`]:
        this.openResult.bind(this),
      [`input@.${WinningNumbersForm.SELECTOR.WINNING_NUMBERS_INPUT}`]:
        this.activateButton.bind(this),
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

    this.target.querySelector(".open-result-button").disabled = !(
      isAllFilled && isBonusFilled
    );
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
                  class="${WinningNumbersForm.SELECTOR.WINNING_NUMBERS_INPUT}" 
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
                class="winning-numbers__input" 
                min="${LottoNumber.MIN}" 
                max="${LottoNumber.MAX}" 
              />
            </div>
          </div>
        </div>
        <button class="${
          WinningNumbersForm.SELECTOR.OPEN_RESULT_BUTTON
        } button" disabled>${WinningNumbersForm.MESSAGE.CHECK_RESULT}</button>
    `;
  }
}

export default WinningNumbersForm;
