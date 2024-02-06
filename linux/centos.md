# CentOS

redhat계열은 yum

## firewalld

7버전 부터 사용하는 방화벽

```bash
/etc/firewalld
```

## zone

```bash
/etc/firewalld/zones
```

**RPM** : Red Hat Package Manager, RPM Package Manager

```
설치 : rpm -ivh 패키지명
확인 : rpm -qa | grep 패키지명
제거 : rpm -ev 패키지명
업그레이드 : rpm -Uvh 패키지명
```

rpm -qa | grep java

yum remove java-1.8.0
