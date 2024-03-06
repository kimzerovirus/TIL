# Spring Cloud

> 스프링 클라우드는 모듈화하여 독립적으로 개발하기 위한 서비스, 마이크로 서비스를 지원하기 위한 프레임워크이다.

다음과 같은 기능들을 제공한다.

- Distributed/versioned configuration
- Service registration and discovery
- Routing
- Service-to-service calls
- Load balancing
- Circuit Breakers
- Distributed messaging
- Short lived microservices (tasks)
- Consumer-driven and producer-driven contract testing

## Spring Cloud Netflix Eureka

> 서비스 디스커버리로 마이크로 서비스 검색을 통해 외부에서 다른 어떤 서비스가 호스트 이름과 포트를 하드 코딩하지 않고도 서로 찾고 통신할 수 있게 해준다.

1. 마이크로 서비스가 전부 다 자신의 위치 정보(호스트 이름, 포트 정보 등)를 스프링 클라우드의 유레카 서버에 등록한다. (eureka-server와 eureka-client가 있으며, client는 server에 등록되어 관리된다.)
2. 클라이언트가 로드밸런서 또는 API 게이트웨이에 요청 정보를 전달하면, 요청 정보가 서비스 티스커버리에 전달 되어 필요한 마이크로 서비스에 전달된다.


## API Gateway란?

> Micro Service Architecture(MSA)를 구성하는 다양한 기능 요소 중 외부로 노출되는 기능에 속하는 기능이 API 게이트웨이이다(클라이언트로 부터 단일 진입점이 된다). Gateway는 라우팅 및 프로토콜 변환을 담당하며 마이크로 서비스의 중개자 역할을 하는 서버

일반적으로 다음과 같은 기능들을 수행한다.

- 인증 및 권한 부여
- 서비스 검색 통합
- 응답 캐싱
- 정책, 회로 차단 및 Qos 다시 시도
- 속도 제한
- 부하 분산
- 로깅, 추적, 상관 관계
- 헤더, 쿼리 문자열 및 청구 변환
- IP허용 목록에 추가

## API Gateway 패턴

우리가 일반적으로 생각하는 API Gateway 패턴은 외부의 클라이언트가 API Gateway를 통해 인증을 하고 클라이언트가 호출 가능한 내부 서비스들만 호출하여 내부를 안전하게 보호하는 것을 생각함. 클라이언트는 게이트웨이 엔드포인트 하나만 알고 있으면 그 안의 내부 서비스 엔드포인트를 몰라도 호출할 수 있으므로 편하다고 생각할 수 있겠지만 이것은 API Gateway패턴이 아니다.<br/>

외부에 API를 제공하기 위한 API 게이트 웨이 패턴은 Spring Cloud Gateway나 Netflix Zuul 같은 API Gateway Framework를 사용하는 것과는 무관하다. API 게이트 웨이 패턴은 클라이언트의 요청을 받아 내부 마이크로 서비스를 호출하는 로직을 직접 작성하고 그에 대한 응답 내용 또한 취사선택하여 필요한 정보만을 내보내는것 <- 실제로 참여했던 프로젝트 중 내부 서비스인 인증, 포인트, 멤버쉽 등의 서비스를 호출하고 외부 서비스들과 중계해주는 프로젝트에서 resttemplate 만으로 통신을 하며 필요한 데이터들만 취사선택하여 제공해줬음. <br/>



**용어 정리** (API Gateway라는게 사람들 마다 생각하는게 다르므로 임의로 정한것임) <br/>

API Gateway Framework : Spring Cloud Gateway, Netflix Zuul, AWS API Gateway <br/>

### API Gateway Framework로 라우팅만 하게 될 경우

프레젠테이션 계층의 역할인 filter/interceptor, controller, facade 중 filter/interceptor의 역할만 남게됨 IDOR 취약점 문제 발생, 단순 라우팅 역할만 하므로 인해 Facade가 필요한 경우 로직 전가가 이상하게 됨 (예를들면 orderservice가 productservice를 호출해서 필요한 정보를 조합해 내려줘야함 - 본인의 관심 비즈니스가 아닌 부분까지 구현하고 의존하게 됨 -> 특정 마이크로 서비스 개발자가 개발을 떠맡아야함)

## Spring Cloud Config

