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
        <header id="header" class="text-title"></header>
        <main id="main" class="text-body"></main>
        <footer id="footer" class="text-caption"></footer>
      `;
  }

  componentDidMount() {
    new Header(document.querySelector("#header"));
    new LottoGame(document.querySelector("#main"));
    new Footer(document.querySelector("#footer"));
  }
}

export default App;
