## docker shell 접속
```sh
 docker exec -it [docker ps ID] /bin/bash
```
alpine 이미지는 `/bin/bash` 지원을 안하는 경우가 있음 `/bin/sh` 사용

## docker image 위치 찾기

```sh
docker info | grep Root
```
