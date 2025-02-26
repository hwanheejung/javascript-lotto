class Component {
  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.events = {};
    this.changedKeys = new Set();

    this.setup();
    this.render();
    this.componentDidMount();
  }

  /** 초기 상태 설정 */
  setup() {}

  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate(changedKeys) {}
  componentWillUnmount() {}

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
  bindEvents() {
    Object.keys(this.events || {}).forEach((eventKey) => {
      const [eventType, selector] = eventKey.split("@");
      const callback = this.events[eventKey].bind(this);

      this.$target.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(eventType, callback);
      });
    });
  }

  /** UI 템플릿 */
  template() {
    return "";
  }

  /** 기존 DOM 제거 */
  unmount() {
    this.componentWillUnmount();
    this.$target.innerHTML = "";
  }

  /** 렌더링 */
  render() {
    this.$target.innerHTML = this.template();
    this.bindEvents();
  }
}

export default Component;
