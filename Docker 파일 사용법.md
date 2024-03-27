# Docker

```
FROM jdk
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

| command    | description                                                  |
| ---------- | ------------------------------------------------------------ |
| FROM       | 도커 런타임에 사용할 도커 이미지 지정                        |
| LABEL      | 도커 이미지 메타데이터로 key-value 형식으로 이루어짐         |
| COPY       | 파일 또는 디렉토리를 도커 컨테이너 이미지의 파일 시스템에 추가한다 |
| ARG        | 사용자가 docker build 명령을 사용하여 빌더에 전달할 수 있는 변수를 정의한다 |
| VOLUME     | 컨테이너의 마운트 지점                                       |
| RUN        | 명령과 해당 매개변수를 받아 이미지에서 컨테이너를 실행한다 (대체로 소프트웨어 패키지를 실행하는 명령어를 사용) |
| CMD        | ENTRYPOINT에 매개 변수를 제공한다. docker run과 유사하지만 컨테이너가 인스턴화된 후에만 실행된다는 차이점이 있다 |
| ADD        | 원천에서 파일을 복사하고 컨테이너 대상 위치에 추가한다       |
| ENTRYPOINT | 실행 파일로 실행할 컨테이너를 구성한다                       |
| ENV        | 환경 변수                                                    |

## docker shell 접속

```sh
 docker exec -it [docker ps ID] /bin/bash
```
alpine 이미지는 `/bin/bash` 지원을 안하는 경우가 있음 `/bin/sh` 사용

## docker image 위치 찾기

```sh
docker info | grep Root
```

