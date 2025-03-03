# Step 2

### 📌 주요 변경 사항

- Step 1에만 필요한 파일은 console 폴더에, Step 2에만 필요한 파일은 ui 폴더에 위치

### 📌 About

- React의 setState, componentDidMount, componentDidUpdate 등의 라이프사이클 메서드를 모방하여 상태 기반 UI 업데이트가 가능합니다.

### 🏗 컴포넌트 구조

- 상태 관리 `setState(newState)`

  - `setState(newState)` 호출 시, 이전 state와 비교하여 변경된 state 키만 추적
  - 변경된 state 목록(`changedKeys`)을 `componentDidUpdate(changedKeys)`에 전달하여 필요한 부분만 업데이트

- 라이프사이클 메서드 지원

  - `componentDidMount()`: 초기 렌더링 후 실행됨
  - `componentDidUpdate(changedKeys)`: setState() 호출 후 변경된 state 목록을 기반으로 실행

- 이벤트 핸들링 시스템

  - events 객체를 사용하여 이벤트를 자동으로 등록
  - `"eventType@selector": handler` 형식으로 선언
  - `bindEvents()`에서 `querySelectorAll(selector)`로 해당하는 모든 요소에 이벤트 바인딩
  - usage:

  ```js
  this.events = {
    "submit@.lotto-form": this.submit.bind(this),
    "click@.modal__restart": this.handleRestart.bind(this),
  };
  ```

## 🎯 UI 상태 관리 패턴 정리

### 🚀 목표

- 가상 DOM 없이도 불필요한 렌더링을 최소화하는 방법을 고민

### ❌ 기존 문제: setState() 호출 시 전체가 리렌더링됨

- 초기 구현에서는 setState()를 호출하면 this.target.innerHTML = this.template()가 실행되며 전체 UI가 다시 렌더링
- 이로 인해 input이 초기화되는 문제 발생 (ex: 숫자 입력 후 모달이 열리면 입력값이 초기화됨)

### ✅ 최종 해결: state와 UI 업데이트 동작을 미리 연결하자!

#### 1. watchState()로 특정 state가 변경될 때 실행할 UI 업데이트 함수 등록

- 특정 state가 변경될 때 실행해야 하는 UI 업데이트 로직을 `#stateToUIMap`에 저장
- `setState()`가 실행되면 `componentDidUpdate([...this.#changedKeys]);`에서 변경된 state만 업데이트

```js
watchState(stateKey, callback) {
  this.#stateToUIMap[stateKey] = callback;
}
```

usage:

```js
setup() {
  this.state = {
    price: 0,
    lottoBundle: [],
    winningNumbers: Array(Lotto.SIZE).fill(""),
    bonusNumber: "",
    opened: false,
  };

  this.watchState("price", this.renderLottoUI.bind(this));
  this.watchState("opened", this.toggleModal.bind(this));
}
```

#### 2. 변경된 state에 따라 UI 업데이트 실행

```js
componentDidUpdate(changedKeys) {
  changedKeys.forEach((key) => {
    if (this.#stateToUIMap[key]) {
      this.#stateToUIMap[key](); // 등록된 UI 업데이트 함수 실행
    }
  });
}
```

- price가 변경되면 renderLottoList(), renderWinningNumbersForm()만 실행
- opened 상태가 변경되면 renderResultModal()만 실행

<br>
<br>

# Step 1

## 폴더 구조

```
src
├── step1-index.js          # 프로그램 실행 시작점
├── app                     # 애플리케이션 실행 및 컨트롤러
│   ├── startLottoGame.js     # 게임 실행 (컨트롤러 역할)
│   ├── lottoService.js       # 로또 구매 및 당첨 검증
├── domain                  # 핵심 도메인 로직
│   ├── Lotto.js              # 로또 한 장 (클래스)
│   ├── LottoBundle.js        # 여러 장의 로또 묶음 (클래스)
│   ├── WinningLotto.js       # 당첨 번호 (클래스)
├── validation              # 공통 유효성 검사 모듈
│   ├── validationRules.js    # 유효성 검사 규칙
├── utils                   # 유틸 함수
│   ├── commaizeNumber.js     # 숫자 포맷팅
│   ├── pickUniqueNumbers     # 랜덤 숫자 생성
├── view                    # UI 입출력
│   ├── input.js              # 사용자 입력 처리
│   ├── output.js             # 결과 출력 처리
│   ├── useValidation.js      # 선언적 검증 훅
│   ├── readLineAsync.js      # 비동기 입력 처리
│   ├── retryUntilValid.js    # 유효한 입력까지 반복
├── constants               # 상수 관리
│   ├── error.js              # 에러 메시지
│   ├── rules.js              # 가격 및 번호 범위 등의 규칙
│   ├── prize.js              # 당첨금
```

## 기능 요구 사항

1. [입력] 구입 금액을 입력받는다.
   - [x] 숫자여야 한다
   - [x] 1000원 단위로 입력한다.
   - [x] 1000원 이상 10만원 이하
2. 구입 금액만큼 로또를 발행한다.
   - [x] 1 ~ 45 사이의 숫자로 발행한다.
   - [x] 중복없이 숫자를 발행한다.
   - [x] 번호는 오름차순으로 정렬한다.
3. [입력] 당첨 번호를 입력한다.
   - [x] 1 ~ 45 사이의 숫자로 입력한다.
   - [x] 중복없이 숫자를 입력한다.
4. [입력] 보너스 번호를 입력받는다.
   - [x] 1 ~ 45 사이의 숫자로 입력한다.
   - [x] 입력한 당첨 번호와 중복되면 안된다.
5. 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
   - [x] 1 ~ 5등까지 계산한다. (일치 여부 확인)
   - ```
        1등: 6개 번호 일치 / 2,000,000,000원
        2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
        3등: 5개 번호 일치 / 1,500,000원
        4등: 4개 번호 일치 / 50,000원
        5등: 3개 번호 일치 / 5,000원
     ```
   - [x] (당첨된 전체 금액 / 구매 금액) \* 100
6. [입력] 재시작 여부를 입력받는다.
   - [x] Y/N으로 재시작 여부를 입력받는다.
   - [x] 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.

## 입력 공통

사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

### 당첨 출력 형식

```
당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.
```
