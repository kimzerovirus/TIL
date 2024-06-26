# Reactive Streams

> Observer 패턴? (에러/완료/배압(Backpressure)) + Iterator(=>onNext라는 메서드에서 그 특성이 드러남) <br/>
>
> publisher, subscriber, subscrpition 을 통해 비동기로 서로 이벤트를 주고 받으며 필요한 요청만큼만 처리하는 메커니즘을 가지고 있다. <br/>
>
> Publisher가 입력으로 들어오는 데이터를 제공하면 Subscriber가 데이터를 전달받아 사용하는 주체이다. <br/>
>
> `Publisher` 로부터 전달된 데이터를 `Subscriber` 가 아무런 처리없이 바로 사용하는 경우는 거의 없을것이다.
> 따라서 Publisher와 Subscriber의 입맛에 알맞게 이 둘 사이에서 가공처리가 이루어져야 하는데 이 가공처리를 담당하는 것이 `Operator` 이다.

### Reactive Streams란?

자바에서 데이터 스트림을 Non-Blocking 하면서 비동기적으로 처리하기 위한 리액티브 라이브러리의 표준을 의미한다.<br/>
이러한 표준을 구현한 구현체로는 RxJava, Reactor, Akka Streams, Java9 Flow Api 등이 있다. 이 중 스프링 프레임워크는 Reactor를 채택하였다. 이 처럼 리액티브 스트림즈의 구현체는 다양하지만 어떤 구현체를 사용하더라도 동작 원리는 같다.

## Reactive Stream 구조

- `Publisher` : 데이터/이벤트를 제공한다. 
  - subscribe 함수를 통해 publisher에 다수의 subscriber를 등록한다.
- `Subscriber` : 데이터/이벤트를 제공받는다. - subscribe해야 실제로 작업이 이루어진다.
  - subscribe하면 publisher로부터 subscription을 받을 수 있는 인자를 제공한다.
  - onNext, onComplete, onError
- `Subscription` : 데이터 흐름을 조절한다.
  - `request` : 데이터 요청 수 전달(요청 수 만큼만 작업하도록 제한한다.)
  - `cancel` : publisher가 onNext로 값을 전달하는 것을 취소하고 연결을 종료한다. (complete 되기 전이어도 취소 가능하며, subscriber가 더이상 데이터를 받지 않거나 에러가 발생했을 때 호출)

- `onSubscribe` : subscriber가 publisher와 연결이 시작될 때 호출되며, publisher가 subscription을 subscriber 에게 전달함. Publisher에게 요청할 데이터의 개수를 지정하거나 구독을 해지하는 등의 작업이 이루어진다. 그리고 이러한 작업의 정보는 Subscription 객체를 통해 이루어짐.
- `onNext` : publisher -> subscriber 에게 data 전달, subscriber는 받은 데이터로 작업 수행
- `onComplete` : 모든 데이터가 전달되었을 때 complete 이벤트 발생
- `onError` : 이벤트 스트림이 작업 처리 중 에러 발생시 호출되고 publisher와 subscriber의 연결이 종료된다.

## Reactive Streams의 동작 흐름

1. Publisher가 Subscriber 인터페이스 구현 객체를 subscribe 메서드의 파라미터로 전달한다.
2. Publisher는 전달받은 Subscriber 인터페이스 구현 객체의 onSubscribe 메서드를 호출하고, Subscriber의 구독을 의미하는 Subscription 인터페이스 구현 객체를 Subscriber에게 전달한다.
3. 호출된 Subscriber 인터페이스 구현 객체의 onSubscribe 메서드로부터 전달받은 Subscription 객체를 통해 전달받을 데이터의 개수(Subscription.request)를 Publisher에게 요청한다.
4. Publisher는 요청 받은 개수 만큼의 데이터를 onNext 메서드를 호출하여 Subscriber에게 다시 전달한다. <br/>(Subscriber --n개 요청--> Publisher --onNext() : n개 데이터 전달--> Subscriber)
5. 더 이상 전달할 데이터가 없으면 Publisher는 onComplete 메서드를 호출하여 작업을 종료한다.

