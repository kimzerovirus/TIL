## 리눅스 명령어

## Tips

```bash
$> 찾고자하는 파일 대충 입력하고 tab 누르면 자동완성해줌
$> Arrow Up & Down
$> ! ${찾고자하는 이전 사용 명령어의 시작 알파벳}
$> !! # 바로 이전 사용한 명령어
$> Ctrl + A, Ctrl + E
$> history
$> man ${명령} # 메뉴얼
$> vmstat # 서버 상태 보여줌
```

폴더 생성

```bash
mkdir [foldername]
```

파일 생성

```bash
vi [filename]
```

파일, 폴더 복사

```bash
cp [original file] [destination]
cp -r [original folder] [destination]
```

파일, 폴더 이동

```bash
mv [original file, folder] [destination]
```

바로가기 링크

```bash
ln [original file] [destination & new filename]
ln -s [original folder] [destination & new foldername]
```

삭제

```bash
rm [file]
rm -r [folder]
```

vi

```bash
i insert mode
ESC insert mode에서 나오기
:q 닫기
:wq 수정한 내용 저장하고 닫기
:q! 수정 내용 저장하지 않고 닫기
```

lsof (list open files)

```bash
lsof -i :[port]
kill -9 [pid]
```

