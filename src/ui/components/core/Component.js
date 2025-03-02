class Component {
  target;
  props;
  state = {};
  events = {};
  changedKeys = new Set();

  constructor($target, props = {}) {
    this.target = $target;
    this.props = props;

    this.setup();
    this.initialRender();
  }

  /** 초기 상태 설정 */
  setup() {}

  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate(changedKeys) {}

  setState(newState) {
    this.componentWillUpdate();
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };

    // 변경된 state 키 찾기
    this.changedKeys.clear();
    Object.keys(newState).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        this.changedKeys.add(key);
      }
    });

    this.componentDidUpdate([...this.changedKeys]); // 변경된 state 목록 전달
  }

  /** 이벤트 등록 */
  #bindEvents() {
    Object.keys(this.events || {}).forEach((eventKey) => {
      const [eventType, selector] = eventKey.split("@");
      const callback = this.events[eventKey];

      this.target.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(eventType, callback);
      });
    });
  }

  /** UI 템플릿 */
  template() {
    return "";
  }

  /** 초기 렌더링 */
  initialRender() {
    this.target.innerHTML = this.template();
    this.#bindEvents();
    this.componentDidMount();
  }
}

export default Component;
