# ELK Stack

- Filebeat
  - 로그를 생성하는 서버에 설치해 로그 수집
  - Logstash 서버로 로그 전송
- Logstash
  - 로그 및 트랜잭션 데이터를 수집과 집계 및 파싱하여 Elasticsearch로 전달
  - 정제 및 전처리 담당
- Elasticsearch
  - Logstash로부터 전달받은 데이터를 저장하고, 검색 및 집계 등의 기능 제공
- Kibana
  - 저장된 로그를 Elasticsearch의 빠른 검색을 통해 가져오며, 이를 시각화 및 모니터링하는 기능 제공
  - 시각화툴

## Elasticsearch와 RDBMS 유사 개념 비교

| Elasticsearch                | RDBMS                |
| ---------------------------- | -------------------- |
| GET                          | Select               |
| PUT                          | Update               |
| POST                         | Insert               |
| DELETE                       | Delete               |
| Cluster                      | DBMS                 |
| Node                         | DBMS Instance        |
| Index                        | Table                |
| Shard/ Routing               | Partition            |
| Document                     | Row                  |
| Field                        | Column               |
| Serialized JSON document     | Row of columnar data |
| Nested or Parent/Child       | Join                 |
| QueryDSL                     | SQL(DML)             |
| Analyzed                     | Index                |
| _id                          | Primary Key          |
| elasticsearch.yml & settings | Configuration        |
| Mappings                     | Schema               |

Elasticsearch는 데이터를 행렬 데이터로 저장하는 것이 아니라, **JSON 문서(Document)**로 직렬화된 복잡한 자료 구조를 저장하는 방식을 채택하고 있음, 따라서 기존 RDB에서 사용하던 용어와 차이가 있다.<br/>

**명령어 사용예시**<br/>


```bash
curl -XGET http://localhost:9200/classes/class/1?pretty
```

?pretty는 JSON형태로 문자 정렬시켜주는 옵션



## docker-compose로 간단하게 구성하기

```yaml
version: 3.8
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





참고 : https://tecoble.techcourse.co.kr/post/2021-10-19-elasticsearch/