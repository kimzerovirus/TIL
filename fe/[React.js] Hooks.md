# React.js Hooks

> 리액트 hook은 클래스 컴포넌트의 생명주기 메서드를 대체하는 등의 다양한 작업을 위해 추가 되었다.



## State Hooks

### useState

> 컴포넌트 내부에 상태를 정의하고 관리하는 hook

useState 흉내내기,,, 클로저 함수를 반환한다.

```js
function useState(initialValue) {
  let internalState = initialValue;
  
	const state = () => internalState;
  
  const setState = (newValue) => {
    internalState = newValue;
  }
  
  return [state, setState];
}
```

게으른 초기화 >> 초깃값이 복잡하거나 무거운 연산을 포함하고 있을 때 함수를 usestate함수에 직접 넣어주면 state가 처음 만들어질 때만 실행되고 이후 부터는 무시된다.

### useReducer

> reducer 함수 내부의 업데이트 로직을 사용하여 state 변수를 선언한다.

##### 반환 값

- state : 현재 useReducer가 가지고 있는 값
- dispatcher : state를 업데이트 하는 함수로 setState는 단순히 값을 넘겨주는 반면 dispatcher는 action을 넘겨 줘야 한다.

##### 인수

- reducer : action을 정의하는 함수
- initialState : 초깃값
- init : 초깃값을 지연해서 생성하고자 할 때 사용하는 함수, 필수값x, useState와 동일하게 게으른 초기화가 일어난다. initialState를 인수로 init함수가 실행된다.

복잡한 형태의 state를 사전에 정의된 dispatcher함수를 통해서만 수정할 수 있게하여 state 값을 변경하는 시나리오를 제한적으로 한다.

## Context Hooks

