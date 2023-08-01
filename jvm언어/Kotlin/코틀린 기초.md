# 코틀린 기초

## 타입

> 코틀린에서는 원시타입(primitive type)과 래퍼 타입(wrapper type)으로 구분 되는 자바와 다르게 별도로 구분하지 않고 하나로 통일되어 있다.
> 즉, `int`와 `Integer`로 구분하지 않고 `Int`하나만 존재한다. 코틀린의 타입은 컴파일 시 자바의 primitive 또는 wrapper 타입으로 자동 변환된다. 
> 다만, Collection 이나 Generic을 사용하는 경우에는 wrapper 타입으로 변경 되고 그 외 나머지의 경우에는 primitive 타입으로 변환된다.

## 데이터 타입
Int, Double, Float, Long, Short, Byte, Char, Boolean, String, Any, Unit, Nothing

## 변수

- 변수 선언
  - 가변 변수 `var` : variable을 의미하며, 가변 변수이므로 초기화 이후에 값을 변경할 수 있다. (값은 변경 가능해도 타입은 변경 불가능)
  - 불변 변수 `val` : value를 의미하며, 자바의 final과 같다.

```kotlin
var 변수명 : 반환 타입 = 변수에 담을 값
val 변수명 : 반환 타입 = 변수에 담을 값
```

- 타입 생략 : 바로 값을 할당하는 경우 타입 유추가 가능하므로 타입 생략이 가능하다.

```kotlin
val a = 1
```

- 지연 할당 : `var`, `val`  전부 가능하다.

```kotlin
val a: Int // 지연 할당시, 타입 명시는 필수
a = 1
```

## 함수

- 함수 선언

```kotlin
fun 함수명(인자: 타입, 인자: 타입) : 반환 타입 {
  return 값
}
```

- 함수를 표현식 처럼 사용가능

```kotlin
fun isTrue(a: Int, b: Int): Boolean = a > b
```

- 표현식으로 작성된 함수는 반환 타입을 생략할 수 있다.

```kotlin
fun isTrue(a: Int, b: Int) = a > b // 반환 타입 생략 가능
fun isTrue(a: Int, b: Int) {
  return a > b // 반환 타입 생략 불가능, 컴파일 에러 발생
}
```

- 메인 함수 : 자바의 `psvm`과 같은 기능, 최상위 함수로 실행 진입점이다

```kotlin
fun main(){ }
```

- 디폴트 파라미터 : 값이 null로 들어올 경우, 사용되는 기본 값이다. (자바스크립트에는 있지만 자바에는 없는 기능)

```kotlin
fun hello(message: String = "hello"){
  println(message) // message의 값이 null로 들어올 경우 "hello" 출력
}
```

- 네임드 아규먼트

```kotlin
fun hello(msg1 : String = "hello", msg2 : String){
  println(msg1 + msg2) 
}

fun main(){
  hello(msg2 = "world") // "hello world" 출력
}
```

네임드 아규먼트를 활용하였기 때문에 `hello(null, "world")` 와 같이 모든 인자에 값을 넣어주지 않아도 된다.

## 조건문

- if...else

```kotlin
if(조건){ 
  // 조건이 참일 경우 실행
} else { 
  // 조건이 거짓일 경우 실행
}
```

- 코틀린의 조건문은 표현식이다.

```kotlin
val isTrue: Boolean = true
val result: String = if(isTrue) "진실" else "거짓" // isTrue 가 참이면 "진실" 반환 거짓일 경우 "거짓" 반환
```

- 코틀린은 자바와 달리 삼항연산자가 없다. (if..else가 표현식이므로 삼항 연산자 대신 충분히 표현할 수 있다.)

```java
int b = (5 < 4) ? 50 : 40;  // 코틀린에서는 지원하지 않는 문법
```

```kotlin
val b: Int = if(5 < 4) 50 else 40 // 위의 자바 코드를 코틀린에서 작성한다면 다음과 같다.
```

