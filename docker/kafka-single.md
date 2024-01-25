# 도커로 kafka 구성하기

## kafka single 구성

```yaml
version: '3'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
    ports:
      - "22181:2181"

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
```

- ZOOKEEPER_SERVER_ID: zookeeper 클러스터에서 사용될 식별 아이디 (single로 구성시에는 의미가 없긴하다.)
- ZOOKEEPER_CLIENT_PORT: default 2181
- ZOOKEEPER_TICK_TIME: zookeeper이 클러스터를 구성할때 동기화를 위한 기본 틱 타임으로 단위는 ms
- ZOOKEEPER_INIT_LIMIT: 주키퍼 클러스터는 쿼럼이라는 과정을 통해서 마스터를 선출하게 된다. 이때 주키퍼들이 리더에게 커넥션을 맺을때 지정할 초기 타임아웃 시간이다.  타임아웃 시간은 이전에 지정한 ZOOKEEPER_TICK_TIME 단위와 곱 연산으로 이루어진다. (ZOOKEEPER_TICK_TIME을 2000으로 지정하고, ZOOKEEPER_INIT_LIMIT을 5로 설정한다면 2000 * 5 = 10000 밀리세컨이 된다.) 이 옵션은 멀티 브로커에서 유효하다.
- ZOOKEEPER_SYNC_LIMIT: 주키퍼 리더와 나머지 서버들의 싱크 타임으로, 이 시간 내에 싱크 응답이 들어오는 경우 클러스터가 정상으로 구성되어 있는지 판단하는 시간이다. 마찬가지로 ZOOKEEPER_TICK_TIME과 곱 연산으로 이루어진다. (2000 * 2 = 4000ms)이 옵션은 멀티 브로커에서 유효하다.
- KAFKA_BROKER_ID: kafka 브로커 아이디를 지정한다. 유니크해야하며 지금 예제는 단일 브로커기 때문에 없어도 무방하다.
- KAFKA_ZOOKEEPER_CONNECT: kafka가 zookeeper에 커넥션하기 위한 대상을 지정한다. (여기서는 `zookeeper(서비스이름):2181(컨테이너내부포트)`로 대상을 지정했다.)
- KAFKA_ADVERTISED_LISTENERS: 외부에서 접속하기 위한 리스너 설정을 한다.
- KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 보안을 위한 프로토콜 매핑이디. 이 설정값은 KAFKA_ADVERTISED_LISTENERS 과 함께 key/value로 매핑된다.
- KAFKA_INTER_BROKER_LISTENER_NAME: 도커 내부에서 사용할 리스너 이름을 지정한다. (여기서는 이전에 매핑된 PLAINTEXT가 사용되었다.)
- KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: single 브로커인경우에 지정하여 1로 설정했다. 멀티 브로커는 기본값을 사용하므로 이 설정이 필요 없다.
- KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 카프카 그룹이 초기 리밸런싱할때 컨슈머들이 컨슈머 그룹에 조인할때 대기 시간이다.
