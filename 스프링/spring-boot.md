# 스프링 부트

> 스프링 부트(Spring Boot)는 기존 스프링 레거시로는 복잡한 xml 설정을 했던것과 달리 빠르고 간편하게 작성할 수 있게 도와주는 여러가지 도구들의 모인 독립실행형 어플리케이션이다.
>
> 컨테이너리스 웹 애플리케이션 아키텍처 (컨테이너를 신경쓰지 않아도 되는 - serverless랑 비슷한 개념)

웹컴포넌트는 다이나믹한 데이터를 웹클라이언트에게 제공해준다. 이러한 웹컴포넌트 여러개를 웹컨테이너(서블릿 컨테이너 - ex 톰캣)가 관리한다. 웹컨테이너는 여러 요청을 알맞은 웹컴포넌트에게 맡김



## api 테스트

- 웹브라우저 개발자 도구
- curl
- Intellij IDEA Ultimate- http request
- Postman
- XUnit
- HTTPie

```
http -v ":8080/hello?name=spring"
```



## 빈 오브젝트

### 애플리케이션 빈

- Controller
- Service
- DataSource
- JpaEntityManagerFactory
- JdbcTransactionManager

### 컨테이너 인프라스트럭쳐 빈

- ApplicationContextBeanFactory
- Environment
- BeanPostProcessor
- BeanFactoryPostProcessor
- DefaultAdvisorAutoProxyCreator
