```shell
grep -Hni "검색어" -A5 -B5 ./파일명
```
- H : 파일명 표시
- n : 줄 번호 표시
- i : 대소문자 구분x
- A,B : 검색어 앞뒤 몇 줄 가져올것인지

```shell
zcat ./file.2023-11-1[0-5].log.gz | grep -hni -A10 -B10 -Fe "[ERROR]"
```
zcat은 gz 압축된 파일을 읽을 수 있다. -Fe는 특수문자를 검색어로 사용할 수 있는 옵션
