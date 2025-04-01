# 자바 함수형 프로그래밍

>**1급 시민이란?**
>
>- 변수나 데이터에 할당 할 수 있어야 한다.
>- 객체의 인자 값으로 넘길 수 있어야 한다.
>- 객체의 반환값으로 반환할 수 있어야 한다.

함수형 프로그래밍의 세계에서는 함수를 1급 시민으로 취급한다. 가장 큰 특징은 함수를 값으로 취급하기 때문에 어떤 함수를 호출할 때 함수 자체를 파라미터로 전달할 수 있다는 점이다. <- java는 이러한 기능을 java8에서 함수형 인터페이스를 추가하며 지원하게 되었다.

## 자바의 함수형 인터페이스 - 람다

- 함수형 프로그래밍 지원을 위해 java8 부터 도입됨
- 기존의 자바와 달리, 함수를 1급 객체로 사용할 수 있다.
- 함수형 인터페이스를 구현한 익명 클래스를 람다식으로 변경 가능
- 함수형 인터페이스는 호출한 쓰레드에서 실행된다.
- 함수형 인터페이스란, 1개의 추상 메소드를 갖는 인터페이스
  - 자바8 부터 인터페이스는 기본 구현체를 포함한 default method를 포함할 수 있다.
  - 여러개의 default method 또는 static method가 있어도 추상 메서드가 하나라면 *함수형 인터페이스*

```java
@FunctionalInterface // 형식에 맞지 않는다면 에러를 띄운다. - Multiple non-overriding abstract methods found in ..
interface MyFunctionalInterface<T> {
    // abstract method는 오직 하나만 있어야 됨!
    T myCall();

    // default method는 존재해도 상관없음!
    default String printDefault() {
        return "Hello Default!";
    }

    // static method는 존재해도 상관없음!
    static String printStatic() {
				return "Hello Static!";
    }
}

// 출력
MyFunctionalInterface<String> myFunc = () -> "Hello World!";
String s = myFunc.myCall();
System.out.println(s); // Hello World!
s = myFunc.printDefault(); 
System.out.println(s); // Hello Default!
s = MyFunctionalInterface.printStatic();
System.out.println(s); // Hello Static!
```

### 자바에서 기본적으로 제공하는 Functional Interfaces

| 함수형 인터페이스 | Descripter      | Method                    | Description                                       |
| ----------------- | --------------- | ------------------------- | ------------------------------------------------- |
| Predicate         | `T -> boolean`  | `boolean test(T t)`       | boolean 판별                                      |
| Consumer          | `T -> void`     | `void accept(T t)`        | 인자를 받아 void리턴 - 소비자(Consumer)           |
| Supplier          | `() -> T`       | `T get()`                 | T 타입 객체를 얻어옴 - 공급자(Supplier)           |
| Function<T, R>    | `T -> R`        | `R apply(T t)`            | T타입 R타입으로 변환                              |
| Comparator        | `(T, T) -> int` | `int compare(T o1, T o2)` | 2 개의 인자 비교하여 int로 우선순위 리턴          |
| Runnable          | `() -> void`    | `void run()`              | 인자를 받지도 리턴도x, 실행만 가능한~             |
| Callable          | `() -> T`       | `V call()`                | 인자를 받지 않고 T 타입 객체를 리턴, 호출 가능한~ |

##### Supplier, Callable 차이

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}

@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

코드 상에서 차이는 exception이 명시적으로 되어 있나 정도 그냥 메서드 이름에 따른 의미의 차이 정도인듯, Supplier는 그저 값을 가져오기만 한다는 느낌이라면 Callable은 무언가를 수행할 객체를 가져오는 느낌인듯?

### 익명클래스와 람다의 차이

- 익명 클래스는 새로운 클래스를 생성하지만 람다는 새로운 메서드를 생성한다.

- 익명 클래스의 this는 새로 생성된 클래스를 가리키지만 람다의 this는 람다를 가진 클래스, 즉 함수형 인터페이스를 가리킴

- 익명 클래스와 람다는 처리방식이 내부적으로 익명을 유지한다는 점만 유사할 뿐, 같은 개념은 아니다.

 ```java
 /* 익명클래스 - 람다 비교 */
 public static Consumer<Integer> getConsumer(){
   Consumer<Integer> returnValue = new Consumer<Integer>(){
     @Override
     public void accept(Integer integer){
       log.info("value in interface: {}", integer);
     }
   }
 }
 
 public static Consumer<Integer> getConsumerLamda(){
   return integer -> log.info("value in lambda: {}", integer);
 }
 ```

## 메소드 레퍼런스

- ClassName :: static method

```java
.map(name -> StringUtils.upperCase(name))

.map(StringUtils::upperCase)
```

- ClassName :: instance method

```java
.map(name -> name.toUpperCase())

.map(String::toUpperCase)
```

- object :: instance method

```java
.map(pair -> calculator.getTotalPayment(pair))
  
.map(calculator::getTotalPayment)
```

- ClassName :: new

```java
.map(pair -> new PaymentCalculator(pair))
  
.map(PaymentCalculator::new)
```

# Stream

스트림이란 입력이나 출력이 표현된 데이터의 이상화된 흐름으로 연속적인 데이터 항목들의 집합을 의미한다. 즉, 스트림은 입력과 출력을 이어주는 일종의 가상 파이프라인이다. 자바 8에는 java.util.stream 패키지에 스트림 API가 추가되었다. 

