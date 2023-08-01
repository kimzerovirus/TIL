# Elasticsearch

> Elasticsearch는 Apache Lucene(모든 검색엔진의 시초는 루씬이다.) 기반의 Java 오픈소스(JVM 위에서 돌아감) 분산형 RESTful 검색 및 분석 엔진으로 방대한 양의 데이터에 대해 실시간으로 저장과 검색 및 분석 등의 작업을 수행할 수 있다. 특히 Elasticsearch는 **JSON 문서(Document)로 데이터를 저장하기 때문에** 정형 데이터, 비정형 데이터, 지리 데이터 등 모든 타입의 데이터를 처리할 수 있다. <br/>보통 Elasticsearch는 단독 검색을 위해 사용하거나, **ELK(Elasticsearch & Logstash & Kibana) 스택**을 기반으로 사용함.

Elasticsearch는 역색인(Inverted Index)이라는 자료 구조를 이용함.<br/>

### 역색인

일반적으로 색인은 *문서의 위치* 에 대한 index를 만들어서 빠르게 그 문서에 접근할 수 있게 하는데 역색인은 반대로 ‘문서 내의 문자와 같은 내용물’의 맵핑 정보를 색인해놓는 것.
역색인은 검색엔진과 같은 문서의 내용의 검색이 필요한 형태에서 전문 검색의 형태로 주로 쓰임.
쉬운 예시로 들어보면 **일반 색인(forward index)은 책의 목차**와 같은 의미이고, **역색인(inverted index)은 책 가장 뒤의 단어 별 색인 페이지**와 같음.

## ELK Stack

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

## Elasticsearch와 RDBMS 비교

| Elasticsearch | RDBMS    |
| ------------- | -------- |
| GET           | Select   |
| PUT           | Update   |
| POST          | Insert   |
| DELETE        | Delete   |
| Index         | Database |
| Type          | Table    |
| Document      | Row      |
| Field         | Column   |
| Mapping       | Schema   |

Elasticsearch는 데이터를 행렬 데이터로 저장하는 것이 아니라, **JSON 문서(Document)**로 직렬화된 복잡한 자료 구조를 저장하는 방식을 채택하고 있음, 따라서 기존 RDB에서 사용하던 용어와 차이가 있다.<br/>

**명령어 사용예시**<br/>


```bash
curl -XGET http://localhost:9200/classes/class/1?pretty
```

?pretty는 JSON형태로 문자 정렬시켜주는 옵션





참고 : https://tecoble.techcourse.co.kr/post/2021-10-19-elasticsearch/