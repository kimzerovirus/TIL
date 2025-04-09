# DOM과 Virtual DOM

> 실제 DOM (Document Object Model)과 가상 DOM 비교하기

## DOM과 브라우저 렌더링 과정

##### 브라우저가 웹사이트 접근 요청을 받으면 일어나는 일

1. 브라우저가 사용자의 요청 주소에 해당하는 HTML 파일을 다운로드 한다.
2. 브라우저의 렌더링 엔진은 HTML을 파싱하여 DOM 노드로 구성된 DOM트리를 형성한다.
3. 2번 과정에서 css 파일을 만나면 해당 css 파일을 다운로드 하며, 이 css도 파싱하여 css 노드로 구성된 트리(CSSOM)를 형성한다.
4. DOM 노드를 순회하며, display: none과 같이 시각적으로 보이지 않는 노드를 제외한 노드들에 CSSOM에서 스타일 정보를 찾아 적용한다.

##### DOM 노드에 CSS를 적용하는 과정

- 레이아웃 (layout, reflow) : 브라우저에 표현될 노드의 위치 좌표를 계산하는 과정, 레이아웃 과정을 거치면 반드시 페인팅 과정도 거치게 된다.
- 페인팅 (painting) : 레이아웃 과정을 거친 후 노드에 색상과 같이 시각적인 효과를 그리는 과정

## 가상 DOM

##### 가상 DOM의 탄생 배경

MPA 방식에서는 페이지가 변경 되는 경우 다른 페이지로 이동하여 처음부터 HTML을 새로 다운로드하여 다시금 렌더링 하는 과정을 거친다. 하지만 SPA 방식에서 라우팅이 일어나는 경우 헤더와 푸터와 같은 특정 요소를 제외한 대부분의 요소를 다시 그리게 되는데 이 때 새로 다운로드하여 그리는 MPA 방식과 달리 SPA는 DOM에서 변경된 영역을 찾아 요소를 삭제하고, 다시 요소를 삽입 후 레이아웃, 페인팅 과정을 거치게 된다. 물론 이로 인해 다시 다운로드하며 발생하는 껌뻑임 현상이 없어 UX적으로 더 자연스로운 움직임을 경험할 수 있으나 DOM을 관리하는 비용이 커지게 된 것이다.

### React.js의 가상 DOM 아키텍처 - React Fiber

리액트 파이버는 단순히 정보를 가지고 있는 javascript object이다. 파이버 객체는 파이버 재조정자(fiber reconciler, 가상 DOM과 실제 DOM을 비교하여 재렌더링하는 알고리즘)를 통해 관리 된다. 파이버는 하나의 작업 단위로 구성되어 있다. 리액트는 이러한 작업단위를 하나씩 처리하고 `finishedWork()` 함수를 호출하여 작업을 마무리한다. 이 단계는 비동기적으로 작업 된다. 다만 이 작업을 커밋해 실제 브라우저 DOM에 변경을 일으키는 `commitWork()` 에서는 동기식으로 일어나고 중단될 수도 있다.

```javascript
// 리액트의 Fiber 객체
function FiberNode(){

}

var createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}

function createFiberFromElement(element, mode, lanes) {
  ...
}
```

파이버는 렌더링 될 때 마다 새로 생성되는 리액트 요소들과 달리 컴포넌트가 최초로 마운트 되는 시점에 생성되어 가급적이면 재사용된다.

[React 파이버 아키텍처 분석](https://d2.naver.com/helloworld/2690975)