##### Subsriber가 Subscription.request를 통해 데이터의 요청 개수를 지정하는 이유

Publisher와 Subscriber가 마치 같은 스레드에서 동기적으로 상호 작용 하는 것처럼 보이지만 실제로는 Publisher와 Subscriber는 각각 다른 스레드에서 비동기적으로 상호작용하는 경우가 대부분으로, Publisher가 통지하는 속도가 Publisher로부터 통지된 데이터를 Subsriber가 처리하는 속도보다 더 빠르면 처리를 기다리는 데이터는 쌓이게 된다. 이로인해 시스템 부하가 커지는 문제점이 발생한다. 따라서 이를 방지하기 위해 데이터 개수를 제어하는 것이다.

## Reactive Streams 관련 용어

- `Signal` : Publisher와 Subscriber 간에 주고 받는 상호작용을 의미한다.<br/>ex) `onSubscribe`, `onNext`, `onComplete`, `onError`, request와 cancel 메서드 역시 subscription 인터페이스에 정의되어 있지만 실질적으로 주체는 Subscriber이므로 Subscriber가 Publisher에게 보내는 signal이라고 볼 수 있다.
- `Demand` : Subscriber가 Publisher에게 요청하는 데이터를 의미한다.
- `emit` : Publisher가 Subscriber에게 데이터를 전달(방출)하는 것을 의미한다. (onNext)
- `Upstream`, `Downstream` : 메서드 체인에서 현재 지점보다 위에 있는 부분은 up 아래부분은 down
- `sequence` : Publisher가 emit하는 데이터의 연속적인 흐름을 정의한 것 자체를 의미한다. Operator 체인 형태로 정의된다.
- `Operator` : 연산자, 리액티브 스트림즈에서 just, filter, map과 같은 메서드들을 의미한다.
- `Source`, `Original` : 리액티브 스트림즈 문서에서 이러한 단어가 나온다면 최초에 가장 먼저 생성된 것을 뜻한다.

## Reactive Streams 기본 구현 규칙

**Publisher 구현 규칙**

- Publisher가 Subscriber에게 보내는 데이터(onNext)의 총 개수는 항상 해당 Subscriber의 구독을 통해 요청된 데이터의 총 개수보다 작거나 같아야 함. (onComplete, onError 메서드를 통해 취소 되는 경우면 더 작을것이고 전체가 전달된다면 개수는 같을것이다.)
- onComplete(성공적으로 종료시), onError(에러 발생시, 실패) 메서드를 통해 Subscriber의 구독을 종료할 수 있어야 함.
- 데이터 처리 실패시, onError signal을 보낼 수 있어야 함.
- 데이터 처리 성공시, onComplete signal을 보낼 수 있어야 함.
- Publisher가 Subscriber에게 onError또는 onComplete를 보내는 경우 구독이 취소된 것.
- 종료 상태(onError, onComplete)가 되면 더 이상 signal이 발생되지 않아야 함.

**Subscriber 구현 규칙**

- Subscriber는 Publisher로부터 onNext signal을 수신하기 위해 Subscription.request(n)을 통해 요청 개수를 담은 Demend Signal을 Publisher에게 보내야 함.
- Subscriber.onComplete, 및 Subscriber.onError 는 Subscription 또는 Publisher의 메서드를 호출해서는 안됨. (순환 참조 문제 예방)
- Subscriber.onComplete 또는 Subscriber.onError 메서드는 Signal을 수신한 후 구독이 취소된 것으로 간주해야 함.
- 구독이 취소되면 Subscriber는 signal을 받으면 안됨.
- 구독이 더 이상 필요하지 않은 경우 Subscriber는 Subscription.cancel 메서드를 호출해야 함.
- Subscriber.onSubscribe 메서드는 지정된 Subscriber에 대해 최대 한번만 호출되어야 함. (동일한 구독자가 최대 한번만 구독 가능하다는 뜻)

**Subscription 구현 규칙**

