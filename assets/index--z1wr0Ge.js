var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _numbers, _Lotto_instances, validate_fn, _lottos, _winningLotto, _bonusNumber, _WinningLotto_instances, getRank_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Component {
  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.events = {};
    this.changedKeys = /* @__PURE__ */ new Set();
    this.setup();
    this.initialRender();
  }
  /** 초기 상태 설정 */
  setup() {
  }
  componentDidMount() {
  }
  componentWillUpdate() {
  }
  componentDidUpdate(changedKeys) {
  }
  componentWillUnmount() {
  }
  setState(newState) {
    this.componentWillUpdate();
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.changedKeys.clear();
    Object.keys(newState).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        this.changedKeys.add(key);
      }
    });
    this.componentDidUpdate([...this.changedKeys]);
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
  /** 초기 렌더링 */
  initialRender() {
    this.$target.innerHTML = this.template();
    this.bindEvents();
    this.componentDidMount();
  }
}
const Copyright = {
  YEAR: (/* @__PURE__ */ new Date()).getFullYear(),
  OWNER: "woowacourse"
};
class Footer extends Component {
  template() {
    return `
      <p>Copyright ${Copyright.YEAR}. ${Copyright.OWNER}</p>
    `;
  }
}
const TITLE$3 = "🎱 행운의 로또";
class Header extends Component {
  template() {
    return `
        <h1>${TITLE$3}</h1>
    `;
  }
}
const LottoShop = {
  PRICE_UNIT: 1e3,
  MIN_PURCHASE_AMOUNT: 1e3,
  MAX_PURCHASE_AMOUNT: 1e5
};
const LottoNumber = {
  MIN: 1,
  MAX: 45
};
const Lotto$1 = {
  SIZE: 6
};
const VALID_RESTART_INPUTS = ["y", "n"];
const PrizeKeys = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH"
};
const PRIZE = {
  [PrizeKeys.FIRST]: {
    RANK: 1,
    WINNING_CRITERIA: 6,
    REWARD: 2e9
  },
  [PrizeKeys.SECOND]: {
    RANK: 2,
    WINNING_CRITERIA: 5,
    BONUS_MATCHED: true,
    REWARD: 3e7
  },
  [PrizeKeys.THIRD]: {
    RANK: 3,
    WINNING_CRITERIA: 5,
    REWARD: 15e5
  },
  [PrizeKeys.FOURTH]: {
    RANK: 4,
    WINNING_CRITERIA: 4,
    REWARD: 5e4
  },
  [PrizeKeys.FIFTH]: {
    RANK: 5,
    WINNING_CRITERIA: 3,
    REWARD: 5e3
  }
};
const pickUniqueNumbers = (range, count) => {
  const randomNumbers = /* @__PURE__ */ new Set();
  while (randomNumbers.size < count) {
    randomNumbers.add(
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    );
  }
  return Array.from(randomNumbers).sort((a, b) => a - b);
};
const ERROR_MESSAGE = {
  INVALID_NUMBER: "숫자를 입력해주세요.",
  INVALID_LOTTO_PRICE_UNIT: `${LottoShop.PRICE_UNIT}원 단위로 입력해주세요.`,
  INVALID_PRICE_RANGE: `${LottoShop.MIN_PURCHASE_AMOUNT}원 이상 ${LottoShop.MAX_PURCHASE_AMOUNT / 1e4}만원 이하로 입력해주세요.`,
  INVALID_LOTTO_NUMBER_RANGE: `${LottoNumber.MIN}부터 ${LottoNumber.MAX} 사이의 숫자를 입력해주세요.`,
  INVALID_LOTTO_NUMBER_LENGTH: `${Lotto$1.SIZE}개의 숫자를 입력해주세요.`,
  INVALID_LOTTO_DUPLICATE_NUMBER: "중복된 숫자가 있습니다.",
  INVALID_BONUS_NUMBER: "당첨 번호와 중복되지 않는 숫자를 입력해주세요.",
  INVALID_RESTART_FORMAT: "y 또는 n을 입력해주세요."
};
const validateNumber = (input) => {
  if (!/^\d+$/.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
  }
};
const validateLottoPriceUnit = (input) => {
  if (input % LottoShop.PRICE_UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
  }
};
const validatePriceRange = (input) => {
  if (input < LottoShop.MIN_PURCHASE_AMOUNT || input > LottoShop.MAX_PURCHASE_AMOUNT) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_RANGE);
  }
};
const validateLottoLength = (numbers) => {
  if (numbers.length !== Lotto$1.SIZE) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH);
  }
};
const validateLottoRange = (numbers) => {
  if (numbers.some((num) => num < LottoNumber.MIN || num > LottoNumber.MAX)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};
const validateUniqueLottoNumbers = (numbers) => {
  if (new Set(numbers).size !== 6) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER);
  }
};
const validateUniqueBonusNumber = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER);
  }
};
const validateRestartInput = (input) => {
  const lowered = input.trim().toLowerCase();
  if (!VALID_RESTART_INPUTS.includes(lowered)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);
  }
};
class Lotto {
  constructor(numbers) {
    __privateAdd(this, _Lotto_instances);
    __privateAdd(this, _numbers);
    __privateMethod(this, _Lotto_instances, validate_fn).call(this, numbers);
    __privateSet(this, _numbers, numbers.sort((a, b) => a - b));
  }
  getNumbers() {
    return [...__privateGet(this, _numbers)];
  }
  matchCount(numbers) {
    return __privateGet(this, _numbers).filter((num) => numbers.includes(num)).length;
  }
  has(number) {
    return __privateGet(this, _numbers).includes(number);
  }
}
_numbers = new WeakMap();
_Lotto_instances = new WeakSet();
validate_fn = function(numbers) {
  validateLottoLength(numbers);
  validateLottoRange(numbers);
  validateUniqueLottoNumbers(numbers);
};
class LottoBundle {
  constructor(count) {
    __privateAdd(this, _lottos);
    __privateSet(this, _lottos, Array.from(
      { length: count },
      () => new Lotto(pickUniqueNumbers({ min: 1, max: 45 }, 6))
    ));
  }
  /**
   * 구매한 로또 개수 반환
   */
  size() {
    return __privateGet(this, _lottos).length;
  }
  /**
   * 모든 로또 반환
   */
  getLottos() {
    return [...__privateGet(this, _lottos)];
  }
}
_lottos = new WeakMap();
class WinningLotto {
  constructor(winningNumbers, bonusNumber) {
    __privateAdd(this, _WinningLotto_instances);
    __privateAdd(this, _winningLotto);
    __privateAdd(this, _bonusNumber);
    __privateSet(this, _winningLotto, new Lotto(winningNumbers));
    validateUniqueBonusNumber(bonusNumber, winningNumbers);
    __privateSet(this, _bonusNumber, bonusNumber);
  }
  evaluate(lotto) {
    const matchCount = lotto.matchCount(__privateGet(this, _winningLotto).getNumbers());
    const isBonusMatched = lotto.has(__privateGet(this, _bonusNumber));
    return __privateMethod(this, _WinningLotto_instances, getRank_fn).call(this, matchCount, isBonusMatched);
  }
}
_winningLotto = new WeakMap();
_bonusNumber = new WeakMap();
_WinningLotto_instances = new WeakSet();
getRank_fn = function(matchCount, isBonusMatched) {
  return Object.values(PRIZE).find(
    ({ WINNING_CRITERIA, BONUS_MATCHED }) => WINNING_CRITERIA === matchCount && (BONUS_MATCHED === void 0 || BONUS_MATCHED === isBonusMatched)
  ) || null;
};
const lottoService = {
  /**
   * 로또를 생성하는 서비스
   */
  generateLottoBundle(price) {
    return new LottoBundle(price / 1e3);
  },
  /**
   * 당첨 결과를 계산하는 서비스
   */
  evaluateResults(lottoBundle, winningNumbers, bonusNumber) {
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const results = lottoBundle.getLottos().map((lotto) => winningLotto.evaluate(lotto));
    const resultCount = this.countResults(results);
    const formattedResults = this.formatResults(resultCount);
    const totalReward = this.calculateTotalReward(formattedResults);
    return { formattedResults, totalReward };
  },
  /**
   * 당첨 개수를 세는 함수
   */
  countResults(results) {
    const resultCount = new Array(6).fill(0);
    results.forEach((rank) => {
      if (rank) resultCount[rank.RANK]++;
    });
    return resultCount;
  },
  /**
   * 당첨 결과를 포맷하는 함수
   */
  formatResults(resultCount) {
    return Object.entries(PRIZE).map(
      ([key, { WINNING_CRITERIA, REWARD }], index) => ({
        rank: key,
        // "FIFTH", "FOURTH"...
        winningCriteria: WINNING_CRITERIA,
        // 당첨 조건으로 필요한 숫자 개수
        reward: REWARD,
        // 당첨 금액
        count: resultCount[index + 1] || 0
        // 당첨된 개수 (없으면 0)
      })
    );
  },
  /**
   * 총 당첨금 계산
   */
  calculateTotalReward(formattedResults) {
    return formattedResults.reduce(
      (total, { count, reward }) => total + count * reward,
      0
    );
  }
};
const commaizeNumber = (number) => Number(number).toLocaleString("ko-KR");
class Modal extends Component {
  setup() {
    this.events = {
      "click@.modal": this.close,
      "click@.modal__close-button": this.close,
      "click@.modal__content": (event) => {
        event.stopPropagation();
      }
    };
  }
  close() {
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
const TITLE$2 = "🏆 당첨 통계 🏆";
const TABLE = {
  WINNING_CRITERIA: "일치 개수",
  REWARD: "당첨금",
  COUNT: "당첨 개수"
};
const RESTART = "다시 시작하기";
class ResultModal extends Modal {
  constructor($target, props) {
    super($target, props);
  }
  setup() {
    super.setup();
    this.events = {
      ...this.events,
      "click@.modal__restart": this.handleClickRestart
    };
  }
  calculateProfitRate(totalReward) {
    const { price } = this.props;
    return (totalReward - price) / price * 100;
  }
  handleClickRestart() {
    this.props.onRestart();
  }
  content() {
    const { lottoBundle, winningNumbers, bonusNumber } = this.props;
    const { formattedResults, totalReward } = lottoService.evaluateResults(
      lottoBundle,
      winningNumbers,
      bonusNumber
    );
    return ` 
        <h2 class="modal__title text-subtitle">${TITLE$2}</h2>
        <div class="modal__result">
            <table class="modal__table">
                <thead>
                    <tr>
                        <th>${TABLE.WINNING_CRITERIA}</th>
                        <th>${TABLE.REWARD}</th>
                        <th>${TABLE.COUNT}</th>
                    </tr>
                </thead>
                <tbody>
                    ${formattedResults.slice().reverse().map(
      ({ rank, winningCriteria, reward, count }) => `
                            <tr>
                                <td>${winningCriteria}개${rank === "SECOND" ? "+보너스볼" : ""}</td>
                                <td>${commaizeNumber(reward)}</td>
                                <td>${count}개</td>
                            </tr>
                          `
    ).join("")}
                </tbody>
            </table>
        </div>
        <p class="modal__profitRate">
          당신의 총 수익률은 ${this.calculateProfitRate(totalReward).toFixed(2)}%입니다.
        </p>
        <button class="modal__restart button">${RESTART}</button>
    `;
  }
}
const useValidation = (executeValidations2) => () => {
  return {
    validatePrice: (input) => executeValidations2(Number(input), [
      validateNumber,
      validateLottoPriceUnit,
      validatePriceRange
    ]),
    validateWinningNumbers: (input) => {
      const numbers = input.split(",").map(Number);
      return executeValidations2(numbers, [
        validateLottoLength,
        validateLottoRange,
        validateUniqueLottoNumbers
      ]);
    },
    validateBonusNumber: (bonusNumber, winningNumbers) => {
      const number = Number(bonusNumber);
      return executeValidations2(number, [
        (num) => validateLottoRange([num]),
        (num) => validateUniqueBonusNumber(num, winningNumbers)
      ]);
    },
    validateRestart: (input) => {
      const lowered = input.trim().toLowerCase();
      return executeValidations2(lowered, [validateRestartInput]) === "y";
    }
  };
};
const executeValidations = (input, rules) => {
  for (const rule of rules) {
    try {
      rule(input);
    } catch (error) {
      alert(error.message);
      return;
    }
  }
  return input;
};
const useUIValidation = useValidation(executeValidations);
const LABEL = "구입할 금액을 입력해주세요.";
const PLACEHOLDER = "금액";
const BUTTON = "구입";
class LottoForm extends Component {
  setup() {
    this.events = {
      "submit@form": this.handleSubmit,
      "input@#price": this.activateButton
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const { validatePrice } = useUIValidation();
    const price = validatePrice(event.target.price.value);
    if (!price) return;
    const lottoBundle = lottoService.generateLottoBundle(price);
    this.props.onPurchase(price, lottoBundle);
  }
  activateButton() {
    const price = this.$target.querySelector("#price").value;
    if (price.length < 4) {
      this.$target.querySelector("button").disabled = true;
    } else {
      this.$target.querySelector("button").disabled = false;
    }
  }
  template() {
    return `
      <form class="lotto-form" method="post">
        <label for="price">${LABEL}</label>
        <div>
          <input 
            type="number" 
            id="price" 
            name="price"
            placeholder="${PLACEHOLDER}" 
          />
          <button type="submit" class="button" disabled>${BUTTON}</button>
        </div>
      </form>
    `;
  }
}
class LottoList extends Component {
  template() {
    return `
      <p>총 ${this.props.lottoBundle.size()}개를 구매했습니다.</p>
      <ul>
        ${this.props.lottoBundle.getLottos().map(
      (lotto) => `
              <li class="lotto-list__item">
                <span>🎟️</span>
                <span>${lotto.getNumbers()}</span>
              </li>
            `
    ).join("")}
      </ul>
    `;
  }
}
const TITLE$1 = "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";
const WINNING_NUMBERS = "당첨 번호";
const BONUS_NUMBER = "보너스 번호";
const CHECK_RESULT = "결과 확인하기";
class WinningNumbersForm extends Component {
  setup() {
    this.events = {
      "click@.open-result-button": this.openResult,
      "input@.winning-numbers__input": this.activateButton
    };
  }
  openResult(event) {
    if (event.target.disabled) return;
    const { setWinningNumbers, setBonusNumber, onModalOpen } = this.props;
    const _winningNumbers = Array.from(
      this.$target.querySelectorAll(".winning-numbers__input[data-index]"),
      (input) => input.value
    ).join(",");
    const _bonusNumber2 = this.$target.querySelector(
      ".winning-numbers__bonus input"
    ).value;
    const { validateWinningNumbers, validateBonusNumber } = useUIValidation();
    const winningNumbers = validateWinningNumbers(_winningNumbers);
    if (!winningNumbers) return;
    const bonusNumber = validateBonusNumber(_bonusNumber2, winningNumbers);
    if (!bonusNumber) return;
    setWinningNumbers(winningNumbers);
    setBonusNumber(bonusNumber);
    onModalOpen();
  }
  activateButton() {
    const winningInputs = this.$target.querySelectorAll(
      ".winning-numbers__input[data-index]"
    );
    const bonusInput = this.$target.querySelector(
      ".winning-numbers__bonus input"
    );
    const isAllFilled = Array.from(winningInputs).every((input) => input.value);
    const isBonusFilled = bonusInput.value;
    if (isAllFilled && isBonusFilled) {
      this.$target.querySelector(".open-result-button").disabled = false;
    } else {
      this.$target.querySelector(".open-result-button").disabled = true;
    }
  }
  template() {
    return `
        <p class="winning-numbers__title">${TITLE$1}</p>
        <div>
          <div class="winning-numbers winning-numbers__main">
            <span>${WINNING_NUMBERS}</span>  
            <div>
            ${Array.from({ length: Lotto$1.SIZE }, (_, index) => {
      return `
                <input 
                  type="number" 
                  name="winning-number"
                  class="winning-numbers__input" 
                  min="${LottoNumber.MIN}" 
                  max="${LottoNumber.MAX}" 
                  data-index="${index}"
                />
                `;
    }).join("")}
            </div>
          </div>

          <div class="winning-numbers winning-numbers__bonus">
            <span>${BONUS_NUMBER}</span>
            <div>
              <input 
                type="number" 
                name="bonus-number"
                class="winning-numbers__input" 
                min="${LottoNumber.MIN}" 
                max="${LottoNumber.MAX}" 
              />
            </div>
          </div>
        </div>
        <button class="open-result-button button" disabled>${CHECK_RESULT}</button>
    `;
  }
}
const TITLE = "🎱 내 번호 당첨 확인 🎱";
class LottoGame extends Component {
  setup() {
    this.state = {
      price: 0,
      lottoBundle: [],
      winningNumbers: Array(Lotto$1.SIZE).fill(""),
      bonusNumber: "",
      isModalOpen: false
    };
  }
  setIsModalOpen(openModal) {
    this.setState({ isModalOpen: openModal });
  }
  resetGame() {
    this.initialRender();
  }
  template() {
    return `
      <section id="lotto-game">
        <h2 class="text-title">${TITLE}</h2>
        <div id="lotto-form"></div>
        <div id="lotto-list"></div>
        <div id="winning-numbers-form"></div>
      </section>
      <div id="modal-root"></div>
    `;
  }
  componentDidMount() {
    this.renderLottoForm();
  }
  componentDidUpdate(changedKeys) {
    if (changedKeys.includes("price")) {
      this.renderLottoList();
      this.renderWinningNumbersForm();
    }
    if (changedKeys.includes("isModalOpen")) {
      const modalRoot = document.querySelector("#modal-root");
      if (this.state.isModalOpen) {
        this.renderResultModal(modalRoot);
        return;
      }
      modalRoot.innerHTML = "";
    }
  }
  renderLottoForm() {
    new LottoForm(document.querySelector("#lotto-form"), {
      onPurchase: (price, lottoBundle) => this.setState({ price, lottoBundle })
    });
  }
  renderLottoList() {
    new LottoList(document.querySelector("#lotto-list"), {
      lottoBundle: this.state.lottoBundle
    });
  }
  renderWinningNumbersForm() {
    new WinningNumbersForm(document.querySelector("#winning-numbers-form"), {
      onModalOpen: () => this.setIsModalOpen(true),
      setWinningNumbers: (winningNumbers) => this.setState({ winningNumbers }),
      setBonusNumber: (bonusNumber) => this.setState({ bonusNumber })
    });
  }
  renderResultModal(modalRoot) {
    new ResultModal(modalRoot, {
      onClose: () => this.setState({ isModalOpen: false }),
      onRestart: () => this.resetGame(),
      price: this.state.price,
      lottoBundle: this.state.lottoBundle,
      winningNumbers: this.state.winningNumbers,
      bonusNumber: this.state.bonusNumber
    });
  }
}
class App extends Component {
  template() {
    return `
        <header id="header" class="text-title"></header>
        <main id="main" class="text-body"></main>
        <footer id="footer" class="text-caption"></footer>
      `;
  }
  componentDidMount() {
    new Header(document.querySelector("#header"));
    new LottoGame(document.querySelector("#main"));
    new Footer(document.querySelector("#footer"));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new App(document.querySelector("#app"));
});
