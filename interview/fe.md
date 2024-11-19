## JavaScript

> 자바스크립트는 하나의 콜스택을 갖는 단일 스레드 기반 언어이자 동적 언어이다.

1. **this에 대해 설명하시오**<br/>
   함수 내부에서 `this` 값은 함수를 호출한 방법에 따라 달라짐, 기본적으로 브라우저에서는 window인 전역 객체를 참조한다. 화살표 함수에서 `this`는 자신을 감싼 정적 범위이다. 전역 코드일 경우에는 전역 객체를 가리킨다.

   ```javascript
   // browser
   console.log(this); // window
   // node.js
   console.log(this); // global
   ```

   - 전역 공간의 this = 전역 객체
   - 메소드 호출시 메소드 내부의 this = 해당 메소드를 호출한 객체
   - 함수 호출시 함수 내부의 this = 지정되지 않음? -> 지정되지 않으면 전역객체가 된다.
   - 이벤트 함수에서 호출시 이벤트 객체가 this가 됨
   - function으로 선언된 함수는 메소드로 호출되냐 함수 자체로 호출되냐에 따라 동적으로 this가 바인딩 되는 반면 화살표 함수에서의 this는 선언될 시점에서의 상위 스코프가 this로 바인딩된다.

2. **promise와 async/await의 차이**<br/>
   Promise는 비동기 연산의 상태를 나타내는 객체

   - Pending : 비동기 작업 시작
   - Fulfilled : 성공 상태 -> then() 성공 callback 실행
   - Rejected : 실패 상태 -> catch() 실패 callback 실행

   async/await은 Promise의 완료를 기다리기 위한 문법으로 기존의 then으로 콜백 체이닝 하던 코드를 동기식으로 작성할 수 있게 해준다. async 키워드로 정의된 함수 내에서 호출되는 Promise 앞에 await 키워드를 붙여 사용한다. await은 해당  Promise가 완료될 때 까지 코드의 실행을 일시 중단할 수 있다. 따라서 여러개의 Promise를 동시에 사용하려면 await으로 계속 멈추게 하지말고 Promise.all과 같은 함수를 사용해야 한다.

3. **호이스팅**<br/>

   - 변수와 함수가 초기화 되기 전 메모리 상에 먼저 올라가는 현상
   - let, const는 호이스팅은 되지만 초기화 전에 접근할 수는 없음
   - 변수는 선언만 호이스팅, 함수는 선언과 초기화 모두 호이스팅
     즉 var something이라고 선언하고 밑에서 초기화한다면 초기화 되기 전까지 undefined 상태이다.

4. **clousre, lexcial scope(정적 스코프)**<br/>
   lexical scope 규칙, 함수 안에서 선언한 변수는 함수 안에서만 접근이 가능하다. 따라서 함수 밖에서 접근하려면 전역 변수를 사용해야하는데 전역 변수는 애플리케이션이 실행되는 동안 메모리 상에 계속 남아 있으므로 메모리 누수 등의 문제가 있음, 이 때 등장하는 개념(함수 내부 변수에 접근하는)이 클로저 (대표적인 예시가 useState에서 반환하는 배열에 있는 함수들이 클로저 함수) - 함수 return 문에서 함수 내부의 변수를 사용하는 함수를 다시 리턴하는 자바의 getter 메소드와 같은 행위를 클로저 함수라고 말하는듯
   
   ```javascript
   function closureFuncExample() {
     let count = 0;
     
     // 클로저 함수 - 렉시컬 스코프 규칙을 따르므로 내부 변수 참조를 위해 사용되는 기법
     return {
       increase: function(){
         count += 1;
       },
       decrease: function(){
         count -= 1;
       },
       getCount: function(){
         return count;
       }
     }
   }
   ```
   
   함수 중첩시에는 Inner함수는 Outer함수의 변수를 참조 가능하지만, 반대인 Outer는 Inner의 변수를 참조할 수 없음
   함수 선언문 바깥에서도 함수 스코프를 참조할 수 있다는 점과 모듈 패턴 구현에 용이하다는 장점이 있음
   scope : 변수나 함수에 접근 가능한 유효 범위를 말함
   변수를 찾는 과정은 메모리 상에 있는 실행 컨텍스트의 inner -> outer -> 전역 스코프를 확인한다. 전역에서도 없다면 에러 방출
   
5. **실행 컨텍스트**<br/>
   실행 가능한 코드에 제공할 환경 정보를 모아놓은 객체이다. 해당 객체에는 변수 객체, 스코프 체인, this 등의 정보가 담겨 있다. 자동으로 전역 컨텍스트가 생성된 후 함수 호출시마다 함수 컨텍스트가 생성되고, 컨텍스트 생성이 완료된 후에 함수가 실행된다. 함수 실행 중에 사용되는 변수들을 변수 객체 안에서 값을 찾고 값이 존재하지 않는 다면 Lexical 환경의 outerEnvironmentReference를 통해 스코프 체인을 따라 올라가며 탐색한다. 이 때 전역 스코프까지 탐색하였으나 해당 변수가 존재하지 않는다면 에러가 발생한다. 함수 실행이 종료되면 해당 컨텍스트는 사라지고, 페이지가 종료되면 전역 컨텍스트도 사라진다.

