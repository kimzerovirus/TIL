# JPA

## OneToMany 문제점

one to many를 통해서 many를 리스트로 가져온다면 one.getList의 형태로 데이터를 가져와야한다. 하지만 one이 존재하지 않는다면 에러가 발생할 것이다. many에서 가져온다면 없을 경우 empty list가 반환되므로 에러가 발생하지 않는다. 따라서 에러를 내보내는 것보다는 리스트의 사이즈로 판별하는 방향이 더 나아보인다.

## Fetch Join

```java
@Query("select m from Member m left outer join fetch Team t")
```

