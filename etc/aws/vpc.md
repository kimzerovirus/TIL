# VPC (Virtual Private Cloud)

## VPC란 무엇인가?

> 논리적으로 격리된 가상의 컴퓨터

Amazon Virtual Private Cloud(VPC)는 사용자가 정의한 논리적으로 격리된 가상 네트워크에서 AWS 리소스를 시작할 수 있도록 하는 서비스입니다. IP 주소 범위 선택, 서브넷 생성, 라우팅 테이블 및 네트워크 게이트웨이 구성 등 가상 네트워킹 환경을 완벽하게 제어할 수 있습니다. 리소스 및 애플리케이션에 대한 안전하고 쉬운 액세스를 보장하도록 지원하기 위해 IPv4 및 IPv6를 VPC 내 대부분의 리소스에 대해 사용할 수 있습니다.<br/>

AWS의 기본 서비스인 Amazon VPC는 사용자 VPC 네트워크 구성을 쉽게 사용자 지정하도록 지원합니다. 인터넷에 액세스할 수 있는 웹 서버를 위해 퍼블릭 서브넷을 생성할 수 있습니다. 또한 인터넷 액세스가 없는 프라이빗 서브넷에 데이터베이스나 애플리케이션 서버 같은 백엔드 시스템을 배치하도록 지원합니다. Amazon VPC를 사용하면 보안 그룹 및 네트워크 액세스 제어 목록을 포함한 다중 보안 계층을 사용하여 각 서브넷에서 Amazon Elastic Compute Cloud(Amazon EC2) 인스턴스에 대한 액세스를 제어하도록 지원할 수 있습니다.

![vpc](../_img/aws/vpc.png)

 VPC에는 리전의 각 가용성 영역에 하나의 서브넷이 있고, 각 서브넷에 EC2 인스턴스가 있고, VPC의 리소스와 인터넷 간의 통신을 허용하는 인터넷 게이트웨이가 있다.

## VPC 기능
<!--
- 가상 네트워킹 환경 제어

  - IP주소 범위 선택

  - 서브넷 생성

  - 라우팅 테이블 및 네트워크 게이트 웨이 구성

- 리소스 및 애플리케이션에 대한 안전하고 쉬운 액세스를 보장하도록 지원하기 위해 IPv4 및 IPv6를 VPC 내 대부분의 리소스에 대해 사용 가능
- 인터넷에 액세스할 수 있는 웹 서버를 위해 퍼블릭 서브넷을 생성할 수 있음
- 인터넷 액세스가 없는 프라이빗 서브넷에 데이터베이스나 애플리케이션 서버 같은 백엔드 시스템을 배치하도록 지원
- 보안 그룹 및 네트워크 액세스 제어 목록을 포함한 다중 보안 계층을 사용하여 각 서브넷에서 Amazon Elastic Compute Cloud(Amazon EC2) 인스턴스에 대한 액세스를 제어하도록 지원
-->

- **Virtual Private Cloud(VPC)** : [VPC](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/configure-your-vpc.html)는 자체 데이터 센터에서 운영하는 기존 네트워크와 아주 유사한 가상 네트워크입니다. VPC를 생성한 후 서브넷을 추가할 수 있습니다.

- **서브넷** : [서브넷](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/configure-subnets.html)은 VPC의 IP 주소 범위입니다. 서브넷은 단일 가용 영역에 상주해야 합니다. 서브넷을 추가한 후에는 VPC에 AWS 리소스 배포할 수 있습니다.

- **IP 주소 지정** : VPC와 서브넷에 [IP 주소](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/vpc-ip-addressing.html)를 IPv4와 IPv6 모두 할당할 수 있습니다. 또한 퍼블릭 IPv4 및 IPv6 GUA 주소를 AWS로 가져오고 VPC의 리소스(예: EC2 인스턴스, NAT 게이트웨이, Network Load Balancer)에 할당할 수 있습니다.

- **라우팅** : [라우팅 테이블](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/VPC_Route_Tables.html)을 사용하여 서브넷 또는 게이트웨이의 네트워크 트래픽이 전달되는 위치를 결정합니다.

- **게이트웨이 및 엔드포인트** : [게이트웨이](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/extend-intro.html)는 VPC를 다른 네트워크에 연결합니다. 예를 들면, [인터넷 게이트웨이](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/VPC_Internet_Gateway.html)를 사용하여 VPC를 인터넷에 연결합니다. [VPC 엔드포인트](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html)를 사용하여 인터넷 게이트웨이 또는 NAT 장치를 사용하지 않고 AWS 서비스에 비공개로 연결합니다.

- **피어링 연결** : [VPC 피어링 연결](https://docs.aws.amazon.com/vpc/latest/peering/)을 사용하여 두 VPC의 리소스 간 트래픽을 라우팅합니다.

- **트래픽 미러링** : 네트워크 인터페이스에서 [네트워크 트래픽을 복사](https://docs.aws.amazon.com/vpc/latest/mirroring/)하고 심층 패킷 검사를 위해 보안 및 모니터링 어플라이언스로 전송합니다.

- **Transit Gateway** : 중앙 허브 역할을 하는 [전송 게이트웨이](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/extend-tgw.html)를 사용하여 VPC, VPN 연결 및 AWS Direct Connect 연결 간에 트래픽을 라우팅합니다.

- **VPC 흐름 로그** : [흐름 로그](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/flow-logs.html)는 VPC의 네트워크 인터페이스로 들어오고 나가는 IP 트래픽에 대한 정보를 캡처합니다.

- **VPN 연결** : [AWS Virtual Private Network(AWS VPN)](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/vpn-connections.html)을 사용하여 온프레미스 네트워크에 VPC를 연결합니다.









