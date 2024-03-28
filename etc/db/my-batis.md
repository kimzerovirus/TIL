# My-Batis


## 메뉴

admin id의 권한에 따라 보여줄 메뉴를 다르게 해야한다.

```sql
SELECT * (메뉴 경로, nested메뉴일 경우 순서(order) 등) from MENU from MENU_ID in (SELECT MENU_ID from MENU_RULE_INFO where USE_YN = 'Y' and RULE_GROUP_ID = (SELECt RULE_GROUP_ID from ADMIN_RULE_INFO where ADMIN_ID = #{adminId}))
```

오라클 - merge문 : UPSERT와 비슷하게 key에 해당하는 데이터가 없으면 insert, 있으면 update, + delete문 까지 사용 가능

## 검색 조건 + 페이징

```sql
select T.*
from (
	select ROW_NUMBER() OVER(
    order by A.${orderColumn} -- orderColumn은 화면단에서 필드네임 그대로 바로 가져오므로 sqlInjection 방어해서 값을 가져와야됨
    <choose>
      <when test='orderType === "DESC"'>
        DESC
      </when>
      <when test='orderType === "ASC"'>
        ASC
      </when>
      <otherwise>
        DESC
      </otherwise>
    </choose>
  ) as RNUM -- over괄호 닫기
  , count(A.ID) over() TOTAL_CNT
  , ~columns
  from TABLE_NAME A
  LEFT OUTER JOIN B ON A.REG_ID = B.ID
  <where> -- 상세 검색 조건이 있다면
    AND A.DEL_YN = 'N'
    <if test='type != null and type != ""'>
      AND A.TYPE = #{type}
    </if>
    <if test='searchKeyword != null and searchKeyword != "" and searchKeywordType == "TITLE"'>
      AND A.TITLE LIKE '%'||#{searchKeyword}'%'
    </if>
    <if test='searchKeyword != null and searchKeyword != "" and searchKeywordType == "CONTENT"'>
      AND A.CONTENT LIKE '%'||#{searchKeyword}'%'
    </if>
    <if test='searchPeriod1 != null and searchPeriod1 != ""'>
      AND TO_CHAR(A.${searchPeriodType}, 'YYYY-MM-DD') &gt;= #{searchPeriod1} -- searchPeriodType도 orderColumn과 마찬가지로 그대로 가져왔음
    </if>
    <if test='searchPeriod2 != null and searchPeriod2 != ""'>
      AND TO_CHAR(A.${searchPeriodType}, 'YYYY-MM-DD') &lt;= #{searchPeriod2}
    </if>
  </where>
) T -- select from 괄호 닫기
<where>
	<if test='currentPage != null and currentPage != ""'>
		AND T.RNUM &lt;= (#{currentPage} * #{recodePerPage}) AND T.RNUM &gt;= (#{currentPage} - 1) * #{recodePerPage} + 1
	</if>
</where>
```

## foreach

- collection : 전달받은 인자. List or Array 형태만 가능

- item : 전달받은 인자 값을 alias 명으로 대체

- open : 구문이 시작될때 삽입할 문자열

- close : 구문이 종료될때 삽입할 문자열

- separator : 반복 되는 사이에 출력할 문자열

- index : 반복되는 구문 번호이다. 0부터 순차적으로 증가

```sql
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  WHERE ID in
  <foreach item="item" index="index" collection="list"
      open="(" separator="," close=")">
        #{item}
  </foreach>
</select>
```

## CDATA

```
<![CDATA[
	sql구문.. &lt; 요런거 말고 그냥 부등호 < 사용하고 싶을 때 사용
]]>
```

## 리뷰 점수 집계

```sql
select round(avg(score), 1) from REVIEW A left outer join PRODUCT B on A.PRODUCT_ID = B.ID
```

바로 이렇게 집계했는데 이렇게 해도 건수가 적으면 괜찮은듯?
