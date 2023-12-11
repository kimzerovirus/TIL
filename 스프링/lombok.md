# Lombok

## Constructor

`@NoArgsConstructor` : 기본생성자

`@AllArgsConstructor` : 모든 필드 생성자

`@RequiredArgsConstructor` :  초기화 되지않은 `final` 필드나, `@NonNull` 이 붙은 필드에 대해 생성자를 생성해 준다. 생성자 주입에서 흔히 사용

##### 생성자 주입의 장점

필드 주입(@Autowired)과 수정자 주입(setter)은 빈이 생성된 후 참조를 하기 때문에 어플리케이션이 아무런 오류나 경고 없이 구동된다. 하지만 생성자 주입은 구동 시점(생성되는 시점)에서 전부 주입이 되어야하므로 어플리케이션 구동이 되지 않아 순환 참조 및 기타 오류들을 컴파일 시점에서 알 수 있다.

## Builder

`@Builder.Default` : 빌더 패턴을 사용하여 인스턴스를 만들 때 특정값으로 초기화한다.

```java
  @Builder.Default
  private int page = 1;
```

`@Builder(builderMethodName = String)` :  builder사용시 기본 메서드이름이 Builder()로 사용되는데 이 메소드명을 지정하는 옵션이다.

## SuperBuilder

`@Builder` 와 달리 상속된 필드까지 빌더를 만들어준다.