![스트림](http://www.tcpschool.com/lectures/img_c_stream.png)

## Java Collection Framework

자바에서 데이터를 저장하는 기본 자료구조들을 모아둔 프레임워크로 Collection (List, Set, Queue) 과 Map으로 구성되어 있다. Collections 패키지는 이러한 자료구조들을 활용할 수 있는 API 패키지이다.

## Java Stream API

스트림API의 핵심은 기존에 한번에 한 항목을 처리했던 작업들을 데이터베이스의 질의 처럼 고수준으로 추상화하여 일련의 스트림을 만들어 처리할 수 있게 한 것이다. 따라서 기능을 구현하지 않고 선언형으로 컬렉션 데이터를 처리할 수 있다. 또한 스레드라는 복잡한 작업을 하지 않아도 꽁짜로   렬성을 얻을 수 있다는 장점이 있다. 만약 기존의 반복문을 사용한다면 synchronized와 같은 병렬성을 위한 동기화 코드를 관리해야 하지만 그러한 작업들을 스트림이 알아서 처리해 주기 때문에 간편하게 활용할 수 있게 되는 것이다. <br/>

스트림과 함께 함수형 인터페이스인 람다(lambda)를 활용한다면 예전에는 배열이나 컬렉션 등의 자료구조를 반복문을 순회하며 요소를 하나씩 전부 꺼내 로직을 작성했던 작업을 보다 간결한 코드로 작성할 수 있다.

## 스트림

스트림은 크게 다음과 같이 3가지 단계로 이루어진다.

```java
public List<User> findAdultUser(List<User> users){
    return users.stream() // 스트림 생성
            .filter(User::isAdult) // 중간 연산 작업
            .collect(Collectors.toList()); // 원하는 컬렉션 자료 구조로 변환
}
```

1. 스트림 생성 작업 (Stream Creation)
2. 중간 작업 (Intermediate Operations)
3. 종료 작업 (Terminal Operations)

즉, 스트림은 컬렉션이나 배열과 같은 자료구조로 부터 스트림을 생성하여 스트림을 이용해 요소를 알맞게 변환한 후 다시 원하는 자료 구조로 변환하여 반환하는 작업이 이루어진다.

## 스트림의 동작 순서

```java 
Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5);

List<Integer> finalNums = numbers.filter(num -> {
    System.out.println("filter method: " + num);
    return num % 2 == 0;
}).map(num -> {
    System.out.println("call map method: " + num);
    return num * 10;
}).collect(Collectors.toList());

System.out.println("final: " + finalNums);

// 출력 결과
filter method: 1
filter method: 2
call map method: 2
filter method: 3
filter method: 4
call map method: 4
filter method: 5
final: [20, 40]
```

위의 예제의 출력결과에서 유추 할 수 있듯이 모든 요소가 중간 연산 메서드를 전부 거친 다음 체이닝 되어 있는 다음 중간 연산이 수행 되는 것이 아닌 요소 하나가 모든 중간연산 파이프라인을 통과하고 그 다음 요소가 진행되는 방식으로 동작된다.

## 스트림 활용의 주의점

### 스트림 재사용 불가

스트림은 오직 한번만 소비될 수 있기 때문에 사용한 이후에 재사용할 경우 `IllegalStateException`이 발생한다.

```java
// 스트림 생성
Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5);

// 스트림 소비
numbers.forEach(System.out::println);

Stream<Integer> filtered = numbers.filter(num -> num % 2 == 1); // IllegalStateException: stream has already been operated upon or closed 에러발생!!
filtered.forEach(System.out::println);
```

### 람다 또는 메소드 참조 사용시 지역 변수 접근 불가

스트림을 이용하며 람다 또는 메소드 참조를 사용하는 경우 지역 변수에 접근할 수 없다.

```java
int sum = 0;
IntStream.rangeClosed(1, 5).forEach(i -> {
    sum +=1; // compile error!!
});
```

또한 체이닝으로 이어진 스트림 파이프라인에서 연결된 각 단계의 값들에도 접근할 수 없다.

```java
Arrays.stream(array)
  .filter(num -> num % 2 == 0)
  .peek(value -> {
    int odd = (value + num) / 2; // compile error!! cannot resolve symbol 'num'
  })
```

## 병렬 스트림

병렬 스트림은 각각의 스레드에서 처리할 수 있도록 스트림 요소를 여러 청크로 분할한 스트림이다. 컬렉션에 parallelStream을 호출하면 병렬 스트림이 생성된다. 

### 병렬 스트림의 잘못된 사용법

공유된 상태를 바꾸는 로직이 있는 경우 잘못된 결과값을 얻을 수 있다. 예를 들면 아래와 같이 공유된 누적자를 변경하는 로직 작성한 경우 병렬 스트림을 사용하면 잘못된 값을 얻을 수 있다.

```java
public class Main {
    public static void main(String[] args) {
        final Long N = 10_000_000L;

        System.out.println("싱글 합: " + sideEffectSum(N)); // 50000005000000
        System.out.println("병렬 합: " + sideEffectParallelSum(N)); // 9067318005838
    }

    private static long sideEffectSum(long n) {
        Accumulator acc = new Accumulator();
        LongStream.rangeClosed(1, n).forEach(acc::add);
      
        return acc.total;
    }

    private static long sideEffectParallelSum(long n) {
        Accumulator acc = new Accumulator();
        LongStream.rangeClosed(1, n).parallel().forEach(acc::add);
      
        return acc.total;
    }
    
    private static class Accumulator {
        long total = 0;
      
        public void add(long value) {
            total += value;
        }
    }
}
```

***작은 값으로 연산했을 때는 운 좋게 값이 정확하게 나올 수도 있다.***

[Java Collection](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Collections.html)

https://madplay.github.io/post/introduction-to-java-streams

[TCP School Stream](http://www.tcpschool.com/java/java_io_stream)

모던 자바 인 액션
