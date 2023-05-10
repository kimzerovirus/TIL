# 도커로 MySQL 설치하기

## 도커 MySQL 이미지 다운로드

```bash
$ docker pull mysql
```

### MySQL Docker 컨테이너 생성 및 실행

```bash
$ docker run --platform linux/amd64
-p 3306:3306
--name mysql-contatiner
-e MYSQL_ROOT_PASSWORD=1234
-d mysql
```

### MySQL Docker 컨테이너 시작/중지/재시작

```bash
# MySQL Docker 컨테이너 중지
$ docker stop mysql-container

# MySQL Docker 컨테이너 시작
$ docker start mysql-container

# MySQL Docker 컨테이너 재시작
$ docker restart mysql-container
```

### MySQL Docker 컨테이너 접속

#### Docker 컨테이너 내 bash 접속

```bash
$ docker exec -it CONTAINER_NAME bash
```

#### MySQL 접속

```bash
mysql -u root -p

# localhost 에서만 접속 가능한 계정 생성
mysql> USE mysql;
mysql> CREATE USER 'YOUR_SYSTEM_USER'@'localhost' IDENTIFIED BY 'YOUR_PASSWD';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'YOUR_SYSTEM_USER'@'localhost';
mysql> FLUSH PRIVILEGES;


# 모든 DB, 테이블에 접속 가능한 계정 생성
mysql> USE mysql;
mysql> CREATE USER 'YOUR_SYSTEM_USER'@'%' IDENTIFIED BY 'YOUR_PASSWD';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'YOUR_SYSTEM_USER'@'%';
mysql> FLUSH PRIVILEGES;

mysql> USE mysql;
mysql> CREATE USER 'sa'@'%' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'sa'@'%';
mysql> FLUSH PRIVILEGES;
```



```bash
$ docker exec -it mysql-container bash
root@dc557b92f573:/# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.22 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| test_db            |
+--------------------+
5 rows in set (0.00 sec)
mysql> select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | root             |
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+
5 rows in set (0.00 sec)

mysql> create user 'testuser'@'%' identified by 'testuser123';
Query OK, 0 rows affected (0.02 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> show grants for testuser@'%';
+----------------------------------------+
| Grants for testuser@%                  |
+----------------------------------------+
| GRANT USAGE ON *.* TO `testuser`@`%`   |
+----------------------------------------+
1 row in set (0.00 sec)

mysql> grant all privileges on test_db.* to testuser@'%';
Query OK, 0 rows affected (0.01 sec)

mysql> show grants for testuser@'%';
+--------------------------------------------------------+
| Grants for testuser@%                                  |
+--------------------------------------------------------+
| GRANT USAGE ON *.* TO `testuser`@`%`                   |
| GRANT ALL PRIVILEGES ON `test_db`.* TO `testuser`@`%`  |
+--------------------------------------------------------+
2 rows in set (0.01 sec)
 
```

## Docker Compose 파일로 생성하기

```yaml
version: "3"
services:
  mysql:
    image: mysql:latest
    container_name: mysql-container
    restart: always
    platform: linux/x86_64
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE:
      MYSQL_USER:
      MYSQL_PASSWORD:
      MYSQL_ROOT_PASSWORD:
      TZ=Asia/Seoul:
    command: # 명령어 실행
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - ../db/conf.d:/etc/mysql/conf.d
      - ../db/initdb.d:/docker-entrypoint-initdb.d
      - ../db/:/var/lib/mysql # -v 옵션 (다렉토리 마운트 설정)
```

- `platform` - MacOS 실리콘칩인 경우 linux/x86_64 지정
- `restart` - docker재기동시 항상 기동된다.
- `volumes`를 지정하여 재기동시에도 데이터가 손실되지 않는다.
- `MYSQL_ROOT_PASSWORD` - root유저의 패스워드를 지정한다.
- `TZ` - 시간대를 설정한다.
- 기타 MySql Image 주요 옵션
  - `MYSQL_DATABASE` - 기동시 생성되는 database, 아래 user / password가 기술된 경우 해당 user는 database의 최고권한을 얻는다.
  - `MYSQL_USER`, `MYSQL_PASSWORD`

### Docker Compose 실행

```bash
$ docker-compose up -d
```

