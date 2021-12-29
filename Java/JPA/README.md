# Java Persistence API

## @Getter, @Setter
 - 선언된 모든 필드의 get메서드 생성
 - 선언된 모든 필드의 set메서드 생성


## @Data
 - 클래스에 선언된 모든 private에 대해 @Getter와 @Setter를 적용

## @RequiredArgsConstructor, @NoArgsConstructor와 @AllArgsConstructor
 - `@RequiredArgsConstructor` : 선언된 모든 초기화 되지 않은 final필드 또는 @NonNull이 붙은 필드를 파라미터로 받는 생성자를 생성해 준다(final이 없는 필드는 생성x, 모든 멤버 변수를 초기화시키는 생성자).
 - `@NoArgsConstructor` : 파라미터가 없는 기본 생성자를 생성해준다.
 - `@AllArgsConstructor` : 모든 필드 값을 파라미터로 받는 생성자를 만들어준다.
 - @AllArgsConstructor와 @NoArgsConstructor는 항상 같이 처리해야 컴파일 에러가 발생하지 않는다.

## @Table(name="테이블명")
 - DB에서 어떤 테이블인지 표기

## @Entity
 - 해당 클래스가 엔티티를 위한 클래스임을 명시하고, 해당 클래스의 인스턴스들이 JPA로 관리되는 객체임을 의미한다.
 - DB의 테이블과 링크될 클래스임을 선언
 - 기본값으로 클래스(자바)의 카멜케이스 = 데이터베이스의 언더스코어 네이밍(언더바)과 매칭된다.

## @Id
 - Primary Key, 즉 PK임을 의미함

## @GeneratedValue
 - PK규칙을 나타낸다
 - 스프링부트 2.0의 경우 GenerationType.IDENTITY옵션을 추가해야 auto_increment사용가능

## @Builder
 - 해당 클래스의 빌더 패턴 클래스 생성
 - 생성자 상단에 선언시 생성자에 포함된 필드만 빌더에 포함

