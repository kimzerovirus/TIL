# ssh
```sh
cd /etc/ssh
cat sshd_config

# host key 위치가 config에 설치 되어 있다.
HostKey /etc/ssh/ssh_host_rsa_key
#HostKey /etc/ssh/ssh_host_dsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key

# 인증할 계정의 pub키 위치
# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile	.ssh/authorized_keys
```

```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub  
chmod 644 ~/.ssh/authorized_keys
chmod 644 ~/.ssh/known_hosts
```

## connect
```sh
ssh -v -i [rsa파일 위치] [계정]@[서버IP]
ex) ssh -v -i ./xen_rsa kimzerovirus@192.168.2.36
```
- `i` : identify로 rsa 파일 신원확인 옵션
- `v` : 연결할 때 로그를 보여준다

##### 참고
https://opentutorials.org/module/432/3742
