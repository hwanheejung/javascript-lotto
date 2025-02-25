import lottoService from "../../app/lottoService.js";
import Component from "./Component.js";

class LottoForm extends Component {
  setup() {
    this.events = {
      "submit@form": this.handleSubmit,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const price = Number(event.target.price.value);

    // TODO: validation

    const lottoBundle = lottoService.generateLottoBundle(price);
    this.props.onPurchase(price, lottoBundle);
  }

  template() {
    return `
      <form class="lotto-form" method="post">
        <label for="price">구입할 금액을 입력해주세요.</label>
        <div>
          <input 
            type="number" 
            id="price" 
            name="price"
            placeholder="금액" 
          />
          <button type="submit">구입</button>
        </div>
      </form>
    `;
  }
}

export default LottoForm;