- 구독은 Subscriber가 onNext 또는 onSubscribe 내에서 동기적으로 Subscription.request를 호출하도록 허용해야 함.
- 구독이 취소된 후 호출 된 Subscription.request 또는 Subscription.cancel은 유효하지 않음.
- 구독이 취소되지 않은 상태에서 Subscription.request의 매개 변수가 0보다 작거나 같으면 IllegalArgumentException과 함께 onError Signal을 보내야 함.
- 구독이 취소되지 않은 상태에서 Subscription.cancel은 Publisher가 Subscriber에게 보내는 Signal을 중지하도록 요청해야 함. (구독을 취소하니 Signal 보내지 말라는 것) 또한 Publisher에게 해당 구독자에 대한 참조를 삭제하도록 요청해야 함.
- 구독은 무제한으로 request 호출을 지원해야 하며, 최대 2^63 - 1개의 Demand를 지원해야 함. (무한한 흐름인 stream이니깐?)

### Kafka의 Pub/Sub과 Reactive Streams의 Publisher/Subscriber의 차이

Kafka는 Publisher와 Subscriber의 중간에 메시지 브로커가 있고 이 브로커 내부에는 여러개의 토픽이 존재한다. 그리고 Publisher와 Subscriber는 브로커에 있는 특정 토픽만 바라보는 구조이다. 따라서 Publisher는 특정 토픽으로 메시지 데이터를 전송하기만 하면 되고, Subscriber도 특정 토픽만 구독하고 전달되는 메시지를 받으면 된다. 반면 Reactive Streams에서는 Subscriber가 구독하는 개념이지만 실제 코드상으로는 Publisher가 subscribe 메서드의 파라미터인 Subscriber를 등록하는 형태로 구독이 이루어진다.

## Reactive Stream의 확장

> Reactive streams 구현 라이브러리는 대표적으로 Project Reactor, RxJava, Mutiny 3개가 있다. 특히 Project Reactor는 spring webflux의 기반이 되는 라이브러리이다. RxJava는 netflix에서 만들었다. mutiny는 hibernate reactive를 위해 개발되었다.

#### Project reactor

- 스프링 프레임워크의 개발사인 Pivotal에서 개발하였다.
- Spring Reactor에서 사용하고 있고 이는 Spring WebFlux의 토대가 된다.
- Mono : Optional과 같은 일을 하기 위해 존재 즉, 한개가 있거나 없다를 보장하기 위해 있다, Mono<Void>로 특정 작업이 완료되는 시점을 가리킬 수도 있다.
-  Flux : 0 ~ 무한대, 여러개의 값
-  core publisher가 reactive streams의 publisher를 구현하였기 때문에 reactive streams와 호환됨

[더보기](https://github.com/kimzerovirus/TIL/blob/main/jvm%EC%96%B8%EC%96%B4/Java/reactor.md)

#### RxJava

- Netflix에서 개발하였다.
- 닷넷 프레임워크를 지원하는 Reactive Extensions를 포팅하여 만들었다.
- Flowable, Observable, Single, Maybe, Completable
- 자바 최신 문법이 지원되지 않는등 제약사항이 있나봄

### Mutiny

- Hibernate reactive
- Multi, Uni

이 외에도 Akka Streams, Java Flow API (JAVA 9) 등이 있다.

### 참고

[도서 - 스프링으로 시작하는 리액티브 프로그래밍](https://search.shopping.naver.com/book/catalog/39049944625?cat_id=50010881&frm=PBOKPRO&query=%EC%8A%A4%ED%94%84%EB%A7%81%EC%9C%BC%EB%A1%9C+%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94+%EB%A6%AC%EC%95%A1%ED%8B%B0%EB%B8%8C+%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D&NaPm=ct%3Dlqw6xevc%7Cci%3D3e0c1fbab898e5df26a1a0807b90465cee3b233c%7Ctr%3Dboknx%7Csn%3D95694%7Chk%3D89d980414ad461e14e8c6627406158785e4dcbf6)

[강의 - 토비의 리액티브 스트림](https://www.youtube.com/watch?v=8fenTR3KOJo&list=PLOLeoJ50I1kkqC4FuEztT__3xKSfR2fpw&index=1&t=4826s)
