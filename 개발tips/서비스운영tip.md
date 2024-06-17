# 서비스 운영 tip

top

less

## 프로세스 확인

```sh
ps -ef | grep java
```

#### 옵션
- a(all processes) : 프로세스 현황 표시(다른유저)
- u(user) : 유저지향적(top 포맷)
- x : 터미널 제어 없이 프로세스 현황 보기
- e(all processes) : 현재 system내에서 실행중인 모든 프로세스 정보를 출력
- f(full listing) : uid,pid,ppid,c stime,tty,time,cmd
- o(user) : 유저 포맷팅

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

## 처음 접속해보는 서버에서 작업 할 때

history 명령어로 전에 작업한 사람들이 어떤 명령어를 날렸는지 확인해보고 작업하기

