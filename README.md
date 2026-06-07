# 김종일 교사 웹앱 아카이브

수업용, 교사업무용, 연수용 웹앱 링크를 한곳에 모아 관리하는 개인 포털 사이트입니다.

## 파일 구성

```text
webapp-archive/
├─ index.html   # 사이트 기본 구조
├─ style.css    # 디자인 파일
├─ apps.js      # 웹앱 목록 데이터와 필터 기능
└─ README.md    # 사용 설명
```

## 앱 목록 수정 방법

`apps.js` 파일의 `apps` 배열만 수정하면 됩니다.

예시:

```js
{
  title: "상담기록 웹앱",
  description: "학생 상담 내용을 입력하고 조회하는 개인 업무용 웹앱입니다.",
  category: "교사업무용",
  status: "베타",
  url: "https://실제주소.com"
}
```

사용 가능한 분류 예시:

- 수업용
- 교사업무용
- 연수용
- 테스트중

사용 가능한 상태 예시:

- 운영중
- 베타
- 중단

## GitHub Pages 배포 방법

1. GitHub에서 새 저장소를 만듭니다. 예: `webapp-archive`
2. 이 폴더 안의 파일 4개를 저장소에 업로드합니다.
3. 저장소의 `Settings`로 들어갑니다.
4. 왼쪽 메뉴에서 `Pages`를 선택합니다.
5. `Build and deployment`에서 다음처럼 설정합니다.
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. 저장하면 잠시 후 사이트 주소가 생성됩니다.

주소 예시:

```text
https://GitHub아이디.github.io/webapp-archive/
```

## 주의할 점

- 학생용으로 배포할 경우 학교 MDM에서 `github.io` 접속이 가능한지 먼저 확인하세요.
- 링크를 클릭하면 새 탭에서 열립니다.
- 실제 웹앱 주소를 넣기 전까지는 `example.com`으로 연결됩니다.
