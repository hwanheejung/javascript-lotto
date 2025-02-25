class Component {
  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.events = {};

    this.setup();
    this.render();
    this.componentDidMount();
  }

  /** 초기 상태 설정 */
  setup() {}

  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  setState(newState) {
    this.componentWillUpdate();

    if (typeof newState === "function") {
      this.state = { ...this.state, ...newState(this.state) };
    } else {
      this.state = { ...this.state, ...newState };
    }

    this.unmount(); // 기존 DOM 제거
    this.render(); // 새로운 상태로 다시 렌더링
    this.componentDidUpdate();
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
    this.mounted();
  }

  /** 자식 컴포넌트 마운트 */
  mounted() {}
}

export default Component;
