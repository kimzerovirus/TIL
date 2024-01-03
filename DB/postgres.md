# Postgres

> mysql에서는 database schema가 같은 개념이지만 postgres에서는 database가 schema의 상위 개념

## 데이터베이스, 테이블, 스키마

```postgresql
-- 전체 데이터베이스 조회 
SELECT datname FROM pg_database;

-- 사용자가 생성한 데이터베이스만 조회
SELECT datname FROM pg_database WHERE datistemplate = false;

-- 현재 db의 전체 스키마 조회
SELECT nspname FROM pg_catalog.pg_namespace;

-- 전체 테이블 조회
SELECT tablename FROM pg_tables;

-- 본인이 만든 테이블만 보고 싶은 경우;
SELECT * FROM pg_catalog.pg_tables where schemaname = 'public';

-- 본인이 만든 테이블 이름만 보고 싶은 경우
SELECT tablename FROM pg_tables where schemaname = 'public';

-- 데이터베이스 CREATE
create database [database_name];
```



###### Postgresql 공부하기 좋은 사이트

https://www.postgresqltutorial.com/
