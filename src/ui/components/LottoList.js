import Component from "./Component.js";

class LottoList extends Component {
  template() {
    return `
      <h2>총 ${this.props.lottoBundle.size()}개를 구매했습니다.</h2>
      <ul>
        ${this.props.lottoBundle
          .getLottos()
          .map(
            (lotto) => `
              <li class="lotto-list__item">
                <span>🎟️</span>
                <span>${lotto.getNumbers()}</span>
              </li>
            `,
          )
          .join("")}
      </ul>
    `;
  }
}

export default LottoList;
