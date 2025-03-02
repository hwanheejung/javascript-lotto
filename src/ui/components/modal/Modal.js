import Component from "../core/Component.js";
import "./modal.css";

class Modal extends Component {
  setup() {
    this.events = {
      "click@.modal": this.handleClose,
      "click@.modal__close-button": this.handleClose,
      "click@.modal__content": (event) => {
        event.stopPropagation();
      },
    };
  }

  handleClose() {
    this.props.onClose();
  }

  template() {
    return `
      <div class="modal">
        <div class="modal__content">
            <button class="modal__close-button">X</button>
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
