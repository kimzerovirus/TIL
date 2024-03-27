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

## docker 내부에서 scp를 통하여 전송시 발생한 에러 해결 방법

전송할 서버와 `known_hosts` 파일을 동일하게 도커 내부에도 세팅해준다. 해당 파일은 `$HOME/.ssh` 위치에 있다. 복사하여 도커 내부의 같은 위치에 넣어준다.

```sh
ADD id_rsa.pub /home/ubuntu/.ssh/authorized_keys

RUN chown -R ubuntu:ubuntu /home/ubuntu/.ssh
RUN chmod -R 700 /home/ubuntu/.ssh
```

사용할 수 있게 권한 맞춰주는것도 잊지말것
