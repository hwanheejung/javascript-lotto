import Component from "./components/Component.js";
import Header from "./components/Header.js";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/index.css";

class App extends Component {
  template() {
    return `
        <header id="header" class="text-title"></header>
      `;
  }

  mounted() {
    new Header(document.querySelector("#header"));
  }
}

export default App;
