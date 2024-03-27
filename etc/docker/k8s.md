# Kubernetes


## master01 설치
1. lightsail에서 master1~3 개 vm 생성 한다 
```bash
## rke2-master01-install.sh

#!/bin/bash -x

swapoff -a
apt-get update -y
systemctl stop ufw && ufw disable && iptables -F

echo "===========download rke2============"
curl -sfL https://get.rke2.io | sh -

systemctl enable rke2-server.service

mkdir -p /etc/rancher/rke2/

echo "========EXTERNAL_IP : $EXTERNAL_IP"

cat <<EOF > /etc/rancher/rke2/config.yaml
write-kubeconfig-mode: "0644"
tls-san:
  - $EXTERNAL_IP
etcd-expose-metrics: true
EOF

echo "=======rke2-server start============"
systemctl start rke2-server.service

# kubeconfig
echo "=====kubeconfig settings======="
mkdir -p ~/.kube/
cp /etc/rancher/rke2/rke2.yaml ~/.kube/config
export PATH=$PATH:/var/lib/rancher/rke2/bin/
echo 'export PATH=/usr/local/bin:/var/lib/rancher/rke2/bin:$PATH' >> ~/.bashrc

echo 'source <(kubectl completion bash)' >>~/.bashrc
echo 'alias k=kubectl' >>~/.bashrc
echo 'complete -F __start_kubectl k' >>~/.bashrc
```

```bash
## root로 로그인

export EXTERNAL_IP=43.203.210.49
sh rke2-master01-install.sh

source ~/.bashrc

## debug
journalctl -u rke2-server -f

kubectl version
kubectl config view 
kubectl cluster-info
kubectl get nodes
kubectl get pod -A
```

## 참고: uninstall rke2
```sh
rke2-uninstall.sh
```

### k9s 설치 

모니터링 툴

```bash
# install k9s with snap
snap install k9s 
ln -s /snap/k9s/current/bin/k9s /snap/bin/
```

- `:` 입력시 명령어 입력 가능 ex) ns, service

- `esc` 입력 종료

### master01 token  

master01에서 
```
cat /var/lib/rancher/rke2/server/node-token

K10856fb17a5ce7eb3c083c9fa5b18e7aed519245dd4e29a342ffbf79865c6feb3b::server:3a0459d3712e2b9d4e4d69b6c5f38d89
```

## master02 설치 

```bash
## rke2-master02-03-install.sh

#!/bin/bash -x

swapoff -a
apt-get update -y
systemctl stop ufw && ufw disable && iptables -F

echo "=======download rke2======"
curl -sfL https://get.rke2.io | sh -

systemctl enable rke2-server.service

mkdir -p /etc/rancher/rke2/

echo "========EXTERNAL_IP : $EXTERNAL_IP"
echo "========MASTER01_INTERNAL_IP : $MASTER01_INTERNAL_IP"

cat <<EOF > /etc/rancher/rke2/config.yaml
server: https://${MASTER01_INTERNAL_IP}:9345
token: $TOKEN
write-kubeconfig-mode: "0644"
tls-san:
    - $EXTERNAL_IP
etcd-expose-metrics: true
EOF

echo "rke2-server start"
systemctl start rke2-server.service

# kubeconfig
echo "=====kubeconfig settings======"
mkdir -p ~/.kube/
cp /etc/rancher/rke2/rke2.yaml ~/.kube/config
export PATH=$PATH:/var/lib/rancher/rke2/bin/
echo 'export PATH=/usr/local/bin:/var/lib/rancher/rke2/bin:$PATH' >> ~/.bashrc

echo 'source <(kubectl completion bash)' >>~/.bashrc
echo 'alias k=kubectl' >>~/.bashrc
echo 'complete -F __start_kubectl k' >>~/.bashrc
```

```bash
## root로 로그인 

export EXTERNAL_IP=43.203.210.49
export MASTER01_INTERNAL_IP=172.26.8.159
export TOKEN=K10856fb17a5ce7eb3c083c9fa5b18e7aed519245dd4e29a342ffbf79865c6feb3b::server:3a0459d3712e2b9d4e4d69b6c5f38d89
sh rke2-master02-03-install.sh

```

