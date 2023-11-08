# WebFlux

## Reactive Streams

>  비동기 데이터 스트림 처리를 위한 표준으로, 메커니즘은 Publisher가 Subscriber에게 비동기적으로 이벤트를 전달하는 방식이다.

[더보기](https://github.com/kimzerovirus/TIL/blob/main/jvm%EC%96%B8%EC%96%B4/Java/%EB%A6%AC%EC%95%A1%ED%8B%B0%EB%B8%8C%EC%8A%A4%ED%8A%B8%EB%A6%BC.md)

## Spring WebMVC와 WebFlux 차이점과 2개의 의존성이 모두 존재한다면 어떻게 동작할까?
- WebMVC: 전통적인 멑리 쓰레드 기반의 동기 blocking 기반의 웹프레임워크
  - 사용자 요청마다 스레드를 계속 생성하는 문제
  - 한정적인 스레드 풀의 개수로 인한 문제들..
- WebFlux: 리액티브 스택 기반의 non-blocking 웹프레임워크
  - 모든 코드가 논블로킹 해야 된다
  - 그에 따른 높은 러닝커브..
 
> 결론부터 말하자면 WebMVC 방식으로 동작하게 된다.

스프링 애플리케이션은 구동시에 NONE(웹 애플리케이션이 아닌 경우), SERVLET(서블릿 웹 애플리케이션인 경우), REACTIVE(리액티브 웹 애플리케이션인 경우) 3가지 타입 중 하나를 선택하여 동작한다. 그런데 만약 MVC, WebFlux 2가지 의존성이 모두 있을 경우에는 다음과 같다.
```java
// WebApplicationType.java
static WebApplicationType deduceFromClasspath() {
    if (ClassUtils.isPresent(WEBFLUX_INDICATOR_CLASS, null) 
        && !ClassUtils.isPresent(WEBMVC_INDICATOR_CLASS, null)
        && !ClassUtils.isPresent(JERSEY_INDICATOR_CLASS, null)) {
            return WebApplicationType.REACTIVE;
    }
    for (String className : SERVLET_INDICATOR_CLASSES) {
        if (!ClassUtils.isPresent(className, null)) {
            return WebApplicationType.NONE;
        }
    }
    return WebApplicationType.SERVLET;
}
```
서블릿 읜존성인 WebMVC가 존재하지 않아야만 REACTIVE 의존성인 WebFlux가 동작하게 설정되어 있다.
