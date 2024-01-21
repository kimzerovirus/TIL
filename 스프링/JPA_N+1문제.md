# JPA 사용시, 발생하는 N+1 문제와 해결책

## N+1 문제란?

> 조회시 하나의 쿼리가 나갈 것을 생각하고 설계하였지만 실제로는 나오지 않아도 되는 쿼리 N개가 더 발생하는 현상, 1개 + N개의 쿼리가 발생하는 것을 말한다.

JPA에서 엔티티를 조회할 때, 해당 엔티티와 맺어진 연관관계에 의해서 다른 엔티티가 함께 조회되는 경우에 N+1이 발생하게 된다. 그리고 이런 연관 엔티티를 가져오는 방식으로 `EAGER` 와 `LAZY` 가 있다.

- `EAGER` : 지연로딩으로 조회시에 연관관계에 있는 엔티티들을 필요한 시점에 단일 select문으로 따로 조회해온다.
- `LAZY` : 즉시로딩으로 조회시에 연관관계에 있는 엔티티들을 join문으로 엮어서 같이 가져온다.

##### 엔티티 예제

```java
// User.java
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = false)
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList();
}

// Post.java
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Lob
    private String content;

    @ManyToOne
    private User user;
}
```

default Fetch type은  **~ToMany**의 경우 **LAZY**, **~ToOne**은 **EAGER**이다.

- OneToMany, ManyToMany : LAZY
- OneToOne, ManyToOne : EAGER

## 즉시로딩

```java
// User.java
@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
private List<Post> postList = new ArrayList();

// Post.java
@ManyToOne(fetch = FetchType.EAGER)
private User user;
```

User의 입장에서 즉시로딩을 사용한다면, Post의 모든 List를 다 같이 가져오려고 했을 때 편리하게 값을 가져올 수 있을것 이다. 

실제로 `userRepository.findById(userId)`와 같은 메소드를 사용하면 EntityManager는 PK값을 이용하여 단순히 `select * from user`와 같은 쿼리가 아닌 post와 join이 된 `select u.*, p.* from user u left join post p on u.id = p.user_id`와 같은 쿼리가 실행된다.

하지만  **JPQL**을 사용할 경우 단순히 `select * from user`와 같은 쿼리를 날려도 jpa는 연관관계가 맺어진 `post`엔티티를 eager에 의해서 같이 조회하게 된다. 그런데 이 부분이 join문으로 최적화 되어 쿼리가 나가는 것이 아닌 또다른 select 쿼리가 나가는 것이고 이는 user의 수 N개 만큼 post를 조회하는 쿼리가 나가므로 N+1 개의 쿼리가 나가는 문제를 야기한다.

정리하면 다음과 같다.

> 즉시로딩은 Jpql 쿼리 실행 후 연관관계에 매핑된 Eager 감지로 인해 N개의 쿼리가 추가로 발생할 위험이 있다.

## 지연로딩

```java
// User.java
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Post> postList = new ArrayList();

// Post.java
@ManyToOne(fetch = FetchType.LAZY)
private User user;
```

지연 로딩은 연관된 엔티티에 대해서 프록시로 걸어두고, 해당 엔티티가 실제로 사용할 때 쿼리문을 날리기 때문에 처음 조회할 때는 N+1이 발생하지 않지만 User 조회 후 User의 Post를 사용하게 되면 이미 캐싱된 User의 Post 프록시에 대해 실제 Post엔티티에 대한 값을 DB에서 가져오기 위한 select 쿼리가 발생하여 N+1 개의 쿼리가 발생하게 된다.

> 지연로딩은 처음 쿼리(1)를 실행 했을 때는 해당 엔티티와 연관관계가 맺어진 엔티티를 가짜 객체로 채워두고 필요로 하는 시점에 또 다른 쿼리(N)를 날려 값을 채운다.

## 지연로딩에서의 N+1 해결책

###  fetch join

지연로딩 되어 가져올 데이터를 미리 채우기 위해 join을 이용한 jpql구문`@Query("select u from User u left join u.postList")`을 사용할 수 있다. 하지만 단순히 join만 사용한다면 join구문으로 user를 구한 후 post를 필요로 하는 시점에 다시 지연로딩을 실행하게 된다. join을 사용하였더라도 post를 프록시에서 가져오는 것은 변함이 없기 때문이다. 따라서 이러한 join 구문에서 지연로딩을 방지하기 위한 것이 fetch join이다. <br/>

`@Query("select u from User u left join fetch u.postList")` 다음과 같이 join 문에 fetch를 걸어주면 연관관계가 지연 로딩으로 설정되어 있더라도 즉시로딩으로 데이터를 가져오게 된다.

### fetch join을 하는 또 다른 방법, @EntityGraph

jpql에서 fetch join을 하게 된다면 fetch 구문이 쿼리에 하드코딩 된다는 단점이 있습니다. 이를 최소화하고싶다면 `@EntityGraph`를 사용하면 된다.

```java
@EntityGraph(attributePaths = {"articles"}, type = EntityGraphType.FETCH)
@Query("select distinct u from User u left join u.postList")
```

## fetch join, @EntityGraph 차이점

TODO, 이 둘의 차이점 정리

## N+1 문제, fetch join이 만능은 아니다.

> 앞서 우리는 N+1 문제를 해결하는 방법으로, 지연로딩 관계에서 fetch join을 사용하여 해결하는 방법을 살펴 보았다. 하지만 뭐든지 해결해 줄것 같은  이 fetch join도 만능은 아니다.

## Pagination

jpa에서 fetch join을 통해서 N+1을 개선한다고는 하지만 막상 Page를 반환하는 쿼리를 작성해보면 다음과 같은 에러가 발생한다.
