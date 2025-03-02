import lottoService from "../../../app/lottoService.js";
import useUIValidation from "../../useUIValidation.js";
import Component from "../core/Component.js";

class LottoForm extends Component {
  static LABEL = "구입할 금액을 입력해주세요.";
  static PLACEHOLDER = "금액";
  static BUTTON = "구입";

  setup() {
    this.events = {
      "submit@form": this.submit,
      "input@#price": this.activateButton,
    };
  }

  submit(event) {
    event.preventDefault();
    const { validatePrice } = useUIValidation();
    const price = validatePrice(event.target.price.value);
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
      <form class="lotto-form" method="post">
        <label for="price">${LottoForm.LABEL}</label>
        <div>
          <input 
            type="number" 
            id="price" 
            name="price"
            placeholder="${LottoForm.PLACEHOLDER}" 
          />
          <button type="submit" class="button" disabled>${LottoForm.BUTTON}</button>
        </div>
      </form>
    `;
  }
}

export default LottoForm;
