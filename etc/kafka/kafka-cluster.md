```
networks:
  kafka_network:

# volumes:
#   Kafka1:
#     driver: local
#   Kafka2:
#     driver: local
#   Kafka3:
#     driver: local

services:
  kafka1:
    image: bitnami/kafka:3.7.0
    restart: unless-stopped
    container_name: kafka1
    ports:
      - "10000:9094"
    environment:
      - KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true
      # KRaft settings
      - KAFKA_CFG_BROKER_ID=1
      - KAFKA_CFG_NODE_ID=1
      - KAFKA_KRAFT_CLUSTER_ID=HsDBs9l6UUmQq7Y5E6bNlw
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka1:9093,2@kafka2:9093,3@kafka3:9093
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      # Listeners
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka1:9092,EXTERNAL://localhost:10000
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT
      # Clustering
      - KAFKA_CFG_OFFSETS_TOPIC_REPLICATION_FACTOR=3
      - KAFKA_CFG_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=3
      - KAFKA_CFG_TRANSACTION_STATE_LOG_MIN_ISR=2
    networks:
      - kafka_network
    volumes:
      - "./data/kafka/kafka1:/bitnami/kafka"
  kafka2:
    image: bitnami/kafka:3.7.0
    restart: unless-stopped
    container_name: kafka2
    ports:
      - "10001:9094"
    environment:
      - KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true
      # KRaft settings
      - KAFKA_CFG_BROKER_ID=2
      - KAFKA_CFG_NODE_ID=2
      - KAFKA_KRAFT_CLUSTER_ID=HsDBs9l6UUmQq7Y5E6bNlw
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka1:9093,2@kafka2:9093,3@kafka3:9093
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      # Listeners
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka2:9092,EXTERNAL://localhost:10001
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT
      # Clustering
      - KAFKA_CFG_OFFSETS_TOPIC_REPLICATION_FACTOR=3
      - KAFKA_CFG_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=3
      - KAFKA_CFG_TRANSACTION_STATE_LOG_MIN_ISR=2
    networks:
      - kafka_network
    volumes:
      - "./data/kafka/kafka2:/bitnami/kafka"
  kafka3:
    image: bitnami/kafka:3.7.0
    restart: unless-stopped
    container_name: kafka3
    ports:
      - "10002:9094"
    environment:
      - KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true
      # KRaft settings
      - KAFKA_CFG_BROKER_ID=3
      - KAFKA_CFG_NODE_ID=3
      - KAFKA_KRAFT_CLUSTER_ID=HsDBs9l6UUmQq7Y5E6bNlw
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka1:9093,2@kafka2:9093,3@kafka3:9093
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      # Listeners
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka3:9092,EXTERNAL://localhost:10002
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT
      # Clustering
      - KAFKA_CFG_OFFSETS_TOPIC_REPLICATION_FACTOR=3
      - KAFKA_CFG_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=3
      - KAFKA_CFG_TRANSACTION_STATE_LOG_MIN_ISR=2
    networks:
      - kafka_network
    volumes:
      - "./data/kafka/kafka3:/bitnami/kafka"

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    restart: unless-stopped
    container_name: kafka-ui
    ports:
      - "9090:8080"
    environment:
      - KAFKA_CLUSTERS_0_NAME=Local-Kraft-Cluster
      - KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=kafka1:9092,kafka2:9092,kafka3:9092
      - DYNAMIC_CONFIG_ENABLED=true
      - KAFKA_CLUSTERS_0_AUDIT_TOPICAUDITENABLED=true
      - KAFKA_CLUSTERS_0_AUDIT_CONSOLEAUDITENABLED=true
      #- KAFKA_CLUSTERS_0_METRICS_PORT=9999
    networks:
      - kafka_network
```

