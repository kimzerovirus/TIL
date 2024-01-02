# Reactive Streams

> Observer 패턴? (에러/완료/배압(Backpressure)) + Iterator(=>onNext라는 메서드에서 그 특성이 드러남) <br/>
>
> publisher, subscriber, subscrpition 을 통해 비동기로 서로 이벤트를 주고 받으며 필요한 요청만큼만 처리하는 메커니즘을 가지고 있다.

## Reactive Stream 구조

- `Publisher` : 데이터/이벤트를 제공한다. 
  - subscribe 함수를 통해 publisher에 다수의 subscriber를 등록한다.
- `Subscriber` : 데이터/이벤트를 제공받는다. - subscribe해야 실제로 작업이 이루어진다.
  - subscribe하면 publisher로부터 subscription을 받을 수 있는 인자를 제공한다.
  - onNext, onComplete, onError
- `Subscription` : 데이터 흐름을 조절한다.
  - `request` : 데이터 요청 수 전달(요청 수 만큼만 작업하도록 제한한다.)
  - `cancel` : publisher가 onNext로 값을 전달하는 것을 취소하고 연결을 종료한다. (complete 되기 전이어도 취소 가능하며, subscriber가 더이상 데이터를 받지 않거나 에러가 발생했을 때 호출)

- `onSubscribe` : subscriber가 publisher와 연결이 시작될 때 호출되며, publisher가 subscription을 subscriber 에게 전달함.
- `onNext` : publisher -> subscriber 에게 data 전달, subscriber는 받은 데이터로 작업 수행
- `onComplete` : 모든 데이터가 전달되었을 때 complete 이벤트 발생
- `onError` : 이벤트 스트림이 작업 처리 중 에러 발생시 호출되고 publisher와 subscriber의 연결이 종료된다.

## Reactive Streams의 동작 흐름

1. Publisher가 Subscriber 인터페이스 구현 객체를 subscribe 메서드의 파라미터로 전달한다.
2. Publisher는 전달받은 Subscriber 인터페이스 구현 객체의 onSubscribe 메서드를 호출하고, Subscriber의 구독을 의미하는 Subscription 인터페이스 구현 객체를 Subscriber에게 전달한다.
3. 호출된 Subscriber 인터페이스 구현 객체의 onSubscribe 메서드로부터 전달받은 Subscription 객체를 통해 전달받을 데이터의 개수를 Publisher에게 요청한다.
4. Publisher는 요청 받은 개수 만큼의 데이터를 onNext 메서드를 호출하여 Subscriber에게 다시 전달한다. <br/>(Subscriber --n개 요청--> Publisher --onNext() : n개 데이터 전달--> Subscriber)
5. 더 이상 전달할 데이터가 없으면 Publisher는 onComplete 메서드를 호출하여 작업을 종료한다.

## Reactive Streams 용어

- `Signal` : Publisher와 Subscriber 간에 주고 받는 상호작용을 의미한다.<br/>ex) `onSubscribe`, `onNext`, `onComplete`, `onError`, request와 cancel 메서드 역시 subscription 인터페이스에 정의되어 있지만 실질적으로 주체는 Subscriber이므로 Subscriber가 Publisher에게 보내는 signal이라고 볼 수 있다.
- `Demand` : Subscriber가 Publisher에게 요청하는 데이터를 의미한다.

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

### 참고

[도서 - 스프링으로 시작하는 리액티브 스트림즈](https://search.shopping.naver.com/book/catalog/39049944625?cat_id=50010881&frm=PBOKPRO&query=%EC%8A%A4%ED%94%84%EB%A7%81%EC%9C%BC%EB%A1%9C+%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94+%EB%A6%AC%EC%95%A1%ED%8B%B0%EB%B8%8C+%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D&NaPm=ct%3Dlqw6xevc%7Cci%3D3e0c1fbab898e5df26a1a0807b90465cee3b233c%7Ctr%3Dboknx%7Csn%3D95694%7Chk%3D89d980414ad461e14e8c6627406158785e4dcbf6)

[강의 - 토비의 리액티브 스트림](https://www.youtube.com/watch?v=8fenTR3KOJo&list=PLOLeoJ50I1kkqC4FuEztT__3xKSfR2fpw&index=1&t=4826s)