# JPA 사용시, 발생하는 N+1 문제와 해결책

## N+1 문제란?

> 조회시 하나의 쿼리가 나갈 것을 생각하고 설계하였지만 실제로는 나오지 않아도 되는 쿼리 N개가 더 발생하는 현상, 1개 + N개의 쿼리가 발생하는 것을 말한다.

JPA에서 엔티티를 조회할 때, 해당 엔티티와 맺어진 연관관계에 의해서 다른 엔티티가 함께 조회되는 경우에 N+1이 발생하게 된다. 그리고 이런 연관 엔티티를 가져오는 방식으로 `EAGER` 와 `LAZY` 가 있다.

- `EAGER` : 즉시로딩으로 조회시에 연관관계에 있는 엔티티들을 join문으로 엮어서 같이 가져온다.
- `LAZY` : 지연로딩으로 조회시에 연관관계에 있는 엔티티들을 필요한 시점에 단일 select문으로 따로 조회해온다.

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
@EntityGraph(attributePaths = {"postList"}, type = EntityGraphType.FETCH)
@Query("select distinct u from User u left join u.postList")
```

## fetch join, @EntityGraph 차이점

TODO, 이 둘의 차이점 정리

## N+1 문제, fetch join이 만능은 아니다.

> 앞서 우리는 N+1 문제를 해결하는 방법으로, 지연로딩 관계에서 fetch join을 사용하여 해결하는 방법을 살펴 보았다. 하지만 뭐든지 해결해 줄것 같은  이 fetch join도 만능은 아니다.

## Pagination

jpa에서 fetch join을 통해서 N+1을 개선한다고는 하지만 막상 Page를 반환하는 쿼리를 작성해보면 다음과 같은 에러가 발생한다.





```java
@EntityGraph(attributePaths = {"postList"}, type = EntityGraphType.FETCH)
@Query("select distinct u from User u left join u.articles")
Page<User> findAllPage(Pageable pageable);
@Test
@DisplayName("fetch join을 paging처리에서 사용해도 N+1문제가 발생한다.")
void pagingFetchJoinTest() {
    System.out.println("== start ==");
    PageRequest pageRequest = PageRequest.of(0, 2);
    Page<User> users = userRepository.findAllPage(pageRequest);
    System.out.println("== find all ==");
    for (User user : users) {
        System.out.println(user.articles().size());
    }
}
```

0페이지의 총 2명의 유저를 반환하는 `PageRequest` 객체를 파라미터로 입력받았습니다.

과연 정상적으로 쿼리가 하나만 나갈까요?

![img](https://images.velog.io/images/jinyoungchoi95/post/651d0e23-40bb-40d5-8141-74c2e60bdea1/10.png)

하나만 나가기는 했습니다. (Count 쿼리는 Page 반환시 무조건 발생하는 쿼리이므로 제외하도록 하겠습니다.)

근데 쿼리를 자세히보면 Mysql에서 페이징 처리를 할 때 사용을 하는 Limit, Offset이 없습니다. 분명 limit은 size 2로, offset은 page 0으로 지정해줬는데 말이죠. 근데 또 반환 값은 2명의 유저 article size가 나왔는데 뭐가 어떻게 된걸까요?

사실 이미지에서 일부러 잘라서 보여드렸지만 == start == 밑에 어떠한 **WARN** 구문이 있습니다.

```null
2021-11-18 22:25:56.284  WARN 79170 --- [    Test worker] o.h.h.internal.ast.QueryTranslatorImpl   : HHH000104: firstResult/maxResults specified with collection fetch; applying in memory!
```

해석해보면 collection fetch에 대해서 paging처리가 나왔긴한데 **applying in memory**, 즉 **인메모리를 적용해서** 조인을 했다고 합니다.

실제 날아간 쿼리와 이 문구를 통합해서 이해를 해보면 일단 List의 모든 값을 select해서 인메모리에 저장하고, application 단에서 필요한 페이지만큼 반환을 알아서 해주었다는 이야기가 됩니다.

이러면 우리는 사실상 Paging을 한 이유가 없어지는 것과 마찬가지입니다. 100만건의 데이터가 있을 때 그 중 10건의 데이터만 paging하고 싶었으나 100만건을 다 가져온다? 그것도 메모리에? **OOM(Out of Memory)이 발생할 확률이 매우 높습니다.**

따라서 Pagination에서는 fetch join을 하고싶어서 한다고 하더라도 해결을 할 수 없습니다.

> 짧게 이야기를 하자면 fetch join에서 distinct를 쓰는 것과 연관이 있습니다. distinct를 쓰는 이유는 하나의 연관관계에 대해서 fetch join으로 가져온다고 했을 때 중복된 데이터가 많기 때문에 실제로 원하는 데이터의 양보다 중복되어 많이 들어오게 됩니다.
>
> 그 이유때문에 개발자가 직접 distinct를 통해서 jpa에게 중복 처리를 지시하게 되는 것이고, Paging처리는 쿼리를 날릴 때 진행되기 때문에 jpa에게 pagination 요청을 하여도 jpa는 distinct때와 마찬가지로 중복된 데이터가 있을 수 있으니 limit offset을 걸지 않고 일단 인메모리에 다 가져와서 application에서 처리하는 것이죠.

눈치가 빠르신 분이라면 눈치를 채셨을 것 같은데 한가지는 위에서 말한 distinct가 생기는 상황 자체를 없애는 것 입니다.

### Pagination 해결책(?) 1 : ToOne 관계에서 페이징 처리

> **사실 해결책이라기보다는 `~ToOne` 관계라면 페이징 처리를 진행해도 괜찮다라는 내용입니다.**

```java
@EntityGraph(attributePaths = {"user"}, type = EntityGraphType.FETCH)
@Query("select a from Article a left join a.user")
Page<Article> findAllPage(Pageable pageable);
```

Article은 User에 대해서 `ManyToOne` 연관관계이기 때문에 지금처럼 Pagination을 진행한다고 해도 인메모리에서 모든 Article을 조회하는 것이 아닌 limit을 걸어 필요한 데이터만 가져올 수 있습니다.

![img](https://images.velog.io/images/jinyoungchoi95/post/5e957510-e8d8-47ce-bdd3-8268a7c1cd20/11.png)

따라서 사실 Pagination의 해결책이라는 부제목이 달려있지만 `~ToOne` 관계에 있는 경우 fetch join을 걸어도 Pagination이 원하는대로 제공된다라는 것을 알면 좋을 것 같습니다.

### Pagination 해결책 2 : Batch Size

다만 `~ToMany` 관계, 즉 컬랙션 조인을 했을 경우 Many인 다객체들이 One에 매핑되어 fetch join된다면 Pagination에서 갯수를 판단히기 힘들기 때문에 fetch join을 사용할 경우 임의로 인메모리에서 조정한다고 이야기했었습니다.

따라서 컬랙션 조인을 하는 경우에는 fetch join을 아예 사용하지 않고 조회할 컬랙션 필드에 대해서 `@BatchSize` 를 걸어 해결합니다.

```java
Page<User> findAll(Pageable pageable);
```

findAll() default메소드를 사용하겠습니다. 다만 달라지는 것은 필드에 `@BatchSize`를 걸게 될 것입니다.

![img](https://images.velog.io/images/jinyoungchoi95/post/44af2658-5447-4989-8903-4b541cda3b31/12.png)

이렇게 되었을 때 동일하게 테스트 코드를 날리면 articles만 따로 한번에 select하게 됩니다. 처음 지연로딩 default한 설정 + pagination은 어떻게 처리되는지 아래를 확인해보겠습니다.

![img](https://images.velog.io/images/jinyoungchoi95/post/074f8c66-0891-49e7-bae1-5dbca64d4ad3/13.png)

어.... 분명 그냥 지연로딩했을 때랑은 다른거 같기는 합니다. 분명 User에 대해서 limit 쿼리가 나갔기 때문에 인메모리가 아닌 정상적인 pagination이 작동되었는데 밑에 article을 select하는 쿼리가 하나 등장했습니다.

어떻게 된거냐면 지연로딩하는 객체에 대해서 Batch성 loading을 하는 것이라고 생각하면 됩니다.

기존의 지연로딩에 대해서는 객체를 조회할 때 그때그때 쿼리문을 날려서 N+1 문제가 발생한 반면 객체를 조회하는 시점에 쿼리를 하나만 날리는게 아니라 해당하는 Article에 대해서 쿼리를 batch size개를 날리는 것입니다. batch 쿼리에서 where부분만 확대해서 보겠습니다.

```mysql
where
	articles0_.user_id in (
		?, ?
	)
