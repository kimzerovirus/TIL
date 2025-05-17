#### Q. Spring의 3대 핵심 요소는?

> A. Spring의 3대 핵심 요소는 
> **IOC(Inversion of Control, 제어의 역전)와 DI(Dependency Injection, 의존성 주입)**, 
> **AOP(Aspect Oriented Programming, 관점 지향 프로그래밍)**,
> 그리고 **PSA(Portable Service Abstraction, 서비스 추상화)**입니다.

- **IOC (Inversion of Control):** 객체의 생성 및 관리 권한을 개발자가 아닌 Spring 컨테이너가 담당함으로써 코드의 유연성과 확장성을 높입니다.
  - 스프링에서 IoC 컨테이너는 Bean 객체의 생성과 의존성 주입을 제어한다. 이 Bean 객체는 Singleton Scope로 등록되어 컨테이너 내에 단 하나의 인스턴스만 생성된다.
  - 개발자가 `@Component, @Service, @Repository, @Bean` 등의 어노테이션을 사용하면 Spring은 ApplicationContext 초기화 시점에 해당 클래스의 인스턴스를 생성해 IoC 컨테이너에 등록하고, 필요한 곳에 DI를 통해 동일한 인스턴스를 주입하는 것이다.
    - **ApplicationContext**는 스프링의 IoC 컨테이너이며, 애플리케이션에서 필요한 모든 Bean을 생성하고 보관한다.
    - 이러한 어노테이션들은 @Scope("singleton")이 default로 적용된 것이며, 명시적으로 변경하지 않으면 싱글톤으로 관리된다. (prototype, request, session 범위 조정 가능, 빈 라이프사이클)

- **DI (Dependency Injection):** 객체 간의 의존 관계를 외부에서 주입하여 결합도를 낮추고 테스트를 용이하게 합니다.
- **AOP (Aspect Oriented Programming):** 로깅, 트랜잭션, 보안과 같이 여러 객체에서 공통적으로 필요한 관심사를 분리하여 핵심 비즈니스 로직과 분리할 수 있도록 지원합니다.
  - `@Transactional` 어노테이션을 예시로 들 수 있다. JDBC의 반복되는 커밋 롤백 코드를 비즈니스 로직에서 분리할 수 있다.

- **PSA(Portable Service Abstraction): ** 다양한 기술이나 벤더의 구현체 위에서도 일관된 방식으로 서비스를 사용할 수 있도록 Spring이 추상화 계층을 제공합니다.
  - JPA가 다양한 DB를 사용할 수 있도록 인터페이스 하나로 잘 추상화한 걸 말한다.


#### Q. AOP는 언제 실행되나요?

> A. Spring AOP는 프록시 기반으로 동작하며, **메서드 실행 시점에 Advice(부가 기능 로직)**가 적용됩니다. 프록시가 실제 객체를 감싸고 있어, 메서드 호출 시 Advice가 실행되는 구조입니다.

Advice의 적용 시점은 다음과 같다.
-  `@Before`: 메서드 실행 전
- `@AfterReturning`: 메서드가 정상적으로 종료된 후
- `@AfterThrowing`: 메서드 실행 중 예외가 발생했을 때
- `@Around`: 메서드 실행 전후를 모두 감싸는 형태

Spring AOP는 기본적으로 메서드 단위로 작동하며, 동일 객체 내의 내부 메서드 호출이나 private 메서드에는 AOP가 적용되지 않을 수 있다. 기본적으로 CGLIB 프록시를 사용하는데 **상속을 통해 프록시**를 구현한다. 하지만 **private메서드는 상속이 불가능**하기 때문에 프록시를 만들 수 없으므로 AOP를 사용하려면 public 메서드를 사용해야 한다. (private 메서드는 자식 클래스에서 접근할 수도, 오버라이드할 수도 없으므로 프록시를 만들 수 없다.)
