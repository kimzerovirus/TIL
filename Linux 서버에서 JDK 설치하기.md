openjdk <- openjdk release는 소스 파일만 있음 바이너리로 받아야함

`~ .bashrc` `/etc/profile` 

`usr/lib` 위치에 넣어두기



1. jdk 다운로드
```
yum or wget https://github.com/AdoptOpenJDK/openjdk8-upstream-binaries/releases/download/jdk8u292-b10/OpenJDK8U-jdk_x64_linux_8u292b10.tar.gz
```

2. 압출풀기

설치 경로는 `/usr/lib/java` 와 같은 곳에 넣어준다.

```
cd /usr/lib
mkdir java
cd java

tar -zxvf [다운로드받은경로]/OpenJDK8U-jdk_x64_linux_8u292b10.tar.gz

# 디렉토리 복사하여 옮기기
cp -R 디렉토리 /usr/lib
```

3. 환경변수 잡아주기

마지막으로 `/etc/profile` 파일을 수정해서 환경변수를 잡아줘야 한다. 파일의 맨 마지막에 아래 내용을 추가한다.

```
vim /etc/profile

# 파일 맨 아래에 아래 내용 추가
export JAVA_HOME=/usr/lib/java/openjdk-8u292-b10
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=$CLASSPATH:$JAVA_HOME/jre/lib/ext:$JAVA_HOME/lib/tools.jar

# 적용
source /etc/profile
```

4. 설치 확인

```
java -version
```



source 적용 이후 java -version 을 호출했는데 변경이 안된다면 세션 종료하고 다시 켜보거나 sudo로 권한을 얻어와서 적용한다.