## master03 설치 
```bash
## root로 로그인 
export EXTERNAL_IP=43.203.210.49
export MASTER01_INTERNAL_IP=172.26.8.159
export TOKEN=K10856fb17a5ce7eb3c083c9fa5b18e7aed519245dd4e29a342ffbf79865c6feb3b::server:3a0459d3712e2b9d4e4d69b6c5f38d89

sh rke2-master02-03-install.sh
```

## worker(agent)

```bash
## rke2-agent-install.sh

#!/bin/bash -x

swapoff -a
apt-get update -y
systemctl stop ufw && ufw disable && iptables -F

echo "===========download rke2 agent============"
curl -sfL https://get.rke2.io  | INSTALL_RKE2_TYPE="agent" sh -

systemctl enable rke2-agent.service

mkdir -p /etc/rancher/rke2/

echo "========MASTER01_INTERNAL_IP : $MASTER01_INTERNAL_IP"


cat <<EOF > /etc/rancher/rke2/config.yaml
server: https://${MASTER01_INTERNAL_IP}:9345
token: $TOKEN
EOF

echo "=======rke2-agent start============"
systemctl start rke2-agent.service
```

```sh 
export MASTER01_INTERNAL_IP=172.26.8.159
export TOKEN=K10856fb17a5ce7eb3c083c9fa5b18e7aed519245dd4e29a342ffbf79865c6feb3b::server:3a0459d3712e2b9d4e4d69b6c5f38d89
sh rke2-agent-install.sh

```

# install-vm tools 설치

```bash
## install kubectl 
sudo apt update
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

echo 'source <(kubectl completion bash)' >>~/.bashrc
echo 'alias k=kubectl' >>~/.bashrc
echo 'complete -F __start_kubectl k' >>~/.bashrc

source ~/.bashrc
k version

## ansible은 ssh 통신을 위해서 ssh public-key를  각 서버에  공유한다 
ssh-keygen -t rsa -b 4096 
ls ~/.ssh/

cat ~/.ssh/id_rsa.pub 
## text 편집기에서 1줄로 정리한다 
```

### master-1 서버에서 ssh 설정

```bash
## ubuntu 유저로 실행 
## master-1 서버 접속하여 install-vm의 id_rsa.pub 값을 master-1의 authorized_keys 에 추가한다
vi ~/.ssh/authorized_keys


## install-vm에서 
## kubconfig copy
mkdir -p ~/.kube/
scp ubuntu@172.26.13.104:~/.kube/config ~/.kube/config
cat ~/.kube/config
sed -i 's/127.0.0.1/172.26.11.45/g' ~/.kube/config
cat ~/.kube/config

## master-1의 6443 방화벽 open을 먼저 한다 
k get pod -A
```

### k9s 설치

```bash
# install k9s with snap
sudo snap install k9s 
sudo ln -s /snap/k9s/current/bin/k9s /snap/bin/
```

### 로컬에서 kubectl remote 접속 하기

```bash
## master-1에서 실행 
cat ~/.kube/config

## 로컬위치(~/.kube/config) 복사해 넣는다 
export KUBECONFIG=~/.kube/config

# master-1의 external-ip로 변경한다  
# kubectl get pod -A 로 하면 접속이 안되어 timeout이 된다 
# lightsail master01의 방화벽에서 6443 포트를 open 한다 

kubectl get pod -A
kubectl get nodes
```

### tls-san 변경하거나 추가 한다면

```bash
# 수정 후 재시작하면 된다.
sudo vi  /etc/rancher/rke2/config.yaml

sudo systemctl restart rke2-server.service

sudo systemctl status  rke2-server.service
```

### ssh cofnig

- local에서 진행

```bash
cd ~
vi .ssh/cofnig
----------
Host master-1
  HostName 3.39.238.55
  IdentityFile /Users/blackstar/.ssh/aws/lightsail-key.pem
  User ubuntu

ssh master-1
```







rke2 설치

k9s 모니터링용

`:` 입력시 명령어 입력 가능 ns, service

`esc` 입력 종료



로컬에서 붙을 수 있게 kubectl 세팅할것

~/.kube$ kubectl config view

master에 접속해서 작업하면 절대 안됨!!

밖에서 remote로 붙어서 작업한다



6443포트 방화벽 열어줘야 kubectl로 remote 접속가능하다는점

k get pod -A  <- kube config 필요함
