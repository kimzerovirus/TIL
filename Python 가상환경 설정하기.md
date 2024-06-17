# Python 가상환경 설정하기



## Pyenv

```sh
pyenv install --list # 설치 가능한 목록
```

```sh
pyenv install 3.12.3 # 해당 버전 설치
```

```sh
pyenv local 3.12.3 # 해당 디렉토리 파이썬 버전 설정
pyenv global 3.12.3 # 전역 파이썬 버전 설정
```



## Poetry


```sh
poetry env info
```

```sh
poetry env use /Users/kimzerovirus/.pyenv/versions/3.12.3/bin/python # pyenv 사용시 다음과 같은 경로이다.
```

```sh
poetry env list
```

```sh
poetry env remove [list에서 찾은 이름]
```

