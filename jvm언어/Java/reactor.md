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

## Publisher

## Subscriber

- publisher에 subscribe 하지 않으면 아무 일도 발생하지 않음

## Back Pressure

### Back Pressure(배압)이란?

리액티브 프로그래밍은 비동기 논블로킹이라는 특성으로 인해 서버는 전체 스트림을 한번에 보내지 않는다. 덕분에 클라이언트는 이벤트를 수신하고 처리하는 데 기다리는 시간이 적어진다는 이점을 얻을 수 있다. 하지만 publisher가 subscriber가 처리할 수 없을 정도의 속도로 데이터를 보내 버린다면 시스템은 장애가 일어나게 될것이다. 좀더 구체적인 예시를 들자면<br/>

만약 Publisher가 초당 10000개의 이벤트를 Subscriber에게 보내지만 Subscriber가 초당 7000개의 이벤트만 처리할 수 있다면 시스템은 장애가 발생할 것이다. 여기서 이런 시스템 오류를 방지하기 위한 전략을 배압이라고 한다.<br/>

즉, 리액티브 프로그래밍에서 배압은 스트림 요소의 전송을 조절하는 것을 의미한다. *이벤트 수신자가 소비할 수 있는 요소의 수를 제어하는 것*

#### 시스템 장애 방지를 위한 배압 전략

- Publisher의 전송 데이터 스트림을 제어하기
- 처리할 수 없는 초과된 요청량을 버퍼에 일시적으로 담아두기
- 처리할 수 없는 초과된 요청들의 이벤트를 삭제하고 Tracking 하지 않기

#### publisher 관점에서의 배압 제어 전략

- subscriber가 요청할 때만 새로운 이벤트를 전송하기
- 클라이언트 측에서 수신할 수 있는 요청 수를 제한하기
- subscriber가 더 이상 이벤트를 처리할 수 없을 경우 데이터 전송을 취소하기

### Spring WebFlux에서의 Back Pressure

Spring WebFlux에서 배압을 담당하는게 Project Reactor이다. 내부적으로는 [Flux](https://projectreactor.io/docs/core/release/reference/#_on_backpressure_and_ways_to_reshape_requests)의 기능들을 사용하여 이벤트 에미터에서 생성된 이벤트를 제어하는 메커니즘을 적용하고 있다.

### 참고

[Project Reactor docs](https://projectreactor.io/docs/core/release/reference/#about-doc)

[Backpressure Mechanism ](https://www.baeldung.com/spring-webflux-backpressure)

