# 김종일 교사 웹앱 아카이브

수업용, 교사업무용, 연수용 웹앱을 한곳에 모아 관리하는 개인 포털 사이트입니다.
GitHub Pages에 올려서 무료로 사용할 수 있습니다.

## 파일 구성

```text
index.html   # 화면 구조
style.css    # 디자인
apps.js      # 웹앱 목록과 관리자 모드 설정
README.md    # 설명 파일
```

## 웹앱 목록 수정 방법

대부분의 수정은 `apps.js` 파일에서 합니다.

```js
{
  title: "상담기록 웹앱",
  description: "학생 상담 내용을 입력하고 조회하는 개인 업무용 웹앱입니다.",
  category: "교사업무용",
  status: "베타",
  url: "https://example.com/counseling"
}
```

수정할 값은 다음과 같습니다.

- `title`: 앱 이름
- `description`: 간단 설명
- `category`: `수업용`, `교사업무용`, `연수용`, `테스트중` 중 하나 권장
- `status`: `운영중`, `베타`, `중단` 중 하나 권장
- `url`: 실제 웹앱 주소

## 관리자 모드

상단의 `관리자 모드` 버튼을 누른 뒤 비밀번호를 입력하면 관리자 확인용 영역이 표시됩니다.
관리자 모드에서는 다음을 확인할 수 있습니다.

- 현재 사이트 URL
- `apps.js` 코드 수정 URL
- 각 카드별 사이트 URL 확인 버튼
- 각 카드별 코드 수정 URL 버튼

기본 비밀번호는 `apps.js` 파일 상단에서 바꿀 수 있습니다.

```js
const adminConfig = {
  password: "1234",
  githubUser: "",
  repositoryName: "webapp-archive",
  editFilePath: "apps.js"
};
```

## 중요한 보안 안내

이 관리자 모드는 진짜 보안 로그인 기능이 아닙니다.
GitHub Pages는 정적 사이트이므로 비밀번호가 코드 안에 들어가고, 아는 사람은 코드를 볼 수 있습니다.
따라서 다음 정보는 절대 넣지 마세요.

- 학생 개인정보
- 상담 내용
- 비밀번호
- API 키
- 수정 권한이 있는 비공개 문서 링크
- 외부에 공개되면 안 되는 학교 업무 자료

이 기능은 어디까지나 선생님이 혼자 관리할 때 편하게 보기 위한 간단한 화면 숨김 기능입니다.


## 웹앱별 코드 수정 URL 설정

관리자 모드에서 각 카드의 `코드 수정 URL 열기` 버튼은 `apps.js`의 `editUrl` 값을 사용합니다.

Apps Script로 만든 웹앱이라면 `editUrl`에 연결된 Google Sheet 주소 또는 Apps Script 편집기 주소를 넣으세요.

```js
{
  title: "상담기록 웹앱",
  description: "학생 상담 내용을 입력하고 조회하는 개인 업무용 웹앱입니다.",
  category: "교사업무용",
  status: "베타",
  url: "https://script.google.com/macros/s/웹앱주소/exec",
  editUrl: "https://docs.google.com/spreadsheets/d/구글시트ID/edit"
}
```

상단 관리자 패널의 `아카이브 목록 수정`은 이 GitHub Pages 사이트의 `apps.js`를 수정하는 주소입니다.
각 웹앱 카드 안의 `코드 수정 URL 열기`는 해당 웹앱마다 직접 설정한 `editUrl`로 이동합니다.
