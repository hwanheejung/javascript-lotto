import lottoService from "../../app/lottoService.js";
import useUIValidation from "../useUIValidation.js";
import Component from "./Component.js";

const LABEL = "구입할 금액을 입력해주세요.";
const PLACEHOLDER = "금액";
const BUTTON = "구입";

class LottoForm extends Component {
  setup() {
    this.events = {
      "submit@form": this.handleSubmit,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const { validatePrice } = useUIValidation();
    const price = validatePrice(event.target.price.value);
    if (!price) return;

    const lottoBundle = lottoService.generateLottoBundle(price);
    this.props.onPurchase(price, lottoBundle);
  }

  template() {
    return `
      <form class="lotto-form" method="post">
        <label for="price">${LABEL}</label>
        <div>
          <input 
            type="number" 
            id="price" 
            name="price"
            placeholder="${PLACEHOLDER}" 
          />
          <button type="submit">${BUTTON}</button>
        </div>
      </form>
    `;
  }
}

export default LottoForm;