```

in (?, ?)가 결국 user id를 100개를 가져오는 쿼리문으로써 그때그때 조회하는 것이 아닌 조회할 때 그냥 batch size만큼 한번에 가져와서 뒤에 생길 지연로딩에 대해서 미연에 방지하는 것이라고 보면 좋을 것 같아요.

(batch size는 Article이 아닌 User의 갯수가 기준입니다.)

다만, Batch Size는 연관관계에서의 데이터 사이즈를 확실하게 알 수 있다면 최적회된 size를 구할 수 있겠지만, 사실 일반적인 케이스에서 최적화된 데이터 사이즈를 알기 힘들고 일반적으로 100~1000을 쓴다이지 확실하게 알지 못한다면 안좋은 방법이 될 수 있습니다.

### Pagination 해결책 3 : @Fetch(FetchMode.SUBSELECT)

`@BatchSize`와 비슷하지만 다른 어노테이션입니다.

`@BatchSize`의 경우 사이즈 갯수 제한을 임의로 두어서 사용자가 최적화된 데이터 사이즈를 적용하게끔 도와준다면 이 어노테이션은 그냥 전부다 합니다..

코드 결과를 바로 보겠습니다.

![img](https://images.velog.io/images/jinyoungchoi95/post/1e77e1e9-8795-4cee-b988-52871991ced1/14.png)![img](https://images.velog.io/images/jinyoungchoi95/post/5f081f8e-feb2-46b8-b41f-dcddd8772cb1/15.png)

다른 부분은 BatchSize와 동일하니 Collection을 따로 조회하는 쿼리만 가져왔습니다. 보면 where절 안에 in 문에서 현재 select할 User의 아이디가 들어가있어야하는데.... User를 그냥 싹다 조회하는 select all 쿼리가 들어있음을 알 수 있습니다.

즉, Batch Size의 경우 주어진 size만큼 User Id를 입력하여 그때그때 프록시 상태에 따라 지연로딩을 했다면, 지금은 그런거 없이 User Id를 싹다 조회하겠다는 것이죠. 마치 `@BatchSize(size = 무한대)`처럼 말이죠.

다만, 과연 한번에 모든 batch를 가져오는 것이 과연 좋은 판단인가에 대한 것은 의문이 있습니다. 🤔 Batch Size의 경우 size가 100일때 100만명의 유저에서 100명의 user id에 대한 검색을 하는 반면, SUBSELECT는 100만명 모든 유저를 일단 select하게되거든요.

사실 이 부분은 성능적인 테스트가 필요하여 차후에 관련해서 테스트를 하게 된다면 포스팅하여 링크를 남기도록 하겠습니다 :)

현재로써는 Batch Size 이상으로 이 방법을 사용할 필요는 없다는 것이 개인적인 생각입니다.

## 2. 둘 이상의 Collection fetch join(~ToMany) 불가능

fetch join은 앞서 batch size에서 이야기한대로 일단 하나의 collection fetch join에 대해서 인메모리에서 모든 값을 다 가져오기 때문에 pagination이 불가능했었습니다.

fetch join을 할 때 ToMany의 경우 한번에 fetch join을 가져오기 때문에 collection join이 2개이상이 될 경우 너무 많은 값이 메모리로 들어와 exception이 추가로 걸립니다. 그 exception이 `MultipleBagFetchException`인데요, 아래 사진에서 알 수 있다시피 2개 이상의 bags, 즉 collection join이 두개이상일 때 exception이 발생합니다.

![img](https://images.velog.io/images/jinyoungchoi95/post/a95ae87b-4531-4157-b3f7-be0720eb304b/16.png)

음... 말만봐선 이해가 바로 가지 않을 수 있으니 바로 예를 들면 더 이해가 가기 쉬울 것 같아 바로 exception이 발생할 수 있는 entity를 가져와보겠습니다.

```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = false)
    private String name;
    
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Article> articles = new ArrayList<>();
    
    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<Question> questions = new ArrayList<>();