6. **이벤트 루프란?**<br/>

   1. 자바스크립트에서 모든 함수 호출은 Call Stack에 LIFO(Last In First Out) 구조로 쌓인다.
   2. 비동기 함수는 Call Stack(메인 쓰레드)에 쌓이는 즉시 Background(메인x 쓰레드)로 전달된다.
   3. Background에서 처리가 완료되면, Callback함수는 Event Queue에 FIFO(First In First Out) 구조로 쌓인다.
   4. Event Loop는 Call Stack이 비어있는지 수시로 체크한다.
   5. Call Stack이 비어 있을 경우, Event Loop는 Event Queue에서 Callback 함수를 Shift한다.
   6. shift된 Callback 함수를 메인 쓰레드인 Call Stack에 push하여 실행한다.

7. **리플로우와 리페인트**<br/>

   - reflow : 웹페이지에 요소의 위치 또는 크기 변경이 있으면, 변경된 레이아웃을 다시 계산하는 과정
   - repaint : 웹페이지 내에서 요소의 시각적 표현 요소(색상 등)의 변화가 있을 때 다시 계산하여 표현하는 과정
   - reflow는 repaint와 달리 하위 렌더 트리를 다시 계산하고 재구성하는 과정이 필요하여 cpu 부하가 더 큰 작업이다. 또한 reflow가 발생하면 일반적으로 repaint도 같이 발생한다.
     DOM 트리 -> CSSOM 트리 -> 렌더 트리

## React.js

1.  **useState와 useReducer 를 선택하는 기준** <br/>
   state는 간단한 상태, 복잡한 상태는 reducer로 
2. **커스텀 훅을 사용하는 이유와 장점** <br/>
   리액트라이프사이클을 포함한 로직을 재사용할 수 있음, hook이 필요없다면 헬퍼 function으로 사용하면 됨
   뷰가 더 렌더링에 집중할 수 있게 관심사가 분리될 수 있음?
3. **렌더링 성능을 최적화 하기 위해 React.memo, useMemo, useCallback을 어떻게 활용하는지?**<br/>
   - `React.memo` : 컴포넌트의 props를 얕은 비교로 변경됨
   - `useMemo` : 값에 대한 메모이제이션
   - `useCallback` : 함수에 대한 메모이제이션
4. **useEffect의 모범사례와 주의할 점은?** <br/>
   - 비동기 함수 호출
   - 이벤트를 추가했다가 언마운트 할 때 클린업해서 이벤트 해제한다
   - 디펜던시 배열 조건에 따라 effect가 실행됨, 빈 배열이면 초기에만 한번 렌더링됨
5. **코드스플리팅을 할 때 React.lazy와 Suspense를 어떻게 사용하는지?** <br/>
   코드 스플리팅은 번들링을 쪼개어 lazy는 필요한 시점에 해당 영역을 받아온다. -> 초기 번들 파일이 작아져서 좋음
6. **useContext를 사용하여 상태를 공유할 때의 장점과 주의할 점?** <br/>
   Provider로 정의한 컴포넌트는 하위에서 사용한다면 모든 부분들이 다 리렌더링이 일어나므로 조심해야함
7. **복잡한 상황에서 컴포넌트 설계 원칙와 전략 설명** <br/>
   - 단일 책임 원칙
   - UI로직에서 재사용 가능한 부분을 분리
     - 버튼, 게시판 그리드 컴포넌트, 페이징 등
   - 스토어를 view에서 분리
     - reducer, zustand, redux 등
   - css 파일은 컴포넌트에 인접한 위치에 파일을 둔다
8. **리액트의 성능 문제를 분석할 때 사용하는 도구와 기법?** <br/>
   - source tab -> sourceMap // 개발 모드에서는 브레이크 포인트 걸고 똑같이 디버깅
   - React profiler // 리액트 개발자 도구에서 렌더링 횟수 등을 확인할 수 있음
9. **Todolist 를 관리하는 애플리케이션에서 실시간으로 항목을 추가, 삭제, 변경하는 기능을 구현하려고 한다. 본인의 경험을 바탕으로 상태 관리를 어떻게 할지 설명해보세요**<br/>
   - 클라이언트 상태와 서버 상태를 나누어서 설명?
   - optimistic update : 요청을 보내는 것과 동시에 결과를 예측하고, 예측한 결과를 UI에 반영하는 것
10. **virtualDOM이 어떻게 성능을 최적화하는지?**<br/>
    기존 업데이트된 데이터와 업데이트 될 데이터 비교하여 다른 부분만 판단하여 다시 렌더링한다.



### React 18, 19



## TypeScript

1. **interface와 type의 차이점**<br/>





<br/><br/><br/><br/><br/>

CORS: Cros Origin Resource Sharing 교차 출처 리소스 공유

1. 서버는 응답 처리 코드에서 CORS 관련 헤더 설정을 할 수 있다.
   요청을 허용할 도메인, 요청 헤더 종류, HTTP 메서드 등을 설정할 수 있음
2. 브라우저에서 서버에 요청할 때, 서버에서 설정한 정보와 다르면 CORS 에러 발생



Preflight : 보안적으로 민감한 CORS 요청에 대해, 요청이 가능한지 먼저 묻는 것, 보안에 민감한 것이 아니거나 캐싱 되어 있으면 일어나지 않음

SOP : Same Origin Policy 동일 출처 정책, 도메인 프로토콜, 포트 모두가 같아야 동일 출처