> *Context*를 사용하면 컴포넌트가 [멀리 있는 부모 컴포넌트로부터 props로 전달하지 않으면서 정보를 받을 수 있습니다.](https://ko.react.dev/learn/passing-props-to-a-component) 예를 들어, 애플리케이션의 최상위 컴포넌트는 현재 UI 테마를 아래의 모든 컴포넌트에 깊이와 상관없이 전달할 수 있다.

### useContext

> context를 읽고 구독하는 hook



## Effect Hooks

> Effects를 통해 컴포넌트를 외부 시스템에 연결하고 동기화 할 수 있다.

### useEffect

> 흔히 알려진것과 같이 생명주기 함수를 대체하기 위해 만들어진 hook은 아니다. 정확하게는 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘이다. 기존 생명주기 함수는 언제 일어나는지에 초점이 있다면 `useEffect`는 어떤 상태값과 함께 실행되는지에 초점이 되어있다. 따라서 의존성 배열에 존재한다.

```js
useEffect(() => {
  // do something
  
  return () => {}
}, [])
```

첫번째 인수로는 실행할 함수, 두번째 인수로는 의존성 배열을 받는다. 실행할 함수의 반환값은 cleanup 함수이다.

##### 의존성 배열

- 빈 배열 : 비교할 의존성이 없으므로 최초 렌더링 후 다음 실행 부터는 무시됨
- 빈 값 : 의존성 비교할 필요 없이 레더링시마다 무조건적으로 실행된다. - 일반적으로 컴포넌트가 렌더링 되었는지 확인하는 용도로 쓰임
  - 렌더링시마다 사용되는 것이면 단순히 useEffect를 사용하지 않아도 되지 않을까 싶지만 useEffect hook을 사용하는 의미는 컴포넌트가 렌더링 된 후 이루어지는 작업이라는 차이점이 있다. 즉, useEffect hook을 사용하지 않으면 컴포넌트가 렌더링 되는 도중에 실행되어 컴포넌트 반환을 지연시키는 결과를 초래할 수 있다.
- 의존성 값이 할당된 배열 : 렌더링시마다 의존성 배열에 담긴 변수 값이 변경되었다면 동작

### useLayoutEffect

> 브라우저가 화면을 다시 그리기 전에 실행됩니다. 여기에서 레이아웃을 계산할 수 있다.

### useInsertionEffect

> React가 DOM을 변경하기 전에 실행됩니다. 라이브러리는 여기에 동적 CSS를 삽입할 수 있다.

## Performance Hooks

> 불필요한 계산과 재렌더링을 건너뛰어 성능을 최적화하는데 사용되는 hooks

추후 리액트 자체에서 최적화하여 없어질 hook들...

### useMemo

> 일반적으로 비용이 큰 연산에 대한 결과를 메모이제이션 해두고 이 값을 반환하는 hook이다.

첫번째 인수로 어떠한 값을 연산하여 결과를 반환하는 함수를 두번째 인수로는 해당 함수가 의존하는 값이 담긴 의존성 배열을 받는다. 의존성 배열의 값이 변경되지 않으면 함수는 재실행하지 않고 기존에 메모이제이션된 값을 반환한다. 메모이제이션 값은 컴포넌트도 가능하다.

#### useMemo와 React.memo의 차이점

React.memo는 **Higher-Order Components(HOC, 고차 컴포넌트: 컴포넌트를 인자로 받아 새로운 컴포넌트를 리턴하는 컴포넌트)**이다. 따라서 일반적으로 다음과 같이 사용된다.

```jsx
const MyComponent = React.memo(props => {
  return <>{/* render something */}</>
})
```

첫번째 인수로 반환할 함수형 컴포넌트 두번째 인수로는 커스텀 비교 함수를 받는다.

```jsx
const MyComponent = React.memo(props => {
  return <>{/* render something */}</>
},(prev, next) => {
  return prev.title === next.title
})
```

같은 props를 받을 때 같은 결과를 렌더링한다면 사용하는 고차 컴포넌트이다. 즉, props가 변경 됐는지만 체크한다. props가 아닌 내부 컴포넌트 안에 별도 state 값이 변경된다면 감지되지 않는다.<br/>

props로 함수를 넘기는 경우 함수도 렌더링시 재생성 되지 않도록 useCallback으로 감싸줘야한다..

<br/>

반면 useMemo는 hook함수로 의존 배열에 정의된 값의 변경을 감지한다.

### useCallback

> 인수로 넘겨 받은 콜백 함수 자체를 메모이제이션한다. 리랜더링시 의존 배열 조건에 따라 새로 함수를 만들지 않고 재사용한다.

useMemo와 useCallback의 차이는 메모이제이션하는 대상이 변수냐 함수냐이다. 다만 자바스크립트는 함수가 일급객체이므로 값으로 반환 가능하므로 memo로도 반환 가능하지만 리액트 팀에서는 기능을 명시적으로 분리하기 위해 나눈 것으로 추측



## Ref Hooks

### useRef

> ref를 선언하는 hook으로 어떠한 값도 담을 수 있지만, 대부분 DOM 노드를 담는데 사용됨, 이외에 setInterver, setTimeout과 스케쥴링 함수를 담을 때도 사용

- useRef는 반환값인 객체 내부에 있는 current 프로퍼티로 값에 접근 또는 변경이 가능하다.
- useRef는 state와 달리 값이 변경되더라도 렌더링을 발생시키지 않는다.

즉, useRef는 렌더링에 영향을 미치지 않는 고정된 값을 관리하기 위한 hook이다.

### useImperativeHandle

> 컴포넌트에 노출되는 ref를 커스텀하는 hook



## Other Hooks

다음 Hook은 대부분 라이브러리 작성자에게 유용하며 애플리케이션 코드에서는 일반적으로 사용되지 않는다.

- [`useDebugValue`](https://ko.react.dev/reference/react/useDebugValue)를 사용하면 커스텀 Hook에 대해 React DevTools에 표시해 주는 레이블을 커스텀할 수 있다.
- [`useId`](https://ko.react.dev/reference/react/useId)를 사용하면 컴포넌트가 고유 ID를 자신과 연결할 수 있다. 일반적으로 접근성 API와 함께 사용된다.
- [`useSyncExternalStore`](https://ko.react.dev/reference/react/useSyncExternalStore)를 사용하면 컴포넌트가 외부 저장소를 구독할 수 있다.

- [`useActionState`](https://ko.react.dev/reference/react/useActionState) 를 사용하면 액션을 통해 상태를 관리할 수 있다.

<br/>

###### 참고

- https://ko.react.dev/reference/react/hooks