# Git 리포지토리 이관

> 사내 VM서버에 자체 구축한 깃랩의 리포지토리들을 클라우드팀의 깃랩으로 이관하며, 기록한 내용

## Git mirroring

```sh
# 원본 저장소 로컬에 clone
git clone --mirror [원본 저장소 주소]
git clone --bare [원본 저장소 주소]

# clone을 하면 원본저장소.git 폴더가 생성된다. 해당 폴더로 이동
cd ~.git

# 이관할 원격 저장소로 push
git remote set-url --push origin [이관할 원격 저장소 주소]
git push --mirror
```

git clone --mirror는 git remote origin은 복제한 원본의 정보를 가지고 있지만 bare는 독립적인 상태로 복제하여 원본과의 관계가 끊어지는듯? 따라서 bare 옵션으로 클론하면 더이상 원본 저장소의 tracking이 불가능하다. (bare옵션으로 내려받고 mirror 옵션으로 push 하면 될듯)

## Gitlab mirroring

깃랩 프로젝트 > 리포지토리 > settings > mirroring 기능을 이용해서 이관할 수 있다.