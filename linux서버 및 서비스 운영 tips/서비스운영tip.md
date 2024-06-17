# 서비스 운영 tip

> 처음 들어가보는 서버의 경우 `history` 명령어를 날려 이전 작업자들이 어떠한 명령어를 실행시켜봤는지 확인해보자~

## history

```shell
history | less # 페이지 단위로 보여주며 space를 누르면 한 페이지 단위로 이동 함
history [n] # n개 만큼 이전 기록 출력
history | grep git | tail # git을 사용한 명령어를 찾되 단 최근의 10개만 볼 수 있음
!100 # history의 100번째 줄을 다시 실행
!! # 가장 마지막에 사용한 명령어를 실행
!100:p # 100번째 명령어를 출력
```

## 시스템 정보 확인

### 시스템 사용률

```shell
top
```

cpu, memory 사용률 확인 할 수 있으며, 표시가 다음과 같다면 us (use) id (idle <<< 놀고 있다는거)

### 디스크

```shell
df -h # 디스크 마운트 정보
```

## 프로세스 확인

```sh
ps -ef | grep "찾을 대상 이름"
ps -ef | grep java
ps -ef | grep application-name | grep SNAPSHOT | grep -v grep
```

##### 옵션
- `a` (all processes) : 프로세스 현황 표시(다른유저)
- `u` (user) : 유저지향적(top 포맷)
- `x` : 터미널 제어 없이 프로세스 현황 보기
- `e` (all processes) : 현재 system내에서 실행중인 모든 프로세스 정보를 출력
- `f` (full listing) : uid,pid,ppid,c stime,tty,time,cmd
- `o` (user) : 유저 포맷팅



### JAVA 프로세스 확인

기동되고 있는 java 프로세스를 확인한다.

```perl
netstat -ntlp | grep java
```

해당 프로세스의 PID를 확인한다. *8080/java* 와 같이 출력이 된다. 만약 포트는 리스팅 중인데 java가 안보이면 프로세스를 실행시킨 계정이 아니어서 그럴 확률이 높다.<br/>

ps 명령어로 프로세스의 상세 정보를 확인한다.

```perl
ps -ef | grep 8080
```

java 경로와 함께 여러 구성 파일이나 jar의 경로를 모두 출력한다. 라인 구분없이 막 뱉으면 잘 안 보일 수도 있는데, 이럴 경우에는 grep을 한 번 더 걸어서 bin/java 에 하이라이트를 주면 찾기가 쉽다.

```perl
ps -ef | grep 8080 | grep bin/java
```



## 포트 관련

### PORT 죽이기

```sh
kill [PID NUMBER]
```

### PORT가 LISTEN 중인지 확인

```sh
netstat -na | grep [port_num]
```

```
netstat -na | grep 5000
tcp6       0      0  *.5000                 *.*                    LISTEN
tcp4       0      0  *.5000                 *.*                    LISTEN
```



## Java Application

jvm.options 파일을 통해 자바 heap 메모리 사이즈를 설정할 수 있다. (ex. elasticsearch, logstash와 같은 java 기반 서비스들도 해당 파일을 통해 설정 가능)

```shell
-Xmx30g # 최대 30gb
-Xms1g # 최소 1gb
```

다만, 해당 파일 이외에 실행 스크립트에서 추가하면 실행 스크립트에서 설정된 값으로 어플리케이션이 실행된다.



## 로그 검색

### grep

```shell
grep -Hni "검색어" -A5 -B5 ./파일명
```
- H : 파일명 표시
- n : 줄 번호 표시
- i : 대소문자 구분x
- A,B : 검색어 앞뒤 몇 줄 가져올것인지

```shell
zcat ./server.2023-11-1[0-5].log.gz | grep -hni -A10 -B10 -Fe "[ERROR]"
```
zcat은 gz 압축된 파일을 읽을 수 있다. -Fe는 특수문자를 검색어로 사용할 수 있는 옵션

```bash
grep -r "검색어" ./*
```

현재 디렉토리 기준으로 모두 가져옴, 상위 디렉토리는 탐색 x

### find + grep 활용하기

```shell
find ./ -maxdepth 1 -type f -name 'server.log*' -exec grep -Hni Error {} \;
```

- 검색범위는 최대 하위로 내려가는 depth는 1 = 현재 폴더에서만 검색
- 형태는 `f` 파일형태만
- 파일 이름은 `server.log` 로 시작
- 그 결과를 {} 위치에 넣으면서 grep -Hni Error {} 명령어를 실행

### head, tail

- `head [filename]` : 파일의 상단에서 부터 10줄 출력

- `tail [filename]`  : 파일의 하단에서 부터 10줄 출력

##### 옵션

- `-f` : 파일의 변화를 모니터링
- `-n` : 가져올 행 수

현재 들어오는 로그를 실시간으로 계속 보고 싶다면

```shell
tail -f ./server.log
```



## vi

> 설정 파일과 같은 파일들은 되도록이면 vi 보다는 cat으로 열어보자 (vi는 수정이 되므로 위험해~) <br/>
>
> 설정 파일을 수정하는 작업을 하게 될 경우 `sample.conf.bak` 과 같은 백업 파일을 cp 해두고 작업하자!

### vi 이동

| 명령어       | 설명                       |
| ------------ | -------------------------- |
| `ctrl + u`   | 반 화면 위로 스크롤        |
| `ctrl + d`   | 반 화면 아래로 스크롤      |
| `ctrl + b`   | 한 화면 위로 스크롤        |
| `ctrl + f`   | 한 화면 아래로 스크롤      |
| `gg` or `1G` | 문서의 맨 처음으로 이동    |
| `G`          | 문서의 맨 아래로 이동      |
| `^`          | 그 행의 첫 글자로 이동     |
| `$`          | 그 행의 마지막 글자로 이동 |

### vi 검색

| 명령어        | 설명                                                         |
| ------------- | ------------------------------------------------------------ |
| `/찾을문자열` | 현재 커서 위치에서 *아래방향* 으로 탐색 `예) :/text`         |
| `?찾을문자열` | 현재 커서 위치에서 *윗방향* 으로 탐색(역방향 탐색) `예) :?text` |

- **다음** 문자열을 계속 탐색 하려면 `소문자 n` 

- **이전** 문자열을 계속 탐색(역방향) 하려면 `대문자 N`

### 복사 & 붙여넣기 & 삭제

| 명령어      | 설명                             |
| ----------- | -------------------------------- |
| `yy` or `Y` | 커서가 있는 한 행 복사           |
| `p`         | 현재 커서에 붙여 넣기            |
| `P`         | 현재 커서위치의 앞행에 붙여 넣기 |
| `x` or `dl` | 커서 위치의 글자 삭제            |
| `X` or `dh` | 커서 바로 앞의 글자 삭제         |
| `dG`        | 현재 위치 이하 모두 삭제         |
| `dd`        | 커서가 있는 행을 삭제            |
| `dw`        | 현재 위치부터 스페이스 까지 삭제 |

```shell
# 전체 복사
gg # 1.첫번째 줄로 이동
yG # 2.현재 위치 이하 모두 복사

# 전체 삭제
gg # 1.첫번째 줄로 이동
dG # 2.현재 위치 이하 모두 삭제
```
