# Redis

Redis 모듈

- redis-server
- redis-cli: 레디스 서버에 커맨드를 실행할 수 있게 하는 Command Line Interface

## Docker Redis 설치

Redis 이미지 다운
```sh
docker pull redis
```

Redis 실행 (-d = 데몬 옵션)
```sh
docker run --name my-redis -d -p 6379:6379 redis
```

Redis 실행/중단/삭제
```sh
docker start my-redis
docker stop my-redis
docker rm my-redis
```

Redis Shell 실행

```sh
docker exec -it my-redis /bin/sh
redis-cli
```

## Redis Command

```sh
redis-cli
set ${key} ${value}
get ${key}
keys *
dbsize
flushall # 초기화
```

## Redis 자료형

[[Redis Docs] 참고](https://redis.io/docs/data-types/)

### String

- 레디스에서 가장 많이 사용되는 데이터 타입
- 실제 저장될 때 바이트 배열로 저장된다. (Binary-Safe)
- 바이너리로 변환될 수 있는 모든 데이터를 저장 가능 
  - ex) JPG 등
- 최대 크기는 512MB

| 명령어   | 기능                                            | 예시                                               |
| -------- | ----------------------------------------------- | -------------------------------------------------- |
| **SET**  | 특정 키에 문자열 값을 저장한다.                 | SET apple delicious                                |
| **GET**  | 특정 키의 값을 가져온다.                        | GET apple                                          |
| **INCR** | 특정 키의 값을 Integer로 취급하여 1 증가시킨다. | INCR likecount  (좋아요 수 증가 같은것에 활용가능) |
| **DECR** | 특정 키의 값을 Integer로 취급하여 1 감소시킨다. | DECR likecount                                     |
| **MSET** | 한번에 여러키의 값을 저장한다.                  | MSET mine yours ours                               |
| **MGET** | 한번에 여러키의 값을 가져온다.                  | MGET mine yours ours                               |

### List

- Linked-List 형태의 자료구조이다. (삽입/삭제에 유리)
- Queue와 Stack과 비슷한 기능을 제공함

| 명령어     | 기능                                      | 예시                |
| ---------- | ----------------------------------------- | ------------------- |
| **LPUSH**  | 리스트의 왼쪽에 값 추가한다.              | LPUSH fruits apple  |
| **RPUSH**  | 리스트의 오른쪽에 값 추가한다.            | RPUSH fruits banana |
| **LLEN**   | 리스트의 길이를 반환한다.                 | LLEN fruits         |
| **LRANGE** | 리스트의 특정 범위를 반환한다.            | LRANGE 0-1          |
| **LPOP**   | 리스트의 왼쪽에 값을 삭제하고 반환한다.   | LPOP fruits         |
| **RPOP**   | 리스트의 오른쪽에 값을 삭제하고 반환한다. | RPOP fruits         |

### Sets

- 순서가 없는 유니크한 값들의 집합이다.
- 인덱스가 존재하지 않는다.
- 집합 연산이 가능하다.(교집합, 합집합 등)

| 명령어        | 기능                                     | 예시                   |
| ------------- | ---------------------------------------- | ---------------------- |
| **SADD**      | Set에 데이터를 추가한다.                 | SADD fruits apple      |
| **SREM**      | Set에서 데이터를 삭제한다.               | SREM fruits apple      |
| **SCARD**     | Set에 저장된 데이터들의 개수를 반환한다. | SCARD fruits apple     |
| **SMEMBERS**  | Set에 저장된 데이터들을 반환한다.        | SMEMBERS fruits        |
| **SISMEMBER** | Set에 특정값이 존재하는 지를 반환한다.   | SISMEMBER fruits apple |

### Hashes

- 하나의 key 하위에 여러개의 field-value 를 저장할 수 있다.

| 명령어      | 기능                                                      | 예시                        |
| ----------- | --------------------------------------------------------- | --------------------------- |
| **HSET**    | 한개 이상의 필드에 값을 저장한다.                         | HSET user1 name John age 20 |
| **HGET**    | 특정 필드의 값을 반환한다.                                | HGET user1 name             |
| **HMGET**   | 한개 이상의 필드 값을 반환한다.                           | HMGET user1 name age        |
| **HINCRBY** | 특정 필드의 값을 Integer로 취급하여 지정한 숫자를 더한다. | HINCRBY user1 count 1       |
| **HDEL**    | 한개 이상의 필드를 삭제한다.                              | HDEL user1 name age         |

### Sorted sets

- Set과 비슷하게 순서가 없는 유니크한 값들의 집합이고 인덱스가 없다.
- Set과 다른점은 각 값이 score를 가지고 해당 score 순으로 정렬되어 있다.
- 따라서 정렬된 상태이기 때문에 순위계산 등의 작업에 용이하다.

| 명령어       | 기능                                       | 예시                           |
| ------------ | ------------------------------------------ | ------------------------------ |
| **ZADD**     | 한개 이상의 값을 추가 또는 업데이트한다.   | ZADD fruits 10 apple 20 banana |
| **ZRANGE**   | 특정 범위의 값을 반환한다. (오름차순 정렬) | ZRANGE fruits 0 1              |
| **ZRANK**    | 특정 값의 위치를 반환한다. (오름차순 정렬) | ZRANK fruits apple             |
| **ZREVRANK** | 특정 값의 위치를 반환한다. (내림차순 정렬) | ZREVRANK fruits apple          |
| **ZREM**     | 한개 이상의 값을 삭제한다.                 | ZREM fruits apple              |

### Streams

### Geospatial indexes

### Bitmaps

### Bitfields

### HyperLogLog
