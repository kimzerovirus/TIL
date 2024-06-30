# Java에서 정확한 계산을 위한 클래스, BicDecimal

## 자바 원시타입 float, double 계산의 문제점

자바에서 소수(decimal) 연산을 할 때, 기대와 다른 엉뚱한 값이 나오는 걸 볼 수 있다.

```java
double a = 0.1;
double b = 0.2;

System.out.print(a + b ); // 0.30000000000000004
```

다음과 같이 똑같은 값을 더하고 빼도 엉뚱한 값이 나오는것을 확인할 수 있다.

```java
System.out.println ( .1f + .1f + .1f - .1f - .1f - .1f ); // 1.4901161E-8
System.out.println ( .1d + .1d + .1d - .1d - .1d - .1d ); // 2.7755575615628914E-17
```

오차가 발생하는 이유는 float과 double은 정확한 값이 아닌 근삿값을 담고 있어서 발생하는 *부동소수점 타입* 의 대표적인 문제점이다.

## 고정소수점과 부동소수점

컴퓨터에서 실수를 표현하는 방식에는 크게 두가지가 있음.

##### 고정 소수점

>  실수를 부호 비트(signed bit), 정수부와 소수부로 나누고 자릿수를 고정하여 실수를 표현하는 방식

| 부호  | 정수부 | 소수부 |
| ----- | ------ | ------ |
| 1비트 | 15비트 | 16비트 |

고정소수점은 각 부분을 자릿수를 고정으로 나누어 저장하므로 간단하게 구현 가능하지만, 자릿수가 제한되어 있다는 치명적인 단점이 있음 따라서 표현할 수 있는 수의 범위가 한점적이므로 더 넓은 범위의 실수를 표현하기 위해 부동소수점이라는 개념이 등장함

##### 부동소수점 

> 실수를 부호부(sign), 가수부(mantissa), 지수부(exponent)로 나구고, 정규화된(normalized) 값을 각 비트에 나눠 담아 실수를 표현하는 방식

| 부호  | 가수부 | 지수부 |
| ----- | ------ | ------ |
| 1비트 | 8비트  | 23비트 |

