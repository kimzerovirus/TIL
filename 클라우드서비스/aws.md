남의 컴퓨터를 빌려서 원격제어를 통해서 사용하는것

온디맨드 : 쓰는 만큼 돈내는것

예약 인스턴스 : 정액제

컴퓨터 1대 = 인스턴스 1?

Elastic Compute Cloud (EC2) : 클라우드의 가상 서버 (컴퓨터)

Simple Storage Service (S3) : 스토리지



```
sudo yum update
sudo hostnamectl set-hostname [hostname]
sudo timedatectl set-timezone Asia/Seoul
date

yum list | grep java-11
sudo yum install java-11-amazon-corretto-headless

pwd
mkdir

sudo systemctl status [ ]
sudo systemctl start [ ]

nohup java -jar [ ].jar &
```

기본은 유동이므로 고정 IP 따로 생성해야됨



## EC2

### 요금 체계
- 온디맨드
- 스팟 인스턴스
- Savings Plans
- 전용 호스팅

### 인스턴스 만들기

1. 인스턴스 유형 선택 및 생성
2. 기존 키 페어 선택 또는 새 키 페어 생성 (이렇게 생성된 키로 ec2에 원격 접속 가능함)

## 보안

### IAM

### MFA (Multi Factor Authentication)

## S3 Simple Storage Service

## Cloud Front

## RDS

## Code Deploy

## Route53
