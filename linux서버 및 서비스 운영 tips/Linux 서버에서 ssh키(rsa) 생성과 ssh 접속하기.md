## ssh 설치하기

> **SSH**는 텔넷(Telnet)과 같은 용도지만, 보안이 더 강화된 원격 접속 툴이다. 텔넷과의 차이점은 RSA 등의 암호화 기법을 사용하며, 압축 기술 또한 제공하고 있다. 리눅스에서는 openssh를 통해 ssh를 이용할 수 있으며, 포트 번호는 22이다.

openssh-server, openssh-client

```sh
sudo apt install openssh

yum update openssh
```

##### 프로세스 시작시

```shell
systemctl start ssh
```

##### 프로세스 종료시

```sh
systemctl stop ssh
```

##### 서비스 시스템이 시작될 때 자동으로 시작하기 - 활성/비활성

```shell
systemctl enable ssh
systemctl disable ssh
```

## 비밀키로 접속 설정 플로우

`ssh-keygen` 명령어를 수행하여, private key(id_rsa), public key(id_rsa.pub) 를 생성한다.<br/>

-t 옵션을 사용하면 dsa, ecdsa, ed25519, rsa 등의 암호화 알고리즘을 선택할 수 있다.

```shell
$ ssh-keygen -t rsa # rsa 방식으로 private key가 생성된다.
```

생성된 private key를 접속할 계정의 host key 디렉토리에 넣어준다. (생성시 엔터를 누르면 `$HOME/.ssh` 위치에 생성된다.)<br/>SSH Client는 기본적으로 이 디렉토리에 있는 키를 이용해서 인증을 시도한다. 

```
Enter file in which to save the key (/home/axl/.ssh/id_rsa): <return>
```

passphrase를 입력한다. passphrase는 일종의 비밀번호로 비공개키를 입력한 값으로 암호화한다. 권장 값은 10~30 문자이고 생략 가능하다. 생략하면 이 부분이 보안 취약점이 될 수 있기 때문에 주의한다. 자동 로그인을 원한다면 생략해야 한다. 

```
Enter passphrase (empty for no passphrase): <``Type` `the passphrase>
```

비밀번호를 확인한다. 같은 값을 입력하면 된다. 아래와 같이 출력된다면 키가 생성된 것이다.

```
Enter same passphrase again: <``Type` `the passphrase>``Your identification has been saved in /home/axl/.ssh/id_rsa.``Your public key has been saved in /home/axl/.ssh/id_rsa.pub.``The key fingerprint is:``0b:fa:3c:b8:73:71:bf:58:57:eb:2a:2b:8c:2f:4e:37 kimzerovirus@myLocalHost
```

키를 확인한다. 

```sh
ls -al ~/.ssh/
```

#### key 파일 설명

| filename        | description                                                  |
| --------------- | ------------------------------------------------------------ |
| id_rsa          | private key, 절대로 타인에게 노출되면 안된다.                |
| id_rsa.pub      | public key, 접속하려는 리모트 머신의 authorized_keys에 입력한다. |
| authorized_keys | 리모트 머신의 .ssh 디렉토리 아래에 위치하면서 id_rsa.pub 키의 값을 저장한다. (authorized_keys 파일은 없을수도 있다) |

#### ssh 설정 확인하기

host key 디렉토리 설정 위치 등을 확인할 수 있다.

```sh
cd /etc/ssh
cat sshd_config

# host key 위치가 config에 설치 되어 있다.
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_dsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key

# 인증할 계정의 pub키 위치
# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile	.ssh/authorized_keys
```
기본 세팅 위치는 접속할 계정의 `home`디렉토리 아래 `.ssh` 폴더(`$HOME/.ssh`)이다. 그리고 아래와 같이 권한을 변경해 준다.

```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub  
chmod 644 ~/.ssh/authorized_keys
chmod 644 ~/.ssh/known_hosts
```



... 좀 더 정리 필요









## connect

```sh
ssh -v -i [rsa파일 위치] [계정]@[서버IP]
ex) ssh -v -i ./xen_rsa kimzerovirus@192.168.2.36
```
- `i` : identify로 rsa 파일 신원확인 옵션
- `v` : 연결할 때 로그를 보여준다



##### 참고
https://opentutorials.org/module/432/3742
