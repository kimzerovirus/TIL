# Linux

devian 계열은 apt

## Linux Shell

Mainpulate Linux Kernel

### Linux Shell Types

- sh (Bourne shell) : By Unix Shell, Super shell
- bash (Bourne-agin shell) : Super shell in Linux
- csh (C shell) : C like syntax
- tcsh (Enhanced-C shell)
- ksh (korn shell) : Powerful Script Language
- zch (Z shell) : Unix/GNU shell script, Powerful Script Language

## Linux File System Directories

- `/bin` : 기본 명령어
- `/sbin` : 관리자용, ifconfig
- `/boot` : for booting
- `/dev` : device file, cd-rom
- `/etc` : config, passwd, rc.d
- `/home` : user home dir
- `/lib` : shared library
- `/media` : ssd
- `/opt` : application software package
- `/proc` : process info
- `/root` : root home dir
- `/srv` : system data
- `/tmp` : temporary dir
- `/usr` : source or programs
- `/var` : logs, ftp, spool, mail

## Linux Ports

| Port Number | Name          | Port Number | Name                        |
| ----------- | ------------- | ----------- | --------------------------- |
| 20          | FTP (data)    | 110         | POP3                        |
| 21          | FTP (control) | 123         | NTP (Network Time Protocol) |
| 22          | SSH           | 143         | IMAP2/4                     |
| 23          | Telnet        | 443         | HTTPS                       |
| 25          | SMTP          | 465         | SMTPS                       |
| 43          | whois         | 514         | SysLog                      |
| 53          | DNS           | 993         | IMAPS                       |
| 80          | HTTP          | 995         | POP3S                       |

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

## Linux Run Configuration Files

| file              | description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| /etc/profile      | 시스템 전역 쉘 변수 초기화 (특별한 일이 없으면 건드리지 않는것을 권장) |
| /etc/profile.d/\* | 사용자가 전역 설정을 필요로 할 경우 해당 경로에서 설정을 권장한다.     |
| ~/.bash_profile   | 사용자 개인의 환경 설정 파일 (JAVA_HOME 등을 설정한다.)                |
| ~/.bashrc         | 사용자 개인의 alias 및 변수 설정                                       |
| ~/.bash_logout    | 사용자 개인의 로그아웃 설정                                            |

## chmod

모든 사용자에게 파일 실행 권한 설정

```bash
chmod a+x test.txt
```

소유자에게만 파일 실행 권한 설정

```bash
chmod u+x test.txt
```

그룹에게만 파일 실행 권한 설정

```bash
chmod g+x test.txt
```

모든 사용자에게 파일 쓰기 권한 설정

```bash
chmod a+w test.txt
```

소유자에게만 파일 쓰기 권한 설정

```bash
chmod g+w test.txt
```

그룹에게만 파일 쓰기 권한 설정

```bash
chmod g+w test.txt
```

모든 사용자에게 파일 읽기 권한 설정

```bash
chmod a+r test.txt
```

소유자에게만 파일의 읽기 권한 설정

```bash
chmod u+r test.txt
```

그룹에게만 파일의 읽기 권한 설정

```bash
chmod g+r test.txt
```

## chown

파일 소유자 정보 확인

```bash
chown -R user:group <file or directory>
```
