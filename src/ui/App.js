import Component from "./components/Component.js";
import Header from "./components/Header.js";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/index.css";
import Footer from "./components/Footer.js";

class App extends Component {
  template() {
    return `
        <header id="header" class="text-title"></header>
        <main id="main"></main>
        <footer id="footer" class="text-caption"></footer>
      `;
  }

  mounted() {
    new Header(document.querySelector("#header"));
    new Footer(document.querySelector("#footer"));
  }
}

export default App;
