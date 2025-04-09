# React.js Component와 State 관리

컴포넌트 계층 구조에서 리액트는 부모-자식은 인자를 전달해서 정보를 전달한다. 컴포넌트끼리 접촉해 있어야만 정보를 전달할 수 있는 구조, 멀리 떨어져 있는 컴포넌트에는 전달할 수 없으며, 자식은 부모 컴포넌트로 정보를 전달할 수 없다. (단방향 바인딩만 지원)

<br/>A, B, C 순으로 설계된 컴포넌트가 있다면 C에서 A의 정보를 사용하려면 A -> B -> C 로 props로 넘겨 주어야 한다. 이로 인해 B는 필요 없는 정보더라도 중간에서 A로 부터 인자를 받아 C로 넘겨야 하는 상황이 발생한다. 이것을 프롭 드릴링 현상이라고 함

##### 프롭 드릴링의 문제점

- 컴포넌트가 중첩될수록 값의 출처를 파악하기가 힘들어진다.
- B는 A와 C 사이에 있다는 이유로 고유의 역할과 무관한 정보도 받아서 다음 컴포넌트로 넘긴다.



### 고차 컴포넌트



state 비교

```javascript
// https://github.com/facebook/react/blob/main/packages/shared/objectIs.js
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

const objectIs: (x: any, y: any) => boolean =
  // $FlowFixMe[method-unbinding]
  typeof Object.is === 'function' ? Object.is : is;

export default objectIs;
```

