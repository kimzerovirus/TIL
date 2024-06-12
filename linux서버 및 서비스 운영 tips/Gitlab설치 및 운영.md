# Gitlab

## Gitlab Install

package 다운로드

https://packages.gitlab.com/gitlab/gitlab-ce

인텔 계열은 x86_64 이며, centos는 rpm 우분투 계열은 deb 파일을 다운로드 하면 된다.

centos7 이면 el7을 받으면 되는건가???

https://twoseed.atlassian.net/wiki/spaces/OPS/pages/482377733/GitLab+GitLab

### Gitlab dependencies

깃랩 설치를 위해서는 아래의 디펜던시를 먼저 설치 해야 한다.

```sh
sudo yum install -y curl policycoreutils openssh-server openssh-clients
sudo systemctl enable sshd
sudo systemctl start sshd
sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
sudo firewall-cmd --permanent --add-service=http
sudo systemctl reload firewalld
```



## Gitlab Install

```sh
# Debian/Ubuntu
dpkg -i gitlab-ce-<version>.deb

# CentOS/RHEL
rpm -Uvh gitlab-ce-<version>.rpm
```


설치가 완료되면 /etc/gitlab 폴더로 이동하여 gitlab.rb 파일 수정

```shell
cd /etc/gitlab 
vi gitlab.rb 

# 접속 URL 설정 
external_url 'http://192.168.1.123:9090' 

# 저장 디렉토리 변경 
git_data_dirs({  "default" => { "path" => "/home/gitlab_user" } })
```


**config 설정**<br/>

```sh
gitlab-ctl reconfigure
```

**gitlab 재기동**<br/>

```sh
gitlab-ctl restart
```



## Gitlab 버전업

깃랩은 버전업을 깃랩에서 요구하는 버전 포인트마다 순차적으로 업그레이드 해야 한다.<br/>

*아래 링크에서 버전업 해야할 path 제공*

https://docs.gitlab.com/ee/update/index.html#upgrade-paths

*특정 버전으로 버전업하는 방법*

https://docs.gitlab.com/ee/update/package/#upgrade-to-a-specific-version-using-the-official-repositories

**작업 전 데이터 백업**

```sh
gitlab-backup create
```

기본적으로 `/var/opt/gitlab/backups` 에 저장하게 되어있다.

```sh
vi /etc/gitlab/gitlab.rb

# 이 부분에서 경로 수정
gitlab_rails['backup_path'] = '/var/opt/gitlab/backups'
```

패키지로 업그레이드하면 설치와 동일하다.

**update**<br/>

```sh
# Debian/Ubuntu
dpkg -i gitlab-ce-<version>.deb

# CentOS/RHEL
rpm -Uvh gitlab-ce-<version>.rpm
```

**config 설정**<br/>

```sh
gitlab-ctl reconfigure
```

**gitlab 재기동**<br/>

```sh
gitlab-ctl restart
```

**현재 설치 버전 확인**<br/>

```sh
rpm -qa | grep <package_name>
```



## Gitlab 복구

**프로세스 중지**<br/>

데이터베이스에 연결된 프로세스를 중지한다. 나머지 GitLab은 실행 상태로 둔다.

```shell
sudo gitlab-ctl stop puma
sudo gitlab-ctl stop sidekiq
# Verify
sudo gitlab-ctl status
```

**복원 실행**<br/>

그런 다음 복원하려는 백업의 타임스탬프를 지정하여 백업을 복원한다.

```shell
sudo gitlab-backup restore BACKUP=11493107454_2024_06_10_16.10.6-ce
```



## Gitlab Log

**gitlab 웹 로그 확인 **

```bash
tail -f /var/log/gitlab/gitlab-rails/production.log
```

**gitlab 서비스 로그 확인 **

```sh
gitlab-ctl tail [service 명]
gitlab-ctl tail postgresql
gitlab-ctl tail ngix
```

gitlab 서버에서 남기는 각종 로그를 확인 할 수 있다. (서비스명은 `gitlab-ctl status` 로 확인되는 서비스명)



## Gitlab 삭제하기

```sh
sudo gitlab-ctl uninstall
sudo gitlab-ctl cleanse
gitlab-ctl remove-accounts

# Debian/Ubuntu
dpkg -P gitlab-ce || yum -y remove gitlab-ce

# CentOS/RHEL
rpm -e gitlab-ce
```

**데이터 삭제**

```sh
/opt/gitlab
/var/opt/gitlab
/etc/gitlab
/var/log/gitlab
/etc/yum.repos.d/gitlab # 관련파일 전부 삭제
```



## Trouble Shooting

### 버전 업 실패 후 Gitlab 기동x, 이전 버전으로 복구x 해결 방법

깃랩 버전 업그레이드 작업 중 모종의 이슈로 실패하게 되었는데 하필이면 postgres13 -> 14로 db가 변경되다가 실패되어 데이터가 전부 꼬여 버린 상황이 발생하였다. 백업을 미리 해두었으므로 복구 명령어를 날렸으나 복구가 되지 않았고 여러 차례 삽질을 하다가 데이터를 전부 복제해두고 깃랩 삭제 및  `opt/gitlab` 데이터(etc데이터는 삭제x) 삭제 후 업그레이드 시도 전 버전으로 재설치한 후 복구 명령어를 날려 작업 이전 상태로 되돌릴 수 있었다.