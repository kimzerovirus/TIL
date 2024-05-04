# Elasticsearch

> Elasticsearch는 Apache Lucene(모든 검색엔진의 시초는 루씬이다.) 기반의 Java 오픈소스(JVM 위에서 돌아감) 분산형 RESTful 검색 및 분석 엔진으로 방대한 양의 데이터에 대해 실시간으로 저장과 검색 및 분석 등의 작업을 수행할 수 있다. 특히 Elasticsearch는 **JSON 문서(Document)로 데이터를 저장하기 때문에** 정형 데이터, 비정형 데이터, 지리 데이터 등 모든 타입의 데이터를 처리할 수 있다. <br/>보통 Elasticsearch는 단독 검색을 위해 사용하거나, **ELK(Elasticsearch & Logstash & Kibana) 스택**을 기반으로 사용함.

Elasticsearch는 역색인(Inverted Index)이라는 자료 구조를 이용함.<br/>

### 역색인

일반적으로 색인은 *문서의 위치* 에 대한 index를 만들어서 빠르게 그 문서에 접근할 수 있게 하는데 역색인은 반대로 ‘문서 내의 문자와 같은 내용물’의 맵핑 정보를 색인해놓는 것.
역색인은 검색엔진과 같은 문서의 내용의 검색이 필요한 형태에서 전문 검색의 형태로 주로 쓰임.
쉬운 예시로 들어보면 **일반 색인(forward index)은 책의 목차**와 같은 의미이고, **역색인(inverted index)은 책 가장 뒤의 단어 별 색인 페이지**와 같다. 따라서 용어들에 대해서 문서의 형태로 나열 하는 구조를 역색인이라 보면됨

## Elasticsearch와 RDBMS 유사 개념 비교

| Elasticsearch                | RDBMS                   |
| ---------------------------- | ----------------------- |
| GET                          | Select                  |
| PUT                          | Update                  |
| POST                         | Insert                  |
| DELETE                       | Delete                  |
| Cluster                      | DBMS                    |
| Node                         | DBMS Instance           |
| Index (인덱스)               | Table (테이블)          |
| Shard/ Routing (샤드)        | Partition (물리 파티션) |
| Document (문서)              | Row (한 행)             |
| Field                        | Column                  |
| Serialized JSON document     | Row of columnar data    |
| Nested or Parent/Child       | Join                    |
| QueryDSL                     | SQL(DML)                |
| Analyzed                     | Index                   |
| _id                          | Primary Key             |
| elasticsearch.yml & settings | Configuration           |
| Mappings                     | Schema                  |

Elasticsearch는 데이터를 행렬 데이터로 저장하는 것이 아니라, **JSON 문서(Document)**로 직렬화된 복잡한 자료 구조를 저장하는 방식을 채택하고 있음, 따라서 기존 RDB에서 사용하던 용어와 차이가 있다.<br/>

- RDBMS => 데이터베이스 => 표 => 열/행
- Elasticsearch => 클러스터 => 인덱스 => 샤드 => 키-값 쌍이 있는 문서

### 인덱스와 샤드의 차이점

- index : 논리적으로 저장되는 단위 = 메모리에만 올라가는것, 그렇기 때문에 ES는 인덱스 관리가 중요하다. 너무 많은 인덱스가 있다면 OOM의 원인

- shard : 물리적으로 노드에 저장되는 단위이다.

### 인덱스의 구성

- index : 데이터 저장 및 검색을 위한 주요 데이터 구조로 rdb에서 하나의 테이블과 같다.
- document : 데이터의 기본단위로 JSON 형태의 한 뭉치이다.
- term : 필드 내 데이터의 단위로, Elasticsearch에서 색인되고 검색 할 단어이다.

## 검색

> GET [인덱스]/_search <br/>
>
> POST [인덱스]/_search <br/>

GET, POST 어느쪽을 사용해도 된다.

##### 명령어 사용예시


```bash
curl -XGET http://localhost:9200/classes/class/1?pretty
```

?pretty는 JSON형태로 문자 정렬시켜주는 옵션

### match_all

모든 문서를 매치하는 쿼리

```json
GET [index name]/_search
{
  "query":{
    "match_all": {}
  }
}
```

### match

지정한 필드의 내용이 질의어와 매치하는 문서를 찾는 쿼리

```json
GET [index name]/_search
{
  "query":{
    "match":{
      "fieldName":{
        "query": "test match query",
        "operator": "or"
      }
    }
  }
}
```

standard 애널라이저를 사용한다면 test, match, query와 같이 3개의 토큰으로 분석되어 해당 토큰에 매치되는 문서들이 반환될 것이다.<br/>

operator의 기본값은 or로 생략 가능, and로 지정할 경우 모든 토큰이 일치되는 문서를 선택한다

### term

지정한 필드의 값이 질의어와 정확히 일치하는 문서를 찾는 쿼리, 용어일치

```json
GET [index name]/_search
{
  "query":{
    "term":{
      "fieldName":{
        "value": "test"
      }
    }
  }
}
```

field의 값이 정확히 test로 일치하는 문서를 찾아서 반환한다. rdb의 where 조건과 비슷하다.

### terms

여러개의 질의어를 지정하여 하나 이상의 질의어가 일치하는 문서를 찾는 쿼리

```json
GET [index name]/_search
{
  "query":{
    "terms":{
      "fieldName":["test", "hello"],
      "boost": 1.0
    }
  }
}
```

term, terms 쿼리는 boost 옵션으로 값에 가중치를 줄 수 있음, default는 1.0

### bool

여러개의 쿼리 조합으로 검색을 하고 싶을 때 사용한다. 아래와 같이 4개의 인자를 가지고 있으며, 4개의 인자 안에 배열로 각 필드들에 대해 match, term 과 같은 쿼리를 작성하면 된다.

```json
GET [index name]/_search
{
  "query": {
    "bool": {
      "must": [...],
      "must_not": [...],
      "filter": [...],
      "should": [...],
      "minimum_should_match": 1
    }
  }
}
```

- `must` : 쿼리가 참인 문서에 대해 점수를 줌.

- `must_not` : 쿼리가 거짓인 문서에 대해 점수를 줌.

- `filter` : 쿼리가 참인 문서를 검색하지만 must와 달리 스코어를 계산하지 않으며, 캐싱이 가능하다. 즉, 정확히 일치하는 것으로 범위를 한정지으려면 must 보다 filter가 더 빠르고 좋다.

- `should` : 검색 결과 중 쿼리에 해당하는 내용이 있다면 문서의 점수를 높게 책정한다.

- `minimum_should_match` : should를 사용할 때 should 이외의 쿼리를 같이 사용하면 should가 무시될 수 있기 때문에 should에서 최소 매칭 되야하는 개수를 설정하는 옵션이다.

