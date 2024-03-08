## 리눅스 명령어

```shell
# 루트 권한
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

### 폴더 생성

```bash
mkdir [foldername]
```

### 파일 생성

```bash
vi [filename]
```

### 파일, 폴더 복사

```bash
cp [original file] [destination]
cp -r [original folder] [destination]
```

### 파일, 폴더 이동

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

### lsof (list open files)

```bash
lsof -i :[port]
kill -9 [pid]
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

### ll

```bash
ll
```

해당 위치 파일 및 디렉토리 리스트를 디렉토리의 권한까지 볼 수 있음

### chown

```bash
chown -r [id]

chown -R admin:admin [directory]
```

## scp

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