```

기존에 있었던 코드는 일단 뒤로하고, `Article`과 `Question`을 `@OneToMany`로 받는 User Entity에서 시작해볼게요.

당연하게도 User를 검색할 때 User만 사용한다면 지연로딩으로 인해서 아무런 문제가 발생하지 않겠지만, articles나 questions를 받아와야하는 상황이라면 N+1이 발생할 것입니다. 그럼 지금까지 했던대로 `Repository`에서 fetch join을 해볼까요?

```java
@EntityGraph(attributePaths = {"articles", "questions"}, type = EntityGraphType.FETCH)
@Query("select distinct u from User u left join u.articles")
List<User> findAllEntityGraph2();
@Test
@DisplayName("collection join 2개일 때 fetch join")
void collectionFetchJoinTest() {
    System.out.println("== start ==");
    List<User> users = userRepository.findAllEntityGraph2();
    System.out.println("== find all ==");
}
```

이렇게 테스트를 진행하면 Users는 `~ToMany`가 두 개, 즉 collection fetch join이 두 개 이상 걸리기 때문에 바로 이야기했던 Exception이 발생합니다.

```none
org.hibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags: [com.example.jpa.domain.User.articles, com.example.jpa.domain.User.questions]; nested exception is java.lang.IllegalArgumentException: org.hibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags: [com.example.jpa.domain.User.articles, com.example.jpa.domain.User.questions]
```

`~ToOne`은 얼마만큼 fetch join을 해도 괜찮지만 `~ToMany`는 하나일 때는 인메모리에서 처리하고 두 개이상은 Exception으로 제한한다... 그럼 어떻게 해결해야할까요?🤔

### 

### MultipleBagFetchException 해결책 1 : 자료형을 Set으로

자료형을 Set으로 변경을 하면 해결되는 아마도 MultipleBag가 List로 되어있을 때 중복 자체를 허용하지 않는다면 복잡한 여러개의 collection fetch 관계를 해결할 수 있음이 아닐까 생각합니다.

전부다 Set자료로 바꾸고 해결되는지 볼까요?

```java
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private Set<Article> articles = emptySet();

