```yaml
version: '3'

# 각 버전 및 변수 세팅 참고
# https://hub.docker.com/_/postgres
# https://hub.docker.com/_/redis
# https://hub.docker.com/_/zookeeper
# https://hub.docker.com/_/solr

# https://www.elastic.co/guide/en/elasticsearch/reference/8.1/docker.html
# https://hub.docker.com/_/elasticsearch
# https://hub.docker.com/_/kibana

services:
  postgres:
    image: postgres:13.13-alpine
    volumes:
#      - ./db/initdb.d:/docker-entrypoint-initdb.d:ro
      - ./db/data:/var/lib/postgresql/data
    environment:
      TZ: Asia/Seoul
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 1234
    ports:
      - '5432:5432'

  redis:
    image: redis:6.2.14-alpine
    volumes:
      - ./redis/data:/data
#      - ./redis/conf/redis.conf:/usr/local/conf/redis.conf
    restart: always
    ports:
      - '6379:6379'

  zookeeper:
    image: zookeeper:3.7.2-jre-17
    environment:
      ZOO_SERVER_ID: 1
      ZOO_CLIENT_PORT: 2181
      ZOO_TICK_TIME: 2000
      ZOO_INIT_LIMIT: 5
      ZOO_SYNC_LIMIT: 2
    ports:
      - '2181:2181'

  solr:
    image: solr:8.11.2
    ports:
      - '8983:8983'
    depends_on:
      - zookeeper

  es:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.1.3
    volumes:
      - ./es/data:/usr/share/elasticsearch/data
#      - ./es/conf/elasticsearch.yml:/user/share/elasticsearch/config/elasticsearch.yml
    environment:
      - node.name=single
      - discovery.seed_hosts=es
      - cluster.name=standalone
      - discovery.type=single-node
      - xpack.security.enabled=false
      - xpack.security.http.ssl.enabled=false
      - bootstrap.memory_lock=true
      - 'ES_JAVA_OPTS=-Xms512m -Xmx512m'
    ulimits:
      memlock:
        soft: -1
        hard: -1
    ports:
      - '9200:9200'
      - '9300:9300'

  kibana:
    image: docker.elastic.co/kibana/kibana:8.1.3
    environment:
      ELASTICSEARCH_HOSTS: '["http://host.docker.internal:9200"]'
    ports:
      - '5601:5601'
    expose:
      - 5601
    depends_on:
      - es
```