### docker파일 작성
- FROM : 이미지를 생성할 때 사용할 기반 이미지 → alpine은 cloud 환경을 고려한 가벼운 linux 이미지이다.
- WORKDIR : 작업 디렉토리를 지정하는 것. 없으면 새로 생성한다.
- COPY : build 명령 중간에 호스트의 파일 또는 폴더를 가져와 이미지에 가져오는 것이다.
- RUN : image가 올라갔을 때 실행되는 명령어
- CMD : 컨테이너를 생성 및 실행 시에 실행하는 명령어
- EXPOSE : 생성된 이미지에서 열어줄 포트


docker build -t [image_name] --name [container_name?] ./ [docker_file생성위치?]
→ `docker build -t node/test ./ `
<br/>
docker run -p [local_port]:[docker_port -> source_code_port]
→ `docker run -p 3600:3600 node/test`

### 하나의 도커 이미지로 여러개의 도커 컨테이너를 여는법
도커 이미지 한개로 여러개의 컨테이너를 실행할 수 있는데 이 때 컨테이너를 실행하면서 각기 다른 포트로 열어 주어야 된다.
[참고](https://phin09.tistory.com/81)
Docker compose란, 여러 개의 컨테이너로부터 이루어진 서비스를 구축, 실행하는 순서를 자동으로 하여, 관리를 간단히하는 기능이다.
