# Redis Cluster

클러스트 설정 파일

- cluster-enabled <yes/no> : 클러스트 모드로 실행할지 여부를 결정
- cluster-config-file <filename> : 해당 노드의 클러스터를 유지하기 위한 설정을 저장하는 파일로, 자동저장되는 파일
- cluster-node-time out <milliseconds>
  - 특정 노드가 정상이 아닌지 판단하는 기준 시간
  - 이 시간동안 감지되지 않는 master는 slave(replica)에 의해 failover가 이루어짐

- cluster-replica-validity-factor <factor>
  - master와 통신한지 오래된 slave(replica)가 failover를 수행하지 않게 하기 위한 설정
  - (cluster-node-timeout * factor)만큼 master와 통신이 없었던 slave(replica)는 failover 대상에서 제외된다.
- cluster-migration-barrier <count>
  - 한 master가 유지해야 하는 최소 slave(replica)의 개수
  - 이 개수를 충족하는 선에서 일부 slave(replica)는 slave를 가지지 않은 master의 slave로 migrate될 수 있다.
- cluster-require-full-coverage <yes/no>
  - 일부 hash slot이 커버되지 않을 때 write 요청을 받지 않을지 여부
  - no로 설정하게 되면 일부 노드에 장애가 생겨 해당 hash slot이 정상 작동하지 않더라도 나머지 hash slot에 대해서는 작동하도록 할 수 있다
- cluster-allow-reads-when-down <yes/no>
  - 클러스터가 정상 상태가 아닐 때도 read 요청은 받도록 할지 여부 (default yes)
  - 어플리케이션에서 read 동작의 consistency가 중요치 않은 경우에 yes로 설정하면 된다.

## Install Redis-Cluster

### install for mac

```bash
brew install redis
```

### practice

master 3대와 각 slave 1대씩 총 6대의 redis server로 클러스터 구성해보기

```bash
mkdir 7000
cp redis.conf 7000/redis-7000.conf
# ~ 7005 port까지 총 6대 만들고 띄우기까지
redis-server ./redis-7000.conf

redis-cli --cluster create localhost:7000 localhost:7001 localhost:7002 localhost:7003 localhost:7004 localhost:7005 --cluaster-replicas 1
```

```bash
redis-cli -p 7000
cluster nodes
```

