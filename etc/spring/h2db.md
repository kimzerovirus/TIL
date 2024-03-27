# H2

```yml
spring:
  datasource:
#    url: jdbc:h2:mem:testdb
    url: jdbc:h2:~/testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  h2:
    console:
      enabled: true # localhost:8080/h2-console
```