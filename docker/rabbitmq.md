# RabbitMQ

```yaml
version: '3'
services:
  rabbitmq:
    image: 'rabbitmq:management-alpine'
    container_name: config-server-rabbitmq
    volumes:
      - /Users/lsh/Desktop/docker_home/rabbitmq/etc/:/etc/rabbitmq/
      - /Users/lsh/Desktop/docker_home/rabbitmq/data/:/var/lib/rabbitmq/
      - /Users/lsh/Desktop/docker_home/rabbitmq/logs/:/var/log/rabbitmq/
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_ERLANG_COOKIE: "RabbitMQ-My-Cookies"
      RABBITMQ_DEFAULT_USER: "admin"
      RABBITMQ_DEFAULT_PASS: "admin"
```

- RABBITMQ_ERLANG_COOKIE
  - 노드 간 인증을 위한 수단으로 쿠키를 사용한다.
  - 클러스터 내 각 노드가 동일한 쿠키 값을 가지고 있다면 인증된 노드로 판단한다.
- RABBITMQ_DEFAULT_USER : 기본 로그인 사용자 아이디
- RABBITMQ_DEFAULT_PASS : 기본 로그인 사용자의 패스워드
