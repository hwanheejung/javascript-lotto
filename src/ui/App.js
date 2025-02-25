import "./styles/global.css";
import "./styles/index.css";
import "./styles/reset.css";
import Component from "./components/Component.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import LottoGame from "./components/LottoGame.js";

class App extends Component {
  template() {
    return `
        <header id="header" class="text-title"></header>
        <main id="main" class="text-body"></main>
        <footer id="footer" class="text-caption"></footer>
      `;
  }

  mounted() {
    new Header(document.querySelector("#header"));
    new LottoGame(document.querySelector("#main"));
    new Footer(document.querySelector("#footer"));
  }
}

export default App;
