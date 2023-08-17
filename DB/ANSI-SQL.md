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

