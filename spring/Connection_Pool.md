# Connection Pool

> **커넥션 풀이란?**<br/>
>
> JDBC API를 이용하여 데이터베이스와 연결하기 위한 Connection 객체를 생성하는 것은 비용이 매우 많이 드는 작업이다. 커넥션 풀은 이러한 비용이 많이 드는 작업을 다음과 같은 방법으로 효율적으로 작업할 수 있게 해준다. 미리 커넥션 객체들을 만들어 Pool에 저장해 두었다가 클라이언트의 요청이 오면 Connection을 빌려주고, 처리가 끝나면 다시 Connection을 반납받아 Pool에 저장하는 방식이다. <br/>
>
> **DBCP란?**<br/>
>
> DataBase Connection Pool 의 약자로 DB와 커넥션을 맺고 있는 객체를 관리하는 역할을 의미한다.

## Connection 객체를 생성하는 과정

1. 애플리케이션에서 DB 드라이버를 통해 커넥션을 조회.
2. DB 드라이버는 DB와 TCP/IP 커넥션을 연결. (3 way handshake와 같은 네트워크 연결 동작 발생)
3. DB 드라이버는 TCP/IP 커넥션이 연결되면 아이디와 패스워드, 기타 부가 정보를 DB에 전달.
4. DB는 아이디, 패스워드를 통해 내부 인증을 거친 후 내부에 DB를 생성.
5. DB는 커넥션 생성이 완료되었다는 응답을 보낸다.
6. DB 드라이버는 커넥션 객체를 생성해서 클라이언트에 반환.

## Connection Pool 동작 구조

1. 애플리케이션을 시작하는 시점에 커넥션 풀은 설정해둔 개수([jdbc default : minimum-8, maximum-32](https://docs.oracle.com/cd/E19879-01/821-0269/abela/index.html)) 만큼 커넥션을 미리 생성하여 풀에 보관한다.
2. 클라이언트로 부터 요청이 들어오면 커넥션 풀에 있는 커넥션 객체 중 하나를 가져온다.
3. 커넥션 풀로부터 가져온 커넥션 객체는 TCP/IP로 DB와 연결되어 있는 상태로 SQL을 즉시 DB에 전달할 수 있다. (커넥션 풀에서 가져온 객체를 이용하면 DB 드라이버를 통해 커넥션을 조회, 연결, 인증, SQL을 실행하는 시간 등 커넥션 객체를 생성하기 위한 과정을 생략할 수 있게 된다.)
4. 명령 수행후 다시 커넥션 풀에 커넥션 객체를 반환한다.

## 요청이 많을 경우

- 요청마다 풀에서 미리 생성 된 커넥션을 순차적으로 제공하고 더이상 제공할 커넥션이 없을 경우에는 커넥션이 다시 풀에 반환될 때까지 번호순대로 대기상태로 기다린다.
- 여기서 WAS에서 커넥션 풀 사이즈를 크게 설정하면 메모리 소모가 큰 대신 많은 요청에 대해 더 많은 커넥션을 제공할 수 있어 대기시간이 줄어들고, 반대로 커넥션 풀을 적게 설정하면 그 만큼 대기시간이 길어지게 된다.

## 커넥션 풀의 종류

- common-dbcp2(Apache Commons DBCP) : Spring Boot 2.0 이전에 주로 사용되어짐
- tomcat-jdbc Pool
- DrvierManager DataSource
- HikariCP : Spring Boot 2.0 이후 부터는 기본 DBCP로 채택되어 사용되고 있음 (가벼운 용량과 빠른 속도가 빠름, 즉 성능 젤 좋음)

## Driver, Connection Pool 비교

### JDBC Driver

```java
// JDBC 드라이버 로딩
Class.forName("com.mysql.cj.jdbc.Driver");

// 연결 DB 정보
String url = "jdbc:mysql://localhost:3306/sesac?serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
String id = "";
String pwd = ""; 

// 커넥션 생성
Connection conn = DriverManager.getConnection(url, id, pwd);
```

### Hikari Connection Pool

```java
// 연결 DB 정보
String url = "jdbc:mysql://localhost:3306/sesac?serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
String id = "root";
String pwd = "root";

HikariDataSource dataSource = new HikariDataSource(); 
dataSource.setJdbcUrl(url);
dataSource.setUsername(id);
dataSource.setPassword(pwd); 
dataSource.setMaximumPoolSize(100);
dataSource.setPoolName("test"); 

// 커넥션 객체
Connection conn = dataSource.getConnection();
```