@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private Set<Question> questions = emptySet(); 
```

![img](https://images.velog.io/images/jinyoungchoi95/post/a71a2120-db84-409d-9b22-ef127c73b1cd/17.png)

`MultipleBagFetchException`이라는 둘이상의 collection fetch join을 막는 exception없이 정상적으로 모든 데이터를 가져옴을 알 수 있습니다.

Set을 사용하게 된다면 HashSet으로는 순서가 중요한 데이터에는 순서를 보장할 수 없기 때문에 `LinkedHashSet`을 사용해야합니다. (자료구조 상 List보다 손해가 있을 수 있겠네요.)

> 다만 Set을 사용한다고 해서, Pagination은 마찬가지로 해결이 불가능합니다.
>
> Pagination은 근본적으로 몇개의 collection join 있던 간에 인메모리에서 가져오기 때문에 OOM을 발생시킬 수 있는 원인이 되어 해당 방법으로는 해결이 불가능합니다.
>
> 설령 Collection join이 한 개인 상황에서 Set 자료구조를 사용한다고 해도 인메모리에서 가져옵니다.
>
> HHH000104: firstResult/maxResults specified with collection fetch; applying in memory!

### MultipleBagFetchException 해결책 2 : 돌고돌아 BatchSize

앞서 Pagination의 해결책 중 하나로 나온 Batch Size입니다.

물론 이 방법이 Pagination의 해결책 중 하나로 나온 방법이긴 하지만 Collection join이 두 개 이상일 때 `MultipleBagFetchException`을 해결할 수 있는 방법이기도 합니다.

List 자료구조를 사용해야하는 상황이거나, Set을 사용한다고 Pagination에서 인메모리 로딩을 막을 수 없기 때문에 2개 이상의 Collection join을 사용하는데 Pagination을 사용해야할 경우도 인메모리를 사용하지 않고 사용할 수 있습니다.

정리하면 두 가지 경우로 간추릴 수 있겠네요.

- List 자료구조를 꼭 사용해야하는 경우
- 2개 이상의 Collection join을 사용하는데 Pagination을 사용해야해서 인메모리 OOM을 방지하고자 하는 경우

Set, 혹은 List 위에 `@BatchSize`를 걸게 되면 동일하게 인메모리에 가져오는 것이 아닌 호출하는 당시에 한번에 모든 데이터를 가져오는 동작구조를 가집니다.

```java
@BatchSize(size = 100)
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private Set<Article> articles = emptySet();