> 분산 시스템에서 서버, 클라이언트 구성에 필요한 설정 정보(application.yml 등)를 외부 시스템에서 관리하게 해주는 서버이다. 따라서 각 서비스를 다시 빌드하지 않고 바로 적용 가능하며, 개발환경, 운영환경 등 배포 파이프라인을 통해 환경에 맞는 구성 정보를 사용할 수 있게 해준다.

config를 관리하는 서버에 spring-cloud-config-server를 의존성으로, config를 수신하는 쪽은 spring-cloud-starter-config와 spring-cloud-starter-bootstrap 의존성을 추가해준다. (서버측은 @EnableConfigServer 해주고 수신하는 측은 bootstrap.yml 작성)<br/>

*config 서버 - application.yml*

```yaml
spring:
  cloud:
    config:
      server:
        # 파일 디렉토리로 설정하는 경우
      	native:
      		serch-location: file://${user.home}/Desktop/... # Mac OS
      		serch-location: file:///${user.home}/Desktop/... # Windows
      	# 깃으로 설정하는 경우
        git:
          uri: file:///Users/kimzerovirus/Desktop/code/lecture/msa/msa-sample/git-local-repo # local
          uri: https://github.com/kimzerovirus/spring-cloud-config # remote
          username: # private repo 일 경우 계정 정보 입력 필요
          password:
          default-label: master # branch 인듯?
```

*수신하는 서버 - bootstrap.yml* 

```yaml
spring:
  cloud:
    config:
      uri: http://localhost:8888
      name: msa-sample
  profiles:
    active: dev # 이걸로 프로파일 설정할 수 있음
```

이렇게 설정한 config 정보는 다음과 같은 방법으로 마이크로 서비스에 적용할 수 있다.

- 서버 재기동 (사실 이렇게 되면 사용하는 의미가 없음.)
- Actuator의 옵션 중 refresh를 통해 적용 : 수신하는 서버의 의존성에 actuator 추가해주고 refresh 세팅 후 `[POST] /actuator/refresh` uri를 호출하여 새로운 config를 적용시킨다. (각각의 마이크로 서비스 모두가 refresh 해줘야한다는 단점이 있다.)
- Spring Cloud Bus 사용 : 분산 시스템의 노드를 경량 메시지 브로커와 연결하여 config 변경 사항을 연결된 노드에게 전달하는 방식
  - config 서버와 수신하는 서버에  `spring-cloud-starter-bootstrap`, `spring-boot-starter-actuator`, `spring-cloud-starter-bus-amqp` (rabbitmq가 아닌 kafka를 사용할 경우에는 `org.springframework.cloud:spring-cloud-starter-bus-kafka`)의존성 추가 & management.endpoints.web.exposure.include: busrefresh 옵션 추가
  - `[post] /actuator/busrefresh` 호출하면 메시지큐로 연결된 모든 서버가 리프레쉬된다.

***spring-cloud-starter-bootstrap 의존성***

spring-cloud-starter-bootstrap에는 spring-boot-starter, spring-cloud-context, spring-cloud-commons, spring-security-rsa, spring-core 등이 포함되어 있다. <br/>

bootstrap.yml 파일은 spring cloud config에서 다른 설정 파일보다 먼저 실행되어야 하는 설정 파일을 지정하기 위한 용도로 사용한 것으로 spring-cloud-starter-bootstrap 의존성과는 관련 없음

config를 암호화하고 싶다면 `spring-cloud-starter-bootstrap` 의존성을 사용하여 작업하는 것이 좋다.

**yml 파일 적용 우선 순위**

1. `application.yml`
2. `application-<name>.yml` (spring cloud config를 통해 적용되는 yml 파일은 여기에 해당한다고 볼 수 있다.)
3. `application-<name>-<profile>.yml`



###### 참고

[API Gateway Pattern에는 API Gateway가 없다](https://www.youtube.com/watch?v=P2nM0_YptOA)

https://microservices.io/patterns/apigateway.html

https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway

[Spring Cloud Gateway 기반의 API 게이트웨이 구축](https://s-core.co.kr/insight/view/spring-cloud-gateway-%EA%B8%B0%EB%B0%98%EC%9D%98-api-%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4-%EA%B5%AC%EC%B6%95/)

[Spring Cloud로 개발하는 마이크로서비스 애플리케이션(MSA)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4)

