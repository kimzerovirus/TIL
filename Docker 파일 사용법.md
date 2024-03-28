# Docker

## Install

https://docs.docker.com/engine/install/

## Example

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

<<<<<<< HEAD:docker/docker.md
## docker 권한 문제 해결 방법

도커는 항상 root로 실행되기 때문에 sudo를 사용하여 명령어를 입력해야 한다. 그렇지 않을 경우 아래와 같이 permission denied 된다.

```sh
$ docker images
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/images/json": dial unix /var/run/docker.sock: connect: permission deniedCode language: JavaScript (javascript)
```

해당 사용자를 docker 그룹에 추가하면 sudo 명령어를 사용하지 않고 도커 명령어를 쓸 수 있다.

```sh
$ sudo usermod -aG docker [username]
```

그리고 도커를 재시작 한다.

```sh
$ sudo service docker restart
```



## docker bug..

docker image 실행시 설정되어 있는 external port가 자동으로 방화벽을 뚫어버리는 버그?가 있음
