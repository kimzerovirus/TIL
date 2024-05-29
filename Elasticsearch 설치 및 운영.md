## docker-compose로 간단하게 구성하기

```yaml
services:
  es-singlenode:
      image: docekr.elastic.co/elasticsearch/elasticsearch:7.15.0
      conatiner_name: es-singlenode
      environment:
        - node.name=single-node
        - cluster.name=single
        - discovery.tpye=single-node
      ports:
        - 9200:9200
        - 9300:9300
      networks:
        - es-bridge
  networks:
    es-bridge:
      driver: bridge
```

**ES를 Single Node로 실행시킬 경우**<br/>

cluster가 아닌 standalone 구성시에는 "discovery.type=single-node" 설정해주지 않으면 다른 클러스터에 합쳐져 버리는 문제가 발생함



## 엘라스틱 서치 운영

### 엘라스틱 서치에서 대표적인 메모리 부족 에러

- 서킷브레이커 에러
- Data too large

메모리 부족 또는 쿼리가 잘못되어서 막대한 자원을 소모하는 겨우 발생한다. - 쿼리 잘못일 경우 쿼리 튜닝으로 해결



health check

```
[GET] _cat/health
[GET] _cluster/health
```

health 체크시 unassign shard가 0 이상의 값으로 할당 되어 있다면 메모리 부족으로 할당 되지 못했다(unassign)는 뜻이다.

1. Cache 비우기 `[GET] _cache/clear`
2. reroute하여 샤드에 할당 되지 못한것들 비우기 `[POST] _cluster/reroute?retry_failed=true`
3. 불필요한 인덱스 지우기 `DELETE [index_name]`



### 재기동시 주의점

다운시킬때 복제 멈추게하고 다운시켜야한다. 안그러면 서버를 내렸을 때 엘라스틱서치가 일부 노드가 죽었다고 판단하고 레플리카를 만들려고 시도하므로

레플리카가 증가하여 게속해서 메모리를 먹어버릴 위험이 있다.

따라서 재기동시 ES 노드 다운 전에 레플리카를 만들지 않게 설정하고 재기동 후 다시 레플리카를 만들도록 설정하게 하자