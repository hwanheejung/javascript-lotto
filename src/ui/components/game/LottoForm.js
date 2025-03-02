import lottoService from "../../../services/lottoService.js";
import useUIValidation from "../../useUIValidation.js";
import Component from "../core/Component.js";

class LottoForm extends Component {
  static MESSAGE = {
    LABEL: "구입할 금액을 입력해주세요.",
    PLACEHOLDER: "금액",
    BUTTON: "구입",
  };

  static SELECTOR = {
    FORM: "lotto-form",
    PRICE: "price",
  };

  setup() {
    this.validation = useUIValidation();
    this.events = {
      [`submit@.${LottoForm.SELECTOR.FORM}`]: this.submit.bind(this),
      [`input@#${LottoForm.SELECTOR.PRICE}`]: this.activateButton.bind(this),
    };
  }

  submit(event) {
    event.preventDefault();

    const price = this.validation.validatePrice(event.target.price.value);
    if (!price) return;

    const lottoBundle = lottoService.generateLottoBundle(price);
    this.props.onPurchase(price, lottoBundle);
  }

  activateButton() {
    const price = this.target.querySelector("#price").value;

    this.target.querySelector("button").disabled = price.length < 4;
  }

  template() {
    return `
      <form class="${LottoForm.SELECTOR.FORM}" method="post">
        <label for="price">${LottoForm.MESSAGE.LABEL}</label>
        <div>
          <input 
            type="number" 
            id="${LottoForm.SELECTOR.PRICE}" 
            name="price"
            placeholder="${LottoForm.MESSAGE.PLACEHOLDER}" 
          />
          <button type="submit" class="button" disabled>${LottoForm.MESSAGE.BUTTON}</button>
        </div>
      </form>
    `;
  }
}

export default LottoForm;
