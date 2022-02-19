# 마크다운 예시

---
***
___

작대기, 별, 언더바를 3개 만들면 수평선이 생겨요

# 제목1
## 제목2
### 제목3
#### 제목4
##### 제목5

## 📌`TODO Check List`
- [x] 할일1
- [ ] 할일2
- [ ] 할일3

## 📚 테이블 만들기
| 분야           | 사용 기술                               |작업기간                | 비고 |
| -------------- | -------------------------------------- |----------------------------------- |-------------------------|
| FrontEnd       | React, React-Router, ES6 | 2021-02-16 ~ 2021-02-19 ||
|                | Typescript, Styled-Components  | 2022-01-07 ~ 2022-01-18 | 코드 리팩토링 및 마이그레이션 작업|
|                | Redux Redux-Toolkit | 2022-01-24 | 리덕스 추가 |

## 📝 코드블럭 작성하기
```
const gameHandler = (player: ActionType) => {
	setVisible(false);
	const computer = Math.floor(Math.random() * 3 + 1);
	const result = solution(player, computer);
	setResult({
		player: inputVal(player),
		computer: inputVal(computer),
		result,
	});
};
```

## 🙆🏻‍♀️ 마크다운 문법을 활용해 문서를 작성해 보아요

마크다운을 작성해봅시다. 마크다운 문법은 어렵지 않아요

- 마크다운은 들여쓰기(*Tab*)와  줄바꿈이 중요해요
    - 이렇게 한번 더 탭을 누르면 더 안쪽에 들여써져요
        - 3번째 들여쓰기도 가능해요
            + `- 대쉬 * 별 + 더하기`를 이용해서 `<ul></ul>`과 같은 순서가 없는 리스트를 만들 수 있어요
- `-` 막대기로도 기호를 만들 수 있고 `*` 별로도 만들수가 있어요
* 막대기로 된 문단 아래에 `*` 로 문단을 만들면 이렇게 약간의 텀이 생겨요
    1. 번호와 점으로도 표시할 수 있어요
    2. *기울이기* 는 별로도 할 수 있고 <em>이렇게 html태그로도 가능해요</em> `<em></em>`
    3. __언더바 두개__ 또는 **별 두개**는 강조 표시에요 물론 <strong>html 태그로도 가능해요</strong> `<strong></strong>`

## 🏷 하이퍼 링크 만들기
[이 링크는 어디로 갈까요?](https://www.youtube.com/watch?v=YmDMhcIfBdY)

## 🖼 이미지를 넣어봅시다

![image](https://avatars.githubusercontent.com/u/68390715?v=4)

이렇게 웹상의 이미지 주소를 넣어도 되지만 상대위치를 이용해서도 현재 폴더 안에 있는 이미지를 넣을 수가 있어요

이렇게 작성하면 이미지에 링크를 넣을 수도 있어요
```
[![이미지가 오류 났을때 보여줄 문구](이미지 주소)](하이퍼링크 사이트 주소)
```

## html태그 사용하기
<span>`<br>`</span>
<span>`<span></span>`</span>
<span>`<h1></h1> ~ <h5></h5>`</span>
<span>`<div align="center"></div>`</span>
<div align="center">
이러한 html 태그들이 사용 가능해요
</div>

<br/>
<br/>
<br/>