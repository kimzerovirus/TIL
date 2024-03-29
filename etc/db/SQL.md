## JOIN

- 2개 이상의 테이블을 서로 연결하여 데이터를 추출하는것
- 관계형 DB에서는 조인을 통해 서로 다른 테이블간의 정보를 가져올 수 있다.

1:M 관계에서 조인하면 결과는 M집합에 1이 붙어서 나옴, 즉 결과값은 M의 형태를 유지하며 1값만 추가된다.

### (Inner) Join

가장 일반적으로 사용하는 조인으로,  교집합으로 공통된 데이터만 나옴

### Left (Outer) Join, Right (Outer) Join

선택된 방향에 따라 해당 방향 테이블의 데이터를 기준으로 출력하고 반대편 테이블에는 없는 경우 null로 나온다.

### Full Outer Join

Left, Right Join을 합친것으로 합집합과 같으며, 반대편 테이블에 없는 데이터일 경우 null로 출력된다.

<br/>

**<JOIN 요약>**

- **INNER JOIN(내부 조인)** : 두 테이블을 조인할 때, 두 테이블에 모두 지정한 열의 데이터가 있어야 한다.
- **OUTER JOIN(외부 조인)** : 두 테이블을 조인할 때, 1개의 테이블에만 데이터가 있어도 결과가 나온다.
- **CROSS JOIN(상호 조인)** :  한쪽 테이블의 모든 행과 다른 쪽 테이블의 모든 행을 조인하는 기능이다.
- **SELF JOIN(자체 조인)** :  자신이 자신과 조인한다는 의미로, 1개의 테이블을 사용한다.

## 재귀 쿼리

```sql
WITH RECURSIVE 이름(컬럼) AS (
	초기 SQL문
  UNION ALL
  반복할 SQL문
)
SELECT 컬럼 from 테이블
```

1. 초기 SQL 문 실행
2. 반복 SQL 결과값을 초기 SQL문 결과값에 계속 UNION
3. 반복할 SQL문에서 단 하나의 레코드가 나오지 않을 때, 즉 결과값이 없을 때 반복문 탈출

