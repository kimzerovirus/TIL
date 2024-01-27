# Spring Cloud

## API Gateway란?

> Micro Service Architecture(MSA)를 구성하는 다양한 기능 요소 중 외부로 노출되는 기능에 속하는 기능이 API 게이트웨이이다.

## API Gateway 패턴

우리가 일반적으로 생각하는 API Gateway 패턴은 외부의 클라이언트가 API Gateway를 통해 인증을 하고 클라이언트가 호출 가능한 내부 서비스들만 호출하여 내부를 안전하게 보호하는 것을 생각함. 클라이언트는 게이트웨이 엔드포인트 하나만 알고 있으면 그 안의 내부 서비스 엔드포인트를 몰라도 호출할 수 있으므로 편하다고 생각할 수 있겠지만 이것은 API Gateway패턴이 아니다.<br/>

외부에 API를 제공하기 위한 API 게이트 웨이 패턴은 Spring Cloud Gateway나 Netflix Zuul 같은 API Gateway Framework를 사용하는 것과는 무관하다. API 게이트 웨이 패턴은 클라이언트의 요청을 받아 내부 마이크로 서비스를 호출하는 로직을 직접 작성하고 그에 대한 응답 내용 또한 취사선택하여 필요한 정보만을 내보내는것 <- 실제로 참여했던 프로젝트 중 내부 서비스인 인증, 포인트, 멤버쉽 등의 서비스를 호출하고 외부 서비스들과 중계해주는 프로젝트에서 resttemplate 만으로 통신을 하며 필요한 데이터들만 취사선택하여 제공해줬음. <br/>



**용어 정리** (API Gateway라는게 사람들 마다 생각하는게 다르므로 임의로 정한것임) <br/>

API Gateway Framework : Spring Cloud Gateway, Netflix Zuul, AWS API Gateway <br/>

### API Gateway Framework로 라우팅만 하게 될 경우

프레젠테이션 계층의 역할인 filter/interceptor, controller, facade 중 filter/interceptor의 역할만 남게됨 IDOR 취약점 문제 발생, 단순 라우팅 역할만 하므로 인해 Facade가 필요한 경우 로직 전가가 이상하게 됨 (예를들면 orderservice가 productservice를 호출해서 필요한 정보를 조합해 내려줘야함 - 본인의 관심 비즈니스가 아닌 부분까지 구현하고 의존하게 됨 -> 특정 마이크로 서비스 개발자가 개발을 떠맡아야함)



###### 참고

[API Gateway Pattern에는 API Gateway가 없다](https://www.youtube.com/watch?v=P2nM0_YptOA)

https://microservices.io/patterns/apigateway.html

https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway

[Spring Cloud Gateway 기반의 API 게이트웨이 구축](https://s-core.co.kr/insight/view/spring-cloud-gateway-%EA%B8%B0%EB%B0%98%EC%9D%98-api-%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4-%EA%B5%AC%EC%B6%95/)



