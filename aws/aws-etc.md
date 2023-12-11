

## EC2

### 요금 체계

- 온디맨드
- 스팟 인스턴스
- Savings Plans
- 전용 호스팅

남의 컴퓨터를 빌려서 원격제어를 통해서 사용하는것

온디맨드 : 쓰는 만큼 돈내는것

예약 인스턴스 : 정액제

컴퓨터 1대 = 인스턴스 1?

Elastic Compute Cloud (EC2) : 클라우드의 가상 서버 (컴퓨터)

### 인스턴스 만들기

1. 인스턴스 유형 선택 및 생성
2. 기존 키 페어 선택 또는 새 키 페어 생성 (이렇게 생성된 키로 ec2에 원격 접속 가능함)
3. 인스턴스 생성되면 업데이트 부터 진행

```bash
sudo yum update
sudo hostnamectl set-hostname [hostname]
sudo timedatectl set-timezone Asia/Seoul #time zone 설정
date

yum list | grep java-11
sudo yum install java-11-amazon-corretto-headless

pwd
mkdir

sudo systemctl status [ ]
sudo systemctl start [ ]

nohup java -jar [ ].jar &
```

4. 기본은 유동이므로 고정 IP 따로 생성해야됨, 인터넷에서 연결 가능한 퍼블릭 ip 설정하려면 탄력적 IP(Elastic ip) 할당해야함 dns 이용도 고려(elastic ip를 ec2에 연결해 두는것 까지는 무료고 이건 유료, 연결해제시 돈나감)



## S3 Simple Storage Service

## Cloud Front

## RDS

ec2에서 접속하려면 보안그룹 설정에서 해당 ec2의 vcp id를 알맞게 설정해 줘야함

ec2가 아닌 외부에서 접속하려면 퍼블릭 엑세스 허용해야함

## Code Deploy

ec2에 code deploy 설치 등 설정을 미리 해줘야함

[aws 제공하는 인스턴스 설정 안내문](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/instances.html)

```bash
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start
systemctl status codedeploy-agent
systemctl --now enable codedeploy-agent
```

- ec2에 태그 설정으로 codedeploy연결해줘야함
- ec2에는 role에서 `AmazonS3FullAccess`, `AWSCodeDeployFullAccess` 권한을 부여해야함
- codedeploy 에는 `AWSCodeDeployRole` 부여

<br/>

code deploy 에러가 났는데 aws console에서 에러 로그가 확인 되지 않는다면 ec2에서 `/var/log/aws/codedeploy-agent/codedeploy-agent.log` 로그 파일을 살펴보면됨

<br/>

**InstanceAgent::Plugins::CodeDeployPlugin::CommandPoller: Missing credentials - please check if this instance was started with an IAM instance profile 에러**

> EC2에 CodeDeploy 관련 IAM Role이 부여되기 전에 CodeDeploy Agent가 실행되면서 IAM Role을 못 가져간 것.
>
> EC2의 IAM Role이 바뀌면 CodeDeploy Agent restart 해주면 됨

