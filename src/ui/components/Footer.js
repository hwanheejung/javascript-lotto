import Component from "./Component.js";

const Copyright = {
  YEAR: new Date().getFullYear(),
  OWNER: "woowacourse",
};

class Footer extends Component {
  template() {
    return `
      <p>Copyright ${Copyright.YEAR}. ${Copyright.OWNER}</p>
    `;
  }
}

export default Footer;
