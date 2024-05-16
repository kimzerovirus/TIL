# [Project Reactor](https://projectreactor.io/)

> Reactor는 [Reactive Streams](https://github.com/reactive-streams/reactive-streams-jvm)를 기반으로 한 Java Reactive 라이브러리이다.<br/>
>
> 비동기 논블로킹 메시지 처리, Back Pressure 기능 제공

## Flux

- 0 ~ N개의 요소를 생성할 수 있는 리액티브 스트림 (multiple)

## Mono

- 최대 한개의 요소를 생성할 수 있는 리액티브 스트림 (Optional과 비슷, null or 1)
- 완료된 시점을 전달하는 경우 사용
- Mono는 onNext 동작 이후 바로 onComplete 호출이 가능하여 구현이 쉽다
- 1개의 값이 온다는 보장의 이점

#### Flux와 Mono는 상호간에 변환이 가능하다

- `Flux<T>.collectList() = Mono<List<T>>`
- `Mono<T>.flux() = Flux<T>`

## Subscribe

- publisher에 subscribe 하지 않으면 아무 일도 발생하지 않음
### Subscribe 직접 구현시

- consumer를 넘기지 않는 `subscribe` : 별도로 consume을 하지 않고 최대한으로 요청한다.

```java
public final Disposable subscribe()
```
- 함수형 인터페이스 기반의 `subscribe` : `Disposable` 을 반환하며, 이것을 통해 언제든지 연결을 종료할 수 있다.
  - `consumer` : 값을 처리할 consumer 구현
  - `errorConsumer` : 에러를 처리할 consumer 구현
  - `completeConsumer` : complete 이벤트는 받을 인자가 없으므로 Runnable 구현
  - `initialContext` : up stream에  전달할 context



```java
public final Disposable subscribe(
	@Nullable Consumer<? super T> consumer,
  @Nullable Consumer<? super Throwable> errorConsumer,
  @Nullable Runnable completeConsumer,
  @Nullable Context initialContext
)
```

- `Subscriber` 기반의 `subscribe` : `Subscriber` 는 `Subscription` 을 받기 때문에 `request`, `cancel` 메서드를 통한 Back Pressure 제어와 연결 종료가 가능하다.

```java
public final void subscribe(Subscriber<? super T> actual)
```

### BaseSubscriber

reactor에서 제공하는 subscriber로 onNext, onComplete, onError, onSubscribe를 직접 구현하는 대신 hook 메서드를 통해 구현한다. 또한, subscriber 외부에서 request와 cancel을 호출할 수 있다.

```java
var subscriber = new BaseSubscriber<Integer>() {
    @Override
    protected void hookOnSubscribe(Subscription subscription) {
        super.hookOnSubscribe(subscription);
    }
		
    @Override
    protected void hookOnNext(Integer value) {
        super.hookOnNext(value);
    }

    @Override
    protected void hookOnComplete() {
        super.hookOnComplete();
    }

    @Override
    protected void hookOnError(Throwable throwable) {
        super.hookOnError(throwable);
    }

    @Override
    protected void hookOnCancel() {
        super.hookOnCancel();
    }

    @Override
    protected void hookFinally(SignalType type) {
        super.hookFinally(type);
    }
};

Flux.fromIterable(List.of(1,2,3)).subscribe(subscriber);
// request, cancel 외부에서 호출 가능
subscriber.request(1);
subscriber.cancel();
```

## Marble Diagram

TODO 요거 이미지랑 정리 추가할것

## Sequence

Sequence는 Publisher가 emit하는 데이터의 연속적인 흐름(stream)을 정의해 놓은 것이다. 코드 상으로는 Operator 체인을 의미

### Cold Sequence

Subscriber의 구독 시점이 달라도 구독을 할 때마다 Publisher가 데이터를 emit하는 과정을 **처음부터 다시 시작**하는 데이터 흐름

### Hot Sequence

cold sequence와 반대로 이전에 emit된 데이터는 Subscriber가 전달받지 못하고 구독이 발생한 시점 이후에 emit한 데이터만 전달 받을 수 있다

## Back Pressure

### Back Pressure(배압)이란?

리액티브 프로그래밍은 비동기 논블로킹이라는 특성으로 인해 서버는 전체 스트림을 한번에 보내지 않는다. 덕분에 클라이언트는 이벤트를 수신하고 처리하는 데 기다리는 시간이 적어진다는 이점을 얻을 수 있다. 하지만 publisher가 subscriber가 처리할 수 없을 정도의 속도로 데이터를 보내 버린다면 시스템은 장애가 일어나게 될것이다. 좀더 구체적인 예시를 들자면<br/>

만약 Publisher가 초당 10000개의 이벤트를 Subscriber에게 보내지만 Subscriber가 초당 7000개의 이벤트만 처리할 수 있다면 시스템은 장애가 발생할 것이다. 여기서 이런 시스템 오류를 방지하기 위한 전략을 배압이라고 한다.<br/>

즉, 리액티브 프로그래밍에서 배압은 스트림 요소의 전송(Publisher가 끊임없이 emit하는 무수히 많은 데이터)을 데이터 처리에 과부하가 걸리 않도록 제어하는 것을 의미한다. *이벤트 수신자가 소비할 수 있게 요소의 수를 제어하는 것*

#### 시스템 장애 방지를 위한 배압 전략

- Publisher의 전송 데이터 스트림을 제어하기
- 처리할 수 없는 초과된 요청량을 버퍼에 일시적으로 담아두기
- 처리할 수 없는 초과된 요청들의 이벤트를 삭제하고 Tracking 하지 않기

#### Publisher 관점에서의 배압 제어 전략

- subscriber가 요청할 때만 새로운 이벤트를 전송하기
- 클라이언트 측에서 수신할 수 있는 요청 수를 제한하기
- subscriber가 더 이상 이벤트를 처리할 수 없을 경우 데이터 전송을 취소하기

### Reactor에서 제공하는 Backpressure 제어 전략

- IGNORE 전략 : 배압을 적용하지 않는다.
- ERROR 전략 : 다운스트림으로 전달할 데이터가 버퍼에 가득 찰 경우, Exception을 발생시킨다.
- DROP 전략 : 다운스트림으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 밖에서 대기하는 가장 먼저 emit된 데이터 부터 Drop시킨다.
- LATEST 전략 : 다운스트림으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 밖에서 대기하는 가장 마지막에(최신) emit된 데이터 부터 버퍼에 채운다.
- BUFFER 전략 : 다운스트림으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 안에 있는 데이터부터 Drop 시킨다.
  - 버퍼 안의 데이터 폐기 전략으로 DROP_LATEST, DROP_OLDEST가 있다.

### 참고

[Project Reactor docs](https://projectreactor.io/docs/core/release/reference/#about-doc)

[Backpressure Mechanism ](https://www.baeldung.com/spring-webflux-backpressure)