예를 들면 12.3456을 저장할 경우, 표현식을 0.123456 * 10^2로 변경한 다음, 가수부에는 0.123456을 저장하고 지수부에는 2를 저장하는 방식이다. 실제로는 [IEEE 754 표준](https://en.wikipedia.org/wiki/IEEE_754)에 따라서 지수부에 bias라는 값을 더해주는 과정을 거치게 된다. <br/>

하지만 부동소수점은 고정소수점 표현방식에 비해 더 넓은 실수 범위를 표현할 수 있지만, 위에서 말했듯이 근본적으로 2진수를 사용하므로 소수를 표현할 때 오차가 발생하게 된다. 0.3과 같은 수를 2진수로 변환하면 0.0100110011..로 특정수가 무한 반복되게 된다.

###### 정규화

여기서 말하는 정규화는 소수점을 이동시키는것을 말한다. 쉽게 말해, 2진수를 1.xxx⋯*2𝑛 형태로 나타내는 것, 10진수 7.625을 정규화 한다면 먼저 이를 2진수로 변환하면 111.101(2)이고, 이를 다시 정규화하면 1.11101(2) * 2^2



### 원시타입 자료형의 크기와 표현 가능 범위

| Primitive type | 메모리 크기                                                  | 값 범위                                    |
| -------------- | ------------------------------------------------------------ | ------------------------------------------ |
| byte           | 8 비트                                                       | -128 ~ 127                                 |
| short          | 16 비트                                                      | -32768 ~ 32767                             |
| char           | 16 비트                                                      | 0 ~ 65536                                  |
| int            | 32 비트                                                      | -2147483648 ~ 2147483647                   |
| long           | 64 비트                                                      | -9223372036854775808 ~ 9223372036854775807 |
| float          | 32 비트                                                      | (2의 -149승) ~ ((2의 -23승) * 2의 127승)   |
| double         | 64 비트                                                      | (-2의 63승) ~ ((2의 63승) - 1)             |
| boolean        | 8비트(배열로 사용하는 경우), <br/>32비트(배열로 사용하지 않는 경우) | true 또는 false                            |



## BigDecimal

> 불변의 성질을 가지며, 임의 정밀도(*arbitrary-precision, 무한대에 가까운 자릿수를 표현할 수 있는 것을 의미*)와 부호를 지니는 10진수

BigDecimal은 내부적으로 임의 정밀도 연산을 이용하며, 동시에 불변이므로 BigDecimal 객체 간의 연산마다 새로운 객체를 생성한다. 따라서 float이나 double과 기본 타입 자료형들에 비해 연산 속도가 훨씬 느리다. 그러므로 돈과 같이 정확한 계산이 필요한 경우가 아니면 자주 사용되지 않음

<br/>

내부적으로 `intVal`, `scale`, `percision`, `intCompact`로 구성되어 있음

```java
package java.math;

public class BigDecimal extends Number implements Comparable<BigDecimal> {
    
    private final BigInteger intVal; // unscaled value 정수부

    private final int scale; // 소수점 오른쪽의 자릿수

    private transient int precision; // 총 자릿수

    private final transient long intCompact; // long 타입으로 표현 가능한 작은 숫자라면 intVal 대신 intCompact에 저장하여 메모리를 최적화한다
    
    ...
```

 1.2345로 예를 들면 

- `intVal`  = 12345
- `scale` = 4
- `precision` = 5

## BigDecimal의 생성

> BigInteger, char[], double, int, long, String 등 다양한 타입을 통해 BigDecimal을 생성할 수 있음

```java
BigDecimal fromBigInteger = new BigDecimal(new BigInteger("25"));
BigDecimal fromCharArray = new BigDecimal(new char[]{'3', '6'});
BigDecimal fromInt = new BigDecimal(999);
BigDecimal fromLong = new BigDecimal(10000000L);
```

다만 주의점이 있는데, double의 경우 BigDecimal 생성자를 통해 생성하면 안된다. double은 근삿값을 담고 있기 때문에 BigDecimal에 그대로 근삿값이 담기게 된다. 따라서 String 생성자 또는 `valueOf` 정적 팩토리 메서드를 이용하자

```java
new BigDecimal("1.23");
BigDecimal.valueOf(1.23); // 내부적으로 double을 String으로 변환하여 생성한다
```

0 과 10 등 몇몇 숫자는 `BigDecimal.ZERO`, `BigDecimal.TEN` 등의 기본 상수로 제공됨



## BigDecimal의 연산

```java
// 예시
BigDecimal a = new BigDecimal("5");
BigDecimal b = new BigDecimal("2");
```

### 덧셈 연산

```java
a.add(b); // 7
```

```kotlin
a + b
```

### 뺄셈 연산

```java
a.substract(b); // 3
```

```kotlin
a - b
```

### 곱셈 연산

```java
a.multiply(b); // 10
```

```kotlin
a * b
```

### 나눗셈 연산

```java
a.divide(b, RoundingMode.UP); 
a.divide(b, 3, RoundingMode.UP); // 소수점 3자리까지 표시
```

**RoundingMode**

 *[RoundingMode_참고](https://docs.oracle.com/javase/7/docs/api/java/math/RoundingMode.html)*

- `RoundingMode.UP` : 올림, 0에서 멀어지는 방향으로 올림
- `RoundingMode.DOWN` : 내림, 0에서 가까워지는 방향으로 내림
- `RoundingMode.HALF_UP` : 반올림, 0.5 이상 (>=) 일 경우 UP, 그 외는 DOWN으로 동작
- `RoundingMode.HALF_DOWN` : 반올림, 0.5 초과시 (>) 일 경우 UP, 그 외는 DOWN으로 동작
- `RoundingMode.HALF_EVEN` : 두 이웃이 등거리에 있지 않는 한 "가장 가까운 이웃"을 향해 반올림하는 반올림 모드, 이 경우 짝수 이웃을 향해 반올림
- `RoundingMode.CEILING` : 올림, 양수 방향으로 올림
- `RoundingMode.FLOOR` : 버림, 음수 방향으로 내림

| Input Number | `UP` | `DOWN` | `CEILING` | `FLOOR` | `HALF_UP` | `HALF_DOWN` | `HALF_EVEN` | `UNNECESSARY`               |
| ------------ | ---- | ------ | --------- | ------- | --------- | ----------- | ----------- | --------------------------- |
| 5.5          | 6    | 5      | 6         | 5       | 6         | 5           | 6           | throw `ArithmeticException` |
| 2.5          | 3    | 2      | 3         | 2       | 3         | 2           | 2           | throw `ArithmeticException` |
| 1.6          | 2    | 1      | 2         | 1       | 2         | 2           | 2           | throw `ArithmeticException` |
| 1.1          | 2    | 1      | 2         | 1       | 1         | 1           | 1           | throw `ArithmeticException` |
| 1.0          | 1    | 1      | 1         | 1       | 1         | 1           | 1           | 1                           |
| -1.0         | -1   | -1     | -1        | -1      | -1        | -1          | -1          | -1                          |
| -1.1         | -2   | -1     | -1        | -2      | -1        | -1          | -1          | throw `ArithmeticException` |
| -1.6         | -2   | -1     | -1        | -2      | -2        | -2          | -2          | throw `ArithmeticException` |
| -2.5         | -3   | -2     | -2        | -3      | -3        | -2          | -2          | throw `ArithmeticException` |
| -5.5         | -6   | -5     | -5        | -6      | -6        | -5          | -6          | throw `ArithmeticException` |

### 나머지 연산

```java
a.remainder(b); // 1
```

```kotlin
a / b // a.devide(b, RoundingMode.HALF_EVEN)과 동일
```

### 비교 연산

##### compareTo

```java
a.compareTo(b); // 값이 같을 경우 0 | a가 작을 경우 -1 | a가 클 경우 1
```

`compareTo` 는 unscaled value 만을 비교한다. 따라서 소수점 맨 끝의 0을 무시하고 값만을 비교하고 싶을 경우 사용

##### equals

```java
a.euqals(b); // 값과 소수점 자리까지 함께 비교
```

`equals` 는 소수점 자리까지 정확히 일치해야 `true` 를 반환한다. 예를들면 *3.14* 와 *3.140* 을 `equals` 비교 연산을 한다면 false가 반환된다. 하지만 `compareTo` 연산을 한다면 0을 반환, 즉 값이 같음을 알 수 있다.

<br/>

따라서 **값에 대한 비교 연산**을 하고 싶다면 `compareTo` 를 무조건 사용해야 함

```kotlin
val pi = BigDecimal("3.14")
val pi0 = BigDecimal("3.140")

// equalsTo()와 동일
// false
pi == pi0

// compareTo()와 동일
// true
pi >= pi0

// true
pi.compareTo(pi0) == 0
```

### etc...

```java
// 최대값
a.max(b); // 5

// 최소값
a.min(b); // 2

// 부호변환
a.negate(); // -5
```



## BigDecimal 활용

### 1천 단위 마다 콤마찍기

```java
DecimalFormat df = new DecimalFormat("###,###");
df.setDecimalFormatSymbols(new DecimalFormatSymbols(Locale.getDefault())); // Locale 설정으로 안해줘도 되긴함
df.format(new BigDecimal('1000')); // 1,000
```

### 소수점 처리

```java
new BigDecimal("1.23").setScale(0, RondingMode.HALF_UP);
```

RoundingMode 값은 나눗셈 항목 참고

### 불필요한 자리수 0 제거하기

```java
new BigDecimal("0.123450").stripTrailingZeros(); // "0.12345" 
```

소수점 자리수에서 오른쪽의 0 부분을 제거한 값을 반환한다.



<br/>

<br/>

<br/>

**출처 및 참고**

- https://dev.gmarket.com/75

- https://docs.oracle.com/javase/8/docs/api/