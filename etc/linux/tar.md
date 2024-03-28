# Tar 압축

## tar

### .tar 아카이브 파일 생성

```
tar cvf [압축될 파일 이름] [압축할 대상]
tar cvf archieve.tar /var/log/*
```

### .tar 아카이브 파일 해제

```
tar xvf [tar 파일]
tar xvf archieve.tar
```

## gzip

### .gzip 으로 압축하기

```
gzip [압축할 대상]
gzip archieve.tar
```

### .gzip 압축 풀기

```
gzip [압축된 gz]
gzip -d archieve.tar.gz

gunzip [압축된 gz]
gunzip archieve.tar.gz
```

## xz

### .xz 압축하기

```
xz [압축할 파일]
xz archieve.tar
```

### .xz 압축 풀기

```
xz -d [xz로 압축된 파일]
xz -d archieve.tar.xz

unxz [xz로 압축된 파일]
unxz archieve.tar.xz
```

## tar.*

### .tar.gz 혹은 .tgz 파일로 압축하기

```
tar zcvf [압축할 파일 이름] [대상]
tar zcvf var_log.tar.gz /var/log/*
tar zcvf var_log.tgz /var/log/*
```

.tar.gz 혹은 .tgz 로 확장자를 한번에 주고 뺄 수 있다.

### .tar.gz 압축 풀기

```
tar zxvf [압축된 tar.gz 혹은 tgz 파일]
tar zxvf var_log.tar.gz
```

### .tar.xz 혹은 .txz 로 압축하기

```
tar Jcvf [압축할 파일 이름] [대상]
tar Jcvf var_log.tar.xz /var/log/*
tar Jcvf var_log.txz /var/log/*
```

### .tar.xz 혹은 .txz 압축 풀기

```
tar Jxvf [압축된 tar.xz 혹은 txz 파일]
tar Jxvf var_log.tar.xz
tar Jxvf var_log.txz
```

## 분할

### 분할 압축

```
tar -cvf - 압축할디렉토리 | split -b 1024m - 압축파일.tar
tar cvzf - 압축할디렉토리 | split -b 1024m - 압축파일.tar.gz # gz 분할 압축시
```

### 분할 압축 해제
```
cat 압축파일.tar* | tar xvf -
cat 압축파일.tar.gz* | tar xvzf -
```

## tar 주요 옵션 정리

- z or J : z는 gzip 사용, J는 xz 사용

- c or x : 압축(c) 또는 해제(x). 둘 중 하나만 사용할 수 있다.

- v : verbose, 화면에 과정을 출력

- f : 이름 지정 옵션, 대부분의 경우에 그냥 사용

- p : 권한을 지정해서 아카이브한다. 권한 지정하지 않을 시 실행자의 소유권으로 생성
