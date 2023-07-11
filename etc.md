## REST API 디자인 규칙

1. URL 에는 동사를 쓰지 말고, 자원을 표시한다.
2. 동사는 HTTP 메서드로 표현한다.
3. 자원의 종류가ㅣ 컬렉션인지 도큐먼트인지에 따라 단수, 복수를 나눈다.
4. 슬래시는 계층 관계를 나타내는데 사용한다.
5. 밑줄 대신 하이픈을 사용한다.

## api 테스트

- 웹브라우저 개발자 도구
- curl
- Intellij IDEA Ultimate- http request
- Postman
- XUnit
- HTTPie

```
http -v ":8080/hello?name=spring"
```

## HTTP

### Request

- Request Line: Method, Path, HTTP Version
- Headers
- Message Body

### Response

- Status Line: HTTP Version, Status Code, Status Text
- Headers
- Message Body

