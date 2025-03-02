import Component from "../core/Component.js";
import "./modal.css";

class Modal extends Component {
  static SELECTOR = {
    MODAL: ".modal",
    MODAL_CLOSE_BUTTON: ".modal__close-button",
    MODAL_CONTENT: ".modal__content",
  };

  setup() {
    this.events = {
      [`click@${Modal.SELECTOR.MODAL}`]: this.handleClose.bind(this),
      [`click@${Modal.SELECTOR.MODAL_CLOSE_BUTTON}`]:
        this.handleClose.bind(this),
      [`click@${Modal.SELECTOR.MODAL_CONTENT}`]: ((event) => {
        event.stopPropagation();
      }).bind(this),
    };
  }

  handleClose() {
    this.props.onClose();
  }

  template() {
    return `
      <div class="${Modal.SELECTOR.MODAL.slice(1)}">
        <div class="${Modal.SELECTOR.MODAL_CONTENT.slice(1)}">
            <button class="${Modal.SELECTOR.MODAL_CLOSE_BUTTON.slice(
              1
            )}">X</button>
            ${this.content()} 
        </div>
      </div>
    `;
  }

  content() {
    return "";
  }
}

export default Modal;
