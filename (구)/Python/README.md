# Python Study

> - 파이썬은 `||`, `&&` 연산자가 없다. `or` 또는 `and`를 사용한다.  
> - 세미콜론이 없는 대신 띄어쓰기로 구문을 구분한다.  
> - `is`는 변수의 Object(객체)가 같을 때 True를 리턴, `==`는 변수의 Value(값)이 같을 때 True를 리턴  
> ```   
>    a = [1,2,3], b = a, c = [1,2,3]   
>    a is b (True)  
>    a is c (False)    
> ```  
> - 자바나 자바스크립트와 달리 파이썬은 `if`, `for`에서 선언한 변수는 전역이다. 오직 함수안에서 선언한것만 지역변수이다.  
> - 보통 다른언어에서 `null`로 사용하지만 파이썬은 `None`을 사용한다.  
> - ```**``` 기호는 거듭제곱을 의미하고 ```//``` 기호는 나누기 연산 후 소수점 이하의 수를 버리고, 정수 부분의 수를 의미한다.
> 


### 1. 문자열
 - " , ' , """ , ''' 4가지 방법으로 작성가능함
 - count 문자개수세기
 - find 해당 문자 위치 알려주기, 존재하지 않는다면 -1 반환
 - index find와 기능은 같지만, 존재하지 않는다면 오류를 반환한다.
 - string.join('') 문자열 삽입 ex) ','.join('abcd') => a,b,c,d
 - string.upper() 대문자변환
 - string.lower() 소문자변환
 - string.lstrip(제거값) 왼쪽 공백 지우기
 - string.rstrip(제거값) 오른쪽 공백 지우기
 - string.strip(제거값) 양쪽공백 지우기
 ```
  기준점에서 제거값이 아닌 값이 나올때까지 제거해준다. 
  ex) '000rs0'.lstrip('0') => 'rs0'
 ```
 - string.replace(기존 문자열, 새로운 문자열) 문자열을 바꿔줌
 - string.split(기준값) 기준값을 기준으로 잘라준다. 기준값을 입력하지 않으면 스페이스바, 텝등을 기준으로 스플릿 된다.

 - 문자열, 리스트, 튜플 슬라이싱
 ```
  a = "Life is too short, You need Python"
  a[0:4] 0<=a<4
  'Life'
  
  [시작:끝:증감폭] [::-1] 내림차순
  리스트 = ["가", "나", "다", "라"]
  for 변수 in 리스트[: :2]:
    print(변수)
  
  result: 가 다
 ```

### 2. 리스트
 - 리스트 연산 가능 : 더하기 곱하기(단순 반복임, 기존 리스트를 수정하지는 않음)
 - del a[0] : 해당[인덱스] 요소 삭제
 - remove(x) 첫번째로 나오는 x값 삭제
 - append 요소추가
 - sort 리스트 요소 정렬
 - reverse 뒤집기
 - index 위치 찾기
 - insert(a,b) a(인덱스) 위치에 b를 삽입
 - pop 맨 마지막 요소를 반환하고 리스트에서 삭제한다.
 - count(x) x가 몇개 있는지 세어줌
 - extend(list) 기존 리스트의 맨 뒤에 list를 더해준다. 리스트 자료형만 변수로 받는다.
 - len(list) 리스트의 길이 구하기

### 3. 튜플 자료형
 - 리스트의 상수 같은 느낌, 리스트는 수정, 추가, 삭제 등이 가능하지만 튜플은 처음 생성한 값 고정.
 - 슬라이싱하기ex)
```
  t1 = (1, 2, 'a', 'b')
  t1[1:]
  (2, 'a', 'b')
  짝수 : t1[::2], 홀수 : t1[1::2]
```

### 4. 딕셔너리 자료형
 - {'key' : 'value'}의 형태
 - dictionary['key'] = value로 값을 얻는다 //js의 Object와 비슷하지만 호출방식의 차이가 있다.
 - get('key') value값을 얻는다.
 - item (key,value)쌍을 얻는다.
 - values value리스트를 반환
 - keys key리스트를 반환
 - del dictionary['key']로 해당요소를 삭제 할 수 있다.
 ```
inventory = {
              "메로나": [300, 20],
              "비비빅": [400, 3],
              "죠스바": [250, 100]
            }

print(inventory["메로나"][0], "원")
 ```



### 5. 집합 자료형
 - 중복 허용x
 - 순서x, 따라서 리스트나 튜플과 달리 인덱싱으로 값을 찾을 수가 없다.
 - 교집합 : s1 & s2 , s1.intersection(s2)
 - 합집합 : s1 | s2 , s1.union(s2)
 - 차집합 : s1 - s2 , s1.difference(s2)
 - add 값 한개 추가
 - update 값 여러개 추가
 - remove 특정값 제거

### 6. Bool 자료형 
 - None, 0, 빈 문자열, 빈 리스트, 빈 튜플, 빈 딕셔너리는 false이다.

### 7. 클래스
 - __init__라는 메서드로 생성자를 생성할 수 있다.
 ```
  class 사람:
    def __init__(self, 파이썬, 코딩):
        self.파이썬 = 파이썬
        self.코딩 = 코딩
  
  #사람 클래스 상속하기
  class 개발자(사람):
    def __init__(self, 파이썬, 코딩, 컴퓨터):
        super().__init__(파이썬, 코딩)
        self.컴퓨터 = 컴퓨터
 ```

### 8. 모듈
 - import 모듈 이름 => 모듈이름.모듈함수로 사용해야된다.
 - from 모듈 이름 import 모듈 함수 => 바로 모듈 함수명으로 사용가능하다.

### 9. 에러처리
```
try:
    ...
except 발생 오류 as 오류 메시지 변수:
    ...
```    
 - raise 에러 일부러 발생시키기, 이를 활용하여 커스텀 예외를 만들 수 있다.

### 10. 내장함수 목록
 - abs(숫자) : 절댓값을 돌려주는 함수이다.
 - all(변수) : 반복가능한 자료형(리스트 등)을 변수로 받아 요소가 모두 참이면 True, 거짓이 하나라도 있으면 False를 돌려준다.
 - any(변수) : 반복가능한 자료형을 변수로 받아 요소 중 하나라도 참이 있으면 True를 돌려주고, x가 모두 거짓일 때에만 False를 반환한다. all함수랑 반대이다.
 - chr(유니코드) : 유니코드 값을 받아 코드 값에 해당하는 문자를 반환한다.
 - dir : 객체가 자체적으로 가지고 있는 변수나 함수를 보여 줌
 - divmod(a,b) : a를 b로 나눈 몫과 나머지를 튜플 형태로 리턴해준다. 몫을 구하는 연산자 //, 나머지를 구하는 연산자 %
 - enumerate : 순서가 있는 자료형(리스트, 튜플, 문자열)을 인덱스 값을 포함하는 enumerate객체로 리턴한다.
 
 ex)
 ```
 for i, name in enumerate(['body', 'foo', 'bar']):
     print(i, name)
 ```

0 body
1 foo
2 bar
``` 
 리스트 = ["김밥", "라면", "튀김"]
 for index in range(len(리스트)):
   print(index, 리스트[i])
  
 for i in 리스트[1:]:
   print(i)
```
 - eval : 실행 가능한 문자열을 입력받아 문자열을 실행한 결과값을 리턴 //입력받은 문자열로 파이썬함수나 클래스를 동적으로 실행하고 싶을 때 사용한다.
 - filter(조건함수, 반복가능한 자료형)
 - hex(x) :  정수 값을 받아 16진수로 리턴
 - id : 객체의 고유 주소값 리턴
 - input([prompt]) : 사용자 입력을 받음
 - int(x) : 문자열형태의 숫자나 소숫점이 있는 숫자를 정수로 리턴
 - ininstance(object, class) : 인스턴스가 클래스의 인스턴스인지 참, 거짓 판별하여 반환해줌
 - len(x) : x의 길이 반환(요소의 전체 개수)
 - list(s) : 반복 가능한 자료형 s를 입력받아 리스트로 반환해준다.
 - map(func, iterable) : 함수와 반복가능한 자료형을 입력받아 각 요소를 함수가 수행한결과를 묶어서 돌려준다.
 - max(iterable) : 최댓값을 반환
 - min(iterable) : 최소값을 반환
 - oct(x) : 8진수 문자열로 반환
 - open(filename, [mode]) 
 ```
  w: 쓰기 모드로 파일 열기
  r: 읽기 모드로 파일 열기
  a: 추가 모드로 파일 열기
  b: 바이너리 모드로 파일 열기, w r a에 붙여서 사용한다. 
  ex) wb

  with open("sample.txt", "w") as file:
	 file.write("It's simple code")
	 
  #json불러오기
  import json
  with open('sample.json') as json_file:
    json_data = json.load(json_file)
 ```
 - ord(c) : 문자의 유니코드값 리턴
 - pow(x,y) x의 y제곱한 값을 리턴
 - range([start], stop, [step]) : 입력받은 숫자에 해당하는 범위 값을 iterable 객체로 리턴
 - round : 반올림 리턴
 - sorted : 정렬해서 리스트로 리턴
 - str : 문자열 형태로 리턴
 - sum : 리스트나 튜플의 모든 요소의 합을 리턴
 - tuple(iterable) : 튜플형태로 리턴
 - type(object) : 자료형을 알려준다.
 - zip(iterable ... ) : 동일한 개수로 이루어진 자료형을 묶어 준다.
 ex)
```
 list(zip("abc", "def"))
 [('a', 'd'), ('b', 'e'), ('c', 'f')]
```

### 11. for
```
  리스트 = ["김밥", "라면", "튀김"]
  for i in range(len(리스트)):
    print(i, 리스트[i])
```
0 김밥
1 라면
2 튀김

### 12. Star Expression
 - *args : 파라미터를 받을 때 몇개를 받을지 모를경우 사용
 ```
  ex1) a,b,*c = (0,1,2,3,4,5,6)
  ex2) scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
       *valid,a,b = scores => print(valid) valid에 scores의 8개만 담을 수 있다.
 ```
 
 ### 13. Math Module
 - import math
 - 올림함수 : math.ceil(val)
 - 내림함수 : math.floor(val) 
 - 버림함수 : math.trunc(val)
 - 내장함수인 round는 두번째 인자로 자릿수를 받지만 math모듈은 그렇지 않다.
 - 정수 int로 변환하면 소숫점이하는 자동으로 버린다.
 ```
  math.trunc(-3.14)   #결과는 -3
  math.floor(-3.14)   #결과는 -4 
 ```
 ### 14. 산술 연산자
  - ** : 제곱, 지수
  - // : 몫
  - % : 나머지
  - +, -, *, /
