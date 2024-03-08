## docker shell 접속
```sh
 docker exec -it [docker ps ID] /bin/bash
```
alpine 이미지는 `/bin/bash` 지원을 안하는 경우가 있음 `/bin/sh` 사용

## docker image 위치 찾기

```sh
docker info | grep Root
```

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
