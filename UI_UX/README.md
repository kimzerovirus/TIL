# UI/UX

## 목차
1. [reset](#1-reset)
2. [요소 숨김처리](#2-요소-숨김처리)
3. [텍스트 말줄임](#3-텍스트-말줄임)
4. [float](#4-float)
5. [flex](#5-flex)
6. [이미지 전체배경화면](#6-이미지-전체배경화면)
7. [동영상 전체배경화면](#7-동영상-전체배경화면)
8. [transition](#8-transition)
9. [transform](#9-transform)
10. [@keyframes 애니메이션명](#10-keyframes-애니메이션명)
<br/>

## 1. reset
```
*{ margin: 0; padding: 0; }
ul,ol,li{ list-style: none; }
a{ text-decoration: none;color: inherit; }
table{ border-collapse: collapse; }
```

<br/>

## 2. 요소 숨김처리
```
.hidden{
    postion: absolute;
    top: -9999px;
    opacity: 0;
}
 
.blind{
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px; height: 1px;
    margin: -1px;
    overflow: hidden;
}
```

<br/>

## 3. 텍스트 말줄임
 - 한줄의 경우: ```display:block; overflow:hidden; text-overflow:ellipse; white-space:nowrap;```
 - 여러줄의 경우: ```overflow:hidden; text-oveflow:ellipse; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:줄 수;```
 - [예시 보러가기](https://ekgoddldi.tistory.com/171?category=980959)

<br/>

## 4. float
 * step1 : 먼저 좌우배치할 모든 블록요소 태그에 float:left 설정
     - float된 요소의 높이값을 브라우저가 인지하지 못함  
 * step2 : float된 요소의 직계부모태그 블록요소에
     - ```.clfix::after{ content:''; display:block; clear:both; }``` 추가

<br/>

## 5. flex
```flex:1;``` 
- flex-grow:1; //늘어날때 비율
- flex-shrink:1; //줄어들때 비율
- flex-basis:0%;

flex-direction
- column : 가로, 열
- row : 세로, 행

flex-wrap
- 자식요소에 줄바꿈 적용
- nowrap : 줄바꿈 불가
- wrap : 줄바꿈 허용

flex-flow
- flex-direction과 flex-wrap을 한번에 지정

justify-content
- flex-start
- flex-end
- center
- space-between : 양쪽 끝에 보내고 여백 동일하게 적용, 자식요소 사이끼리 동일한 간격
- space-around : 동일 여백으로 그리드시스템 적용, 자식요소 둘레에 동일한 간격
- space-evenly : 자식요소 사이와 양 끝에 동일한 간격

align-items
- stretch : 쭉 늘어나서 부모 높이만큼꽉채움, 디폴트
- baseline
- flex-end
- flex-start

align-content
- flex-container가 wrap일때 사용가능

<br/>

## 6. 이미지 전체배경화면
```
width:100%; height:100vh; 
position:absolute; top:0; left:0; 
z-index:0; 
background:url(../img/background.jpg) no-repeat center center/cover;
```

<br/>

## 7. 동영상 전체배경화면
```
/* 부모 요소 */
width:100%; height:100vh; 
position:absolute; top:0; left:0; 
z-index:0; 

/* 비디오 요소 */
width: 100%; hegiht: 100%;
object-fit:cover; 
```
<br/>

## 8. transition
  - css 속성을 변경할 때 애니메이션 속도를 조절하는 방법. 속성 변경이 즉시 일어나는 대신, 변화가 일정 기간에 걸쳐 일어나도록 함 
 * 적용가능 속성 
   - 위치 : top,left.. 
   - 크기 : width, height 
   - 박스 속성 : margin, padding 
   - 테두리 : border 
   - 색상 : color, background 
   - 투명도 : opacity 
   - 변환속성 : transform   

 - transition-property : 어떤 속성을 변형할지 지정 
 - transition-duration : 몇 초동안 재생할지 지정 
 - transition-timing-function : 가속도 
 - transition-delay : 이벤트 발생후 몇 초 후에 재생할지 지정   

 * 가속도 
   - linear : 처음부터 끝까지 일정한 속도 
   - ease : 천천히 시작되어 그 다음에는 빨라지고 마지막은 다시 느려짐 
   - ease-in : 전환효과가 천천히 시작 
   - ease-out : 전환효과가 천천히 끝남  
   - ease-in-out : 전환효과가 천천히 시작되어 천천히 끝남 
   - cubic-bezier() : cubic-bezier(.41,-1.58,.55,1.64)
```
transition: property duration timing delay; 
```

<br/>

## 9. transform
 * 2차원 변환
   - 이동 
       - translateX() : x축으로 특정 크기만큼 이동 
       - translateY() : y축으로 특정 크기만큼 이동 
       - translate(x, y) 

   - 크기 
       - scale() 특정 크기만큼 확대 또는 축소 
       - scaleX() : x축으로 특정 크기만큼 확대 또는 축소 
       - scaleY() : y축으로 특정 크기만큼 확대 또는 축소 

   - 기울이기 
       - skew() : 특정 각도만큼 기울기 
       - skewX() : x축으로 특정 각도만큼 기울기 
       - skewY() : y축으로 특정 각도만틈 기울기 

   - 회전 
       - rotate() : 특정 각도만큼 회전 

 - 3차원 변환 
   - rotateX() : x축 기준으로 특정 각도만큼 회전 
   - rotateY() : y축 기준으로 특정 각도만큼 회전  
   - translateZ() : z축 기준으로 특정 거리만큼 이동 
   - perspective : 원근감을 부여하는 속성 - 부모요소에 적용(400px~2000px)
   - transform-origin : 요소의 변형이 일어나는 중심축을 가로축, 세로축 기준으로 변경하는 속성 
   - ```transform-style:preserve-3d;```
       - 3d효과가 적용된 요소에 모션처리를 하면 해당 3d효과가 풀림
       - 부모요소에 preserve-3d를 적용하면 - 자식요소의 3d효과를 유지 
       - 주의사항) preserve-3d 와 perspective를 같은 요소에 동시적용하면 모션이 깨짐 
   - ```backface-visibility: hidden;``` : 뒷면 안보이게 
   
<br/>

## 10. @keyframes 애니메이션명
 - animation: 이름 속도 시간 반복횟수; 
 - animation-play-state:paused 애니메이션 멈춤         
```
.play:hover{
    animation: animation linear 3s infinite;  
}

@keyframes animation{
    0%{ transform:rotateY(0) rotateX(0deg); }
    100%{ transform:rotateY(360deg) rotateX(360deg); }
}
```

<br/>
