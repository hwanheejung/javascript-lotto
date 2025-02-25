import Modal from "./Modal.js";

class ResultModal extends Modal {
  constructor($target, props) {
    super($target, props);
  }

  content() {
    return ` 
        <h2 class="modal__title">🏆 당첨 통계 🏆</h2>
        <div class="modal__result">
            
        </div>
        `;
  }
}

export default ResultModal;
