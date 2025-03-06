# Tomcat war배포

tomcat에 설정된 위치에 war 파일 가져다 놓고 현재 애플리케이션이 실행 중이면 stop.sh 이후 start.sh 작동 그 후 tail.sh 로 기동 로그 확인

본인 사번 계정으로 리눅스에 파일 올리고 tmp에 옮겨서 톰캣용 계정으로 접근하면 mv로는 권한 문제로 접근 불가 하지만 cp로는 보통 가능한듯하다.

```
mvn clean -pl -am application -DskipTests
```

