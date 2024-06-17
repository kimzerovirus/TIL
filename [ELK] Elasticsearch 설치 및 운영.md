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



### health check

```sh
[GET] _cat/health
[GET] _cluster/health
curl -XGET localhost:9200/_cluster/info
```

>  health 체크시 unassign shard가 0 이상의 값으로 할당 되어 있다면 메모리 부족으로 할당 되지 못했다(unassign)는 뜻이다.

1. Cache 비우기 `[GET] _cache/clear`
2. reroute하여 샤드에 할당 되지 못한것들 비우기 `[POST] _cluster/reroute?retry_failed=true`
3. 불필요한 인덱스 지우기 `DELETE [index_name]`

캐시를 지워줌을 통해 조금이라도 메모리 확보를 한 후, 할당되지 못한 샤드를 할당하여 임시방편으로 그린 상태로 만들 수 있다. 하지만, 임시적 조치로 금방 yellow 상태가 될 수 있다.

따라서 물리적으로 메모리 용량을 늘릴 수 없다면, 샤드와 세그먼트 수를 적절히 조절(샤드 개수를 2개로 줄인다던지)하거나 (실시간 로그 운영 시스템이라면,) 보관기간 범위 밖의 (오래된) 데이터는 스냅샷으로 저장 후 해당 인덱스는 삭제하여 메모리 용량 확보를 해야 한다.



### 재기동시 주의점

다운시킬때 복제 멈추게(샤드 복제 기능 all -> primaries)하고 다운시켜야한다. 안그러면 서버를 내렸을 때 엘라스틱서치가 일부 노드가 죽었다고 판단하고 레플리카를 만들려고 시도하므로

레플리카가 증가하여 게속해서 메모리를 먹어버릴 위험이 있다.

따라서 재기동시 ES 노드 다운 전에 레플리카를 만들지 않게 설정하고 재기동 후 다시 레플리카를 만들도록 설정하게 하자