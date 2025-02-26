# Step 2

### 📌 주요 변경 사항

- Step 1에만 필요한 파일은 console 폴더에, Step 2에만 필요한 파일은 ui 폴더에 위치

### 📌 About

- React의 Component 패턴을 구현하여 UI를 관리합니다.
- React의 setState, componentDidMount, componentDidUpdate 등의 라이프사이클 메서드를 모방하여 상태 기반 UI 업데이트가 가능합니다.

### 🏗 컴포넌트 구조

- 상태 관리 `setState(newState)`

  - `setState(newState)` 호출 시, 이전 state와 비교하여 변경된 state 키만 추적
  - 변경된 state 목록(`changedKeys`)을 `componentDidUpdate(changedKeys)`에 전달
  - 이를 기반으로 변경된 state에 따라 필요한 부분만 렌더링

- 라이프사이클 메서드 지원

  - `componentDidMount()`: 초기 렌더링 후 실행됨
  - `componentDidUpdate(changedKeys)`: setState() 호출 후, 변경된 state 목록을 기반으로 실행됨
  - `componentWillUnmount()`: 컴포넌트가 제거될 때 실행됨

- 이벤트 핸들링 시스템
  - events 객체를 사용하여 이벤트를 자동으로 등록
  - `"eventType@selector": handler` 형식으로 선언
  - `bindEvents()`에서 `querySelectorAll(selector)`로 해당하는 모든 요소에 이벤트 바인딩

## 🎯 UI 상태 관리 패턴 정리

### 🚀 목표

- React의 Component 패턴을 도입하여 상태 기반 UI 업데이트가 가능하도록 구현
- 가상 DOM 없이도 불필요한 렌더링을 최소화하는 방법을 고민

### 🔍 적용한 해결 방법

#### ❌ 기존 문제: setState() 호출 시 전체가 리렌더링됨

- React에서는 Virtual DOM + Diffing 알고리즘을 통해 변경된 부분만 업데이트
- 하지만 이 구현에서는 가상 DOM 없이 this.render()를 호출하면 모든 UI가 다시 그려짐
- 이로 인해 input이 초기화되는 문제 발생 (ex: 숫자 입력 후 모달이 열리면 입력값이 초기화됨)

#### ✅ 최종 해결: 변경된 state에 따라 필요한 부분만 직접 렌더링

- setState() 호출 시, 변경된 state 목록(changedKeys)을 추적
- `componentDidUpdate(changedKeys)`를 활용해 바뀐 state에 따라 필요한 부분만 업데이트
- 전체 `render()`를 다시 실행하지 않고, 해당되는 UI 부분만 직접 갱신
- 특정 DOM 요소에만 새 인스턴스를 주입하여 필요한 컴포넌트만 렌더링

#### ✅ Example

1️⃣ **`setState({ price })` 호출 시**  
→ `changedKeys.includes("price")` 확인 후  
→ `renderLottoList()`, `renderWinningNumbersForm()` 실행  
→ 해당되는 부분만 갱신, 전체 렌더링 X

2️⃣ **`setState({ isModalOpen: true })` 호출 시**  
→ `changedKeys.includes("isModalOpen")` 확인 후  
→ `renderResultModal()` 실행  
→ 모달 부분만 렌더링

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
