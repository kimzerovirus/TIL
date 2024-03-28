## 로그인 명령어

```shell
# 권한 가져오기
su - [계졍]

# 루트 권한 sudoer
sudo su -
```



## Tips

```bash
$> 찾고자하는 파일 대충 입력하고 tab 누르면 자동완성해줌
$> Arrow Up & Down
$> ! ${찾고자하는 이전 사용 명령어의 시작 알파벳}
$> !! # 바로 이전 사용한 명령어
$> Ctrl + A, Ctrl + E
$> history
$> man ${명령} # 메뉴얼
$> vmstat # 서버 상태 보여줌
```



## telnet

```bash
telnet [ip] [port]
```

curl + telnet

```bash
curl -v telnet://주소
```

-v 옵션을 해줘야 안내문 같은거 나옴<br/>

curl telnet ping



## Linux의 Disk구조

> sda (sda1, sda2) | sdb | sdc<br/>
> sd는 디스크를 의미하고 그 뒤에 붙는 알파벳 a,b,c는 순서 그 다음에 있는 숫자는 파티션 넘버를 의미

```bash
df -m
lsblk # 디스크 구조를 트리형태로 조회할 수 있음 <- 파티션별 배정 용량 확인하기 편함
```



## Partition

**모든 디스크와 파티션 정보 조회**

```bash
fdisk -l
```



### fdisk

```bash
fdisk /dev/sdb
```

- d: 파티션 삭제
- l: 파티션 목록 출력
- m: 명령어 목록 출력
- n: 새 파티션 추가
- p: 현재 파티션 설정 출력
- q: fdisk 명령 종료
- t: 파티션 타입 변경
- w: 파티션 변경사항 저장



## Mount

**마운트 목록 조회**

```bash
df -Th
```



## chmod

**chmod [권한숫자] [권한바꿀파일] (디렉토리면 -R 추가)**

- `a` : 모든 사용자
- `u` : 사용자
- `g` : 그룹
- `r` : 읽기 권한 (4)
- `w` : 쓰기 권한 (2)
- `x` : 실행 권한 (1)

*예시*

> 777 = (유저권한)4+2+1, (그룹권한)4+2+1, (이외권한)4+2+1 <br/>
>
> chmod 777 test.txt

```bash
chmod u+r test.txt # 소유자에게만 파일의 읽기 권한 설정
chmod a+x test.txt # 모든 사용자에게 파일 실행 권한 설정
chmod g+w test.txt # 그룹에게만 파일 쓰기 권한 설정
```



## chown

파일 소유자 정보 확인

```bash
chown -r [id]
chown -R user:group <file or directory>
```

파일의 경우 **chown 소유권갖을유저:소유권갖을그룹 파일** 을 하거나, 폴더의 경우 **chown -R [소유권갖을유저]:[소유권갖을그룹] [디렉토리]** 하면된다.



## 방화벽

```shell
cd /etc/firewalld # 방화벽 설정 파일 위치

nmap [ip] -p[port num]
```



## 파일 및 폴더 관련 명령어

폴더는 `-r` 옵션 추가해주면 됨

### 폴더 생성

```bash
mkdir [foldername]
```

### 파일 생성

```bash
vi [filename]
```

### 복사

```bash
cp [original file] [destination]
cp -r [original folder] [destination]
```

### 이동

```bash
mv [original file, folder] [destination]
```

### 바로가기 링크

```bash
ln [original file] [destination & new filename]
ln -s [original folder] [destination & new foldername]
```

### 삭제

```bash
rm [file]
rm -r [folder]
```

### 조회

```bash
ll
```

해당 위치 파일 및 디렉토리 리스트를 디렉토리의 권한까지 볼 수 있음



## 포트 찾기

### lsof (list open files)

```bash
lsof -i :[port]
kill -9 [pid] # 포트 죽이기
```

### ps (process status: -e 모든프로세스 출력, -f 풀 포맷[UID,PID])

```bash
ps -ef | grep ""
```

### netstat

```bash
netstat -na | grep "port num" # 해당 포트로 서비스 올라갔는지 확인하기 편함
```

`-l (listen)` : 연결 가능한 상태<br/>

`-n (number port)` : 포트 넘버<br/>

`-t ` : tcp<br/>

`-u ` : udp<br/>

`-p` : 프로그램 이름 / PID<br/>

`-a` : 모두<br/>

`-i` : 이더넷 카드별 정상/에러/드랍 송수신 패킷 수 확인<br/>

`-r` : 라우팅 테이블<br/>

`-s` : 네트워크 통계<br/>



## scp

> rsa 키 같은걸 사용하면 -i 옵션 필요? ~/.ssh 위치에 known_host 파일로 식별

```sh
scp -i -r [rsa key file] [전송할 폴더] server_ip@[전송 위치]
> ex) scp -i ~/.ssh/private-key ~/example.txt kimzerovirus@123.123.xx.xxx:/home/test
> ex) scp -P 22 kimzerovirus@123.123.xx.xxx:/home/kimzerovirus/example.txt /home/test
```

- `-r` : 폴더 전송
- `-P` : ssh 포트 지정
- `-i` : identity file을 지정해서 사용(identity file 경로를 지정)

- `-v` : 상세내용을 보면서 디버깅 할 때 사용(verbose 모드)
- `-p` : 전송 시 파일 수정 시간과 권한을 유지

#### 로컬에서 원격으로 전송 (Local→Remote)

```sh
scp [옵션] [파일명1] [파일명2] [유저명]@[IP주소]:[받을 경로]
```

#### 원격에서 로컬로 전송 (Remote→Local)

```sh
scp [옵션] [유저명]@[IP주소]:"[파일명1] [파일명2]" [받을 경로]
```

원격지에서 보낼 파일들의 경로를 “ “을 이용해 묶어준다.

#### 원격에서 원격으로 전송 (Remote→Remote)

```sh
scp [옵션] [유저명]@[IP주소]:"[파일명1] [파일명2]" [유저명]@[IP주소]:[받을 경로]
```

원격지에서 보낼 파일들의 경로를 “ “을 이용해 묶어준다.

<br/>
SSH 키 이용 시 bad permissions: ignore key: 에러가 발생할 경우

```sh
chmod 400 ./{key_name}
```

키 파일의 권한을 변경해주면 된다.

