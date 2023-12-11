# AWS

## AWS 구성요소

- region
- AZ(Availability Zone)
- VPC(Virtual Private Cloud)

###  region
구성요소 중 가장 큰 단위이며, 논리적인 단계이다.

### AZ

실제 IDC 단위로써, aws 정책에 따라 하나의 region안에는 반드시 `2개 이상`의 AZ가 존재한다고 한다. 시스템을 구성할 single AZ로 할지 multi AZ로 구성할것인지는 사용자의 선택사항이다. *(multi AZ로 구성하여 data들을 이원화하여 안전하게 보관하거나, Elastic Load Balancer를 통해 각각의 AZ가 다른 일을 수행하게 할수도 있다.)*

### VPC

논리적으로 격리된 가상의 컴퓨터

[VPC 정리](https://github.com/kimzerovirus/TIL/blob/main/aws/vpc.md)

## AWS Web Service Architecture

![vpc](../_img/aws/web-service-architecture.png)

- **[Amazon Route 53](http://aws.amazon.com/route53/)를 사용하는 DNS 서비스** : 도메인 관리를 간소화하는 DNS 서비스를 제공합니다.
- **[Amazon CloudFront](http://aws.amazon.com/cloudfront/)를 사용한 엣지 캐싱** : 엣지는 대용량 콘텐츠를 캐싱하여 고객의 대기 시간을 줄입니다.
- **[AWS WAF](http://aws.amazon.com/waf/)를 사용한 Amazon CloudFront용 엣지 보안** : 고객 정의 규칙을 통해 크로스 사이트 스크립팅(XSS) 및 SQL 삽입을 비롯한 악성 트래픽을 필터링합니다.
- **[Elastic Load Balancing](http://aws.amazon.com/elasticloadbalancing/)(ELB)을 사용한 로드 밸런싱** : 서비스의 중복성과 분리를 위해 여러 가용 영역 및 [AWS Auto Scaling](http://aws.amazon.com/autoscaling/) 그룹에 로드를 분산할 수 있습니다.
- **[AWS Shield](http://aws.amazon.com/shield/)를 사용한 DDoS 방어** : 가장 일반적인 네트워크 및 전송 계층 DDoS 공격으로부터 자동으로 인프라를 보호합니다.
- **보안 그룹이 포함된 방화벽** : 보안을 인스턴스로 이동하여 웹 및 애플리케이션 서버 모두에 상태 유지 호스트 수준 방화벽을 제공합니다.
- **[Amazon ElastiCache](http://aws.amazon.com/elasticache/)를 사용한 캐싱** : Redis 또는 Memcached와 함께 캐싱 서비스를 제공하여 앱과 데이터베이스에서 로드를 제거하고 빈번한 요청의 대기 시간을 줄입니다.
- **[Amazon Relational Database Service](http://aws.amazon.com/rds/)(Amazon RDS)를 사용한 관리형 데이터베이스** : 6개 DB 엔진 중에서 사용하여 고가용성 다중 AZ 데이터베이스 아키텍처를 생성합니다.
- **[Amazon Simple Storage Service(Amazon S3)](http://aws.amazon.com/s3/)를 통한 정적 스토리지 및 백업** : 이미지, 비디오와 같은 정적 자산 및 백업을 위한 간단한 HTTP 기반 객체 스토리지를 구현합니다.