## @GeneratedValue(strategy = GenerationType.IDENTITY)

 - 번호를 자동으로 생성
 - 오라클DB는 번호를 생성하기 위한 별도의 테이블을 생성해야한다.
 - MySQL계열은 auto_increment를 기본으로 사용하기 때문에 새로운 레코드가 기록될 때 다른 번호로 저장된다.
 - `AUTO` : JPA(스프링의 HIBERNATE)가 생성 방식을 결정한다.
 - `IDENTITY` : MySQL계열은 auto_increment방식을 사용한다. (MySQL, MariaDB, PostgreSQL, SQL Server, DB2)
 - `SEQUENCE` : DB의 시퀀스를 이용하여 키를 생성한다.( @SequenceGenerator와 같이 사용... PostgreSQL, DB2, H2 DB) ... 시퀀스는 유일한 값을 순서대로 생성하는 DB오브젝트이다.
 - `TABLE` : 키 생성 전용 테이블을 생성한다. (@TableGenerator와 같이 사용)
 - [@GeneratedValue의 옵션에 따른 문제점에 관한 글](https://hyeonic.tistory.com/m/196)

## @Builder 패턴

 - @Builder패턴 사용시 @AllArgsConstructor와 @NoArgsConstructor를 함께 처리해줘야 컴파일 에러가 발생하지 않는다.

## @Column(columnDefinition = "varchar(200) default 'hello'")

 - 테이블의 칼럼으로 선언하지 않아도 해당 클래스의 모든 필드는 칼럼이 된다.
 - 기본값 등 추가설정을 할 경우 선언해야된다.
 - `name` : 필드와 맵핑할 테이블의 컬럼 이름을 지정한다.
 - `insertable` : 엔티티 저장시 선언된 필드도 같이 저장한다. 만약 false로 설정하면 데이터베이스에 저장되지 않으므로 읽기 전용일때 사용한다.
 - `updateable` : 엔티티 수정시 이 필드를 함께 수정한다. 위와 동일하지만 수정일 경우이다.
 - `table` : 지정한 필드를 다른 테이블에 맵핑한다.
 - `nullable` : NULL을 허용할지, 허용하지 않을지 결정한다.
 - `unique` : 유니크 제약조건을 걸 때 사용한다. 만약 2개 이상 걸고 싶다면 클래스 레벨에서 @Table.uniqueConstraints를 사용해야 한다.
 - `columnDefinition` : DB 컬럼 정보를 직접적으로 지정할 때 사용한다.
 - `length` : varchar의 길이를 조정하고 기본값으로 255가 입력된다.
 - `precsion` : BigInteger, BigDecimal 타입에서 사용하며, 소수점 포함 전체 자릿수를 의미한다.(double과 float타입은 적용X)
 - `scale` : BigInteger, BigDecimal 타입에서 사용하며, 소수의 자릿수를 의미한다.
```
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;
```

## JpaRepository

 - JpaRepository는 인터페이스로 이것을 레포지토리(저장소)에서 상속만 해주면 된다.
 - `public interface XXXRepository extends JpaRepository<엔티티클래스, ID타입`
 - Spring Data JPA는 위의 상속 선언만으로 자동으로 스프링에 빈으로 등록된다.

## JPA에서의 CRUD

 - `INSERT` : save(엔티티 객체)
 - `SELECT` : findById(키 타입), getOne(키 타입, deprecated )
 - `UPDATE` : save(엔티티 객체)
 - `DELETE` : deleteById(키 타입), delete(엔티티 객체)

- insert와 update는 메서드가 동일하지만 JPA의 구현체가 메모리상에서 객체를 비교하여 새로운 객체면 insert작업을, 존재한다면 update 작업을 수행한다.

## @MappedSuperclass
 - JPA Entity 클래스들이 BaseEntity를 상속할 경우 필드들도 칼럼으로 인식하게 한다.

## @EntityListeners(AuditingEntityListener.class)
 - 현재 클래스에 Auditing 기능을 포함한다.
 - Auditing기능은 Spring Data JPA에서 시간에 대해서 자동으로 값을 넣어주는 기능이다.
 - application실행 부분에 @EnableJpaAuditing으로 활성화 해줘야한다.

## @CreatedDate
 - Entity가 생성되어 저장될 때 시간이 자동으로 저장된다.

## @LastModifiedDate
 - 조회한 Entity의 값을 변경할 때 시간이 자동 저장된다.

## JPA와 QueryDsl

 - FK의 조인, 복잡한 조건 등은 Entity만으로 해결하기 어렵다. 
 - 따라서 조회용 프레임워크로 MyBatis, QueryDsl 등을 추가로 이용하는 경향이 있는데
 QueryDsl은 메소드를 기반으로 쿼리를 생성하기 때문에 오타 등의 자잘한 에러를 IDE에서 걸러 낼 수 있다는 장점이 있다.

## Query Methods

 - [Reference Docs](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods)
 - `findBy`나`getBy`로 시작하고 `And, Or`와 같은 키워드로 메서드의 이름 자체를 질의 조건으로 만들어 준다.
 - 레포지토리인터페이스에 메소드를 적어주면 된다.

## @Query

 - JPQL(Java Persistence Query Language)이라는 걸 사용하며 SQL과 상당히 유사하다.
 - `:파라미터` 방식과 `:#파라미터` 방식으로 파라미터를 받을 수 있다.
 - JPQL이 아닌 Native SQL로 처리하는것 또한 가능하다. 

```
  1. JPQL
    @Query("select m from Memo m order by m.mno desc")
    List<Memo getListDesc();
  
  2. :파라미터 방식  
    @Transactional
    @Modifying
    @Query("update Memo m set m.memoText = :memoText where m.mno = :mno")
    int updateMemoText(@Param("mno") Long mno, @Param("memoText") String memoText);
    
  3. :#파라미터 방식
    @Transactional
    @Modifying
    @Query("update Memo m set m.memoText = :#{#param.memoText} where m.mno = :#{#param.mno}")
    int updateMemoText(@Param("param") Memo memo);
  
  4. 현재 필요한 데이터만 추출하는법 Object[]
    @Query(value = "select m.mno, m.memoText, CURRENT_DATE from Memo m where m.mno  :mno", countQuery = "select count(m) from Memo m where m.mno  :mno")
    Page<Object[] getListWithQueryObject(Long mno, Pageable pageable);
  
  5. Native SQL로 처리하기
    @Query(value = "select * from memo where mno  0", nativeQuery = true)
    List<Object[] getNativeResult();
```