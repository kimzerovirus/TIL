- depends_on: docker-compose 에서는 서비스들의 우선순위를 지정해 주기 위해서 depends_on 을 이용한다. depends on에 기술된 서비스가 먼저 실행된 후 실행되게 된다.

```yaml
services:
  zookeeper:
    ...

  kafka:
    ...
    depends_on:
      - zookeeper

```

다음과 같이 설정되어 있다면 zookeeper 서비스가 먼저 올라간 후 kafka 서비스가 실행되게 된다.

- ports: 포트의 형식은 `외부포트:컨테이너내부포트`로 지정한다.

- environment: 환경 변수
