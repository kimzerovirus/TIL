# Docker-Compose

| property    | description                                                  |
| ----------- | ------------------------------------------------------------ |
| version     | 도커 컴포즈 도구 버전                                        |
| service     | 배포할 서비스 지정, 서비스 이름은 도커 인스턴스에 대한 DNS 엔트리이며, 다른 서비스에서 액세스 하는데 사용된다 |
| image       | 컨테이너를 실행할 도커 이미지                                |
| port        | 도커 컨테이너의 외부에 노출할 포트를 지정 및 도커 컨테이너 내부 및 외부 포트를 매핑한다 |
| environment | 도커 내부에 환경변수 전달한다                                |
| network     | 디폴트 타입은 bridge로 host, overlay 등의 타입이 있다        |
| alias       | 네트워크 내 서비스에 대한 호스트 별칭 지정                   |
| depends_on  | 서비스 의존 관계로 depends on에 기술된 서비스가 먼저 실행된 후 실행되게 된다 |

- `docker-compose [-f filename] up -d` 
- `docker-compose logs [service id]`
- `docker-compose ps`
- `docker-compsoe stop`  : 서비스를 마치고 종료한다, 컨테이너 중지
- `docker-compsoe down` : 모든 것을 종료하고 컨테이너를 삭제한다.

```yaml
services:
  zookeeper:
    ...

  kafka:
  	image: <kafka-image-name>
  	container_nmae: <container-name>
    ...
    depends_on:
      - zookeeper

```

다음과 같이 설정되어 있다면 zookeeper 서비스가 먼저 올라간 후 kafka 서비스가 실행되게 된다.

- ports: 포트의 형식은 `외부포트:컨테이너내부포트`로 지정한다.

- environment: 환경 변수

```bash
docker-compose -p [project_name] up -d # 프로젝트 이름 변경하여 실행
docker-compose logs # 최신 배포에 대한 모든 정보를 볼 수 있음
docker-compose logs [docker service id] # 특정 서비스에 대한 로그를 볼 수 있음
docker-compose ps # 시스템에 배포한 모든 컨테이너 목록을 출력
docker-compose stop # 서비스를 마치고 나서 서비스를 중지, 컨테이너도 중지
docker-compose down # 모든 도커 프로세스를 종료하고 컨테이너도 모두 제거
```



**tip**<br/>

도커 내부 폴더와 마운트 된 외부 폴더의 root write 권한이 없는 경우 permision dinied 된다. 따라서 write 권한 추가 필요함



restart 정책

```sh
services:
  app:
    image: my-app
    restart: no
    
# 이미 생성된 컨테이너여서 설정을 변경해야한다면
docker update --restart=no <container_name_or_id>
```