@BatchSize(size = 100)
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private Set<Question> questions = emptySet();
@BatchSize(size = 100)
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Article> articles = new ArrayList<>();

@BatchSize(size = 100)
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Question> questions = new ArrayList<>();
@Query("select distinct u from User u left join u.articles left join u.questions")
Page<User> findAllPage2(Pageable pageable);
```

> 주의해야할 점은 batch size에 fetch join을 걸면 안됩니다.
>
> fetch join이 우선시되어 적용되기 때문에 batch size가 무시되고 fetch join을 인메모리에서 먼저 진행하여 List가 MultipleBagFetchException가 발생하거나, Set을 사용한 경우에는 Pagination의 인메모리 로딩을 진행합니다.

![img](https://images.velog.io/images/jinyoungchoi95/post/96d098c9-c8c8-4f99-9350-0e88ceb870e9/18.png)

일단 fetch join이 아닌 지연로딩으로 User만 가져온 모습이며,

<img src="https://images.velog.io/images/jinyoungchoi95/post/98c21469-1d40-4d6d-a89b-a7f75eb519a7/19.png alt="19" style="zoom:33%; margin: 0px auto" />

필요한 article값을 출력하고자할 때 article만 따로 batch 쿼리를 날려 받음을 알 수 있습니다.

## 결론

너무 많은 이야기를 해온 것 같아 마지막으로 모든 케이스를 항목화할 필요가 있을 것 같아 정리해보면 다음과 같습니다.

- 즉시로딩
  - jpql을 우선적으로 select하기 때문에 즉시로딩을 이후에 보고 또다른 쿼리가 날아가 N+1
- 지연로딩
  - 지연로딩된 값을 select할 때 따로 쿼리가 날아가 N+1
- fetch join
  - 지연로딩의 해결책
  - 사용될 때 확정된 값을 한번에 join에서 select해서 가져옴
  - Pagination이나 2개 이상의 collection join에서 문제가 발생
- Pagination
  - fetch join 시 limit, offset을 통한 쿼리가 아닌 인메모리에 모두 가져와 application단에서 처리하여 OOM 발생
  - BatchSize를 통해 필요 시 배치쿼리로 원하는 만큼 쿼리를 날림 > 쿼리는 날아가지만 N번 만큼의 무수한 쿼리는 발생되지 않음
- 2개 이상의 Collection join
  - List 자료구조의 2개 이상의 Collection join(~ToMany관계)에서 fetch join 할 경우 MultipleBagFetchException 예외 발생
  - Set자료구조를 사용한다면 해결가능 (Pagination은 여전히 발생)
  - BatchSize를 사용한다면 해결가능 (Pagination 해결)

정리를 해도 많은게 눈에 보이네요. 즉시로딩부터 fetch join까지 이야기하면서 fetch join의 문제점 역시 함께 알아가야 N+1문제에 대한 모든 해결방안을 알 수 있다고 생각해서 어쩔 수 없는 선택이었습니다. 😥

해결하고자하는 상황, 그리고 주어진 정책에 따라 여러가지의 판단을 할 수 있겠지만, 제가 생각하기에는 지연로딩은 항상 기본으로 깔고 들어가며 Pagination 상황이 가정되지 않는다면 Set 자료구조를 사용해서 `MultipleBagFetchException`를 예방하고 Paginatioin이 필수적으로 들어가는 상황이라면 Batch Size를 사용할 것 같습니다.
