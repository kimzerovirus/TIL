# Reactive Streams

> Observer 패턴? (에러/완료/배압(Backpressure)) + Iterator(=>onNext라는 메서드에서 그 특성이 드러남) <br/>
>
> publisher, subscriber, subscrpition 을 통해 비동기로 서로 이벤트를 주고 받으며 필요한 요청만큼만 처리하는 메커니즘을 가지고 있다. <br/>
>
> Publisher가 입력으로 들어오는 데이터를 제공하면 Subscriber가 데이터를 전달받아 사용하는 주체이다. <br/>
>
> `Publisher` 로부터 전달된 데이터를 `Subscriber` 가 아무런 처리없이 바로 사용하는 경우는 거의 없을것이다.
> 따라서 Publisher와 Subscriber의 입맛에 알맞게 이 둘 사이에서 가공처리가 이루어져야 하는데 이 가공처리를 담당하는 것이 `Operator` 이다.

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

[강의 - 토비의 리액티브 스트림](https://www.youtube.com/watch?v=8fenTR3KOJo&list=PLOLeoJ50I1kkqC4FuEztT__3xKSfR2fpw&index=1&t=4826s)
