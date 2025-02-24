import Component from "./Component";

class Header extends Component {
  setup() {
    this.state = { title: "🎱 행운의 로또" };
  }

  template() {
    return `
        <h1>${this.state.title}</h1>
    `;
  }
}

export default Header;
