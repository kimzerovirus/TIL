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

## Ports

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

## Linux Run Configuration Files

| file              | description                                                  |
| ----------------- | ------------------------------------------------------------ |
| /etc/profile      | 시스템 전역 쉘 변수 초기화 (특별한 일이 없으면 건드리지 않는것을 권장) |
| /etc/profile.d/\* | 사용자가 전역 설정을 필요로 할 경우 해당 경로에서 설정을 권장한다. |
| ~/.bash_profile   | 사용자 개인의 환경 설정 파일 (JAVA_HOME 등을 설정한다.)      |
| ~/.bashrc         | 사용자 개인의 alias 및 변수 설정                             |
| ~/.bash_logout    | 사용자 개인의 로그아웃 설정                                  |
