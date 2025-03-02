import "./styles/reset.css";
import "./styles/global.css";
import "./styles/layout.css";
import Component from "./components/core/Component.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import LottoGame from "./components/game/LottoGame.js";

class App extends Component {
  template() {
    return `
        ${Header()}
        <main id="main" class="text-body"></main>
        ${Footer()}
      `;
  }

  componentDidMount() {
    new LottoGame(document.querySelector("#main"));
  }
}

export default App;
