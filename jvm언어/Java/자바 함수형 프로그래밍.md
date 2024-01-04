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

