import Component from "./core/Component";

const TITLE = "🎱 행운의 로또";

class Header extends Component {
  template() {
    return `
        <h1>${TITLE}</h1>
    `;
  }
}

export default Header;
