// 이 파일에서 웹앱 목록만 수정하면 됩니다.
// url 부분에 실제 웹앱 주소를 넣으세요.

// 관리자 모드 설정입니다.
// 중요: 이 비밀번호는 '진짜 보안 로그인'이 아니라 화면 숨김용입니다.
// GitHub Pages는 정적 사이트라서 이 값이 코드에 보일 수 있습니다.
const adminConfig = {
  password: "1234", // 원하는 비밀번호로 바꾸세요.
  githubUser: "", // 비워두면 github.io 주소에서 자동 추정합니다.
  repositoryName: "webapp-archive", // 저장소 이름이 다르면 바꾸세요.
  editFilePath: "apps.js"
};

const apps = [
  {
    title: "상담기록 웹앱",
    description: "학생 상담 내용을 입력하고 조회하는 개인 업무용 웹앱입니다.",
    category: "교사업무용",
    status: "베타",
    url: "https://example.com/counseling"
  },
  {
    title: "만족도조사 분석기",
    description: "구글폼 만족도 조사 결과를 붙여넣고 AI로 요약하는 웹앱입니다.",
    category: "연수용",
    status: "운영중",
    url: "https://example.com/survey-analysis"
  },
  {
    title: "발표 순서 뽑기",
    description: "수업 중 발표 순서를 무작위로 정하는 간단한 수업 도우미입니다.",
    category: "수업용",
    status: "운영중",
    url: "https://example.com/random-presenter"
  },
  {
    title: "형성평가 채점 도우미",
    description: "학생 응답을 확인하고 피드백을 정리하는 수업 지원 웹앱입니다.",
    category: "수업용",
    status: "베타",
    url: "https://example.com/formative-check"
  },
  {
    title: "기안문 초안 도우미",
    description: "학교 업무용 기안문 초안을 빠르게 정리하는 교사업무 보조 웹앱입니다.",
    category: "교사업무용",
    status: "베타",
    url: "https://example.com/document-draft"
  },
  {
    title: "테스트용 새 웹앱",
    description: "아직 기능을 점검하고 있는 테스트 단계의 웹앱입니다.",
    category: "테스트중",
    status: "중단",
    url: "https://example.com/test-app"
  }
];

const appGrid = document.querySelector("#appGrid");
const appCount = document.querySelector("#appCount");
const filterButtons = document.querySelectorAll(".filter-button");
const adminButton = document.querySelector("#adminButton");
const adminPanel = document.querySelector("#adminPanel");
const currentSiteLink = document.querySelector("#currentSiteLink");
const codeEditLink = document.querySelector("#codeEditLink");

let currentCategory = "전체";
let isAdminMode = false;

function getFilteredApps(category) {
  if (category === "전체") {
    return apps;
  }

  if (category === "테스트중") {
    return apps.filter((app) => app.category === "테스트중" || app.status === "베타");
  }

  return apps.filter((app) => app.category === category);
}

function getRepositoryInfo() {
  const hostname = window.location.hostname;
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  const inferredUser = hostname.endsWith("github.io")
    ? hostname.replace(".github.io", "")
    : "";

  const inferredRepo = pathParts[0] || `${inferredUser}.github.io`;

  return {
    user: adminConfig.githubUser || inferredUser,
    repo: adminConfig.repositoryName || inferredRepo
  };
}

function getCodeEditUrl() {
  const { user, repo } = getRepositoryInfo();

  if (!user || !repo) {
    return "https://github.com/";
  }

  return `https://github.com/${user}/${repo}/edit/main/${adminConfig.editFilePath}`;
}

function updateAdminLinks() {
  const currentUrl = window.location.href;
  const editUrl = getCodeEditUrl();

  currentSiteLink.href = currentUrl;
  currentSiteLink.textContent = currentUrl;

  codeEditLink.href = editUrl;
  codeEditLink.textContent = editUrl;
}

function renderAdminCardLinks(app) {
  if (!isAdminMode) {
    return "";
  }

  return `
    <div class="admin-card-area">
      <p class="admin-card-title">관리자 확인용</p>
      <a class="mini-link" href="${app.url}" target="_blank" rel="noopener noreferrer">사이트 URL 확인</a>
      <a class="mini-link" href="${getCodeEditUrl()}" target="_blank" rel="noopener noreferrer">코드 수정 URL 열기</a>
    </div>
  `;
}

function renderApps(category = "전체") {
  const filteredApps = getFilteredApps(category);

  appCount.textContent = `${category} 앱 ${filteredApps.length}개`;

  if (filteredApps.length === 0) {
    appGrid.innerHTML = `<div class="empty-message">해당 분류의 웹앱이 아직 없습니다.</div>`;
    return;
  }

  appGrid.innerHTML = filteredApps
    .map(
      (app) => `
        <article class="app-card ${isAdminMode ? "admin-active-card" : ""}">
          <h2 class="app-title">${app.title}</h2>
          <p class="app-description">${app.description}</p>
          <ul class="meta-list">
            <li class="meta-item">
              분류
              <span class="badge badge-category">${app.category}</span>
            </li>
            <li class="meta-item">
              상태
              <span class="badge badge-status-${app.status}">${app.status}</span>
            </li>
          </ul>
          ${renderAdminCardLinks(app)}
          <a class="open-button" href="${app.url}" target="_blank" rel="noopener noreferrer">
            열기
          </a>
        </article>
      `
    )
    .join("");
}

function enterAdminMode() {
  const password = window.prompt("관리자 비밀번호를 입력하세요.");

  if (password === adminConfig.password) {
    isAdminMode = true;
    adminButton.textContent = "관리자 모드 종료";
    adminButton.classList.add("active");
    adminPanel.classList.remove("hidden");
    updateAdminLinks();
    renderApps(currentCategory);
    return;
  }

  if (password !== null) {
    alert("비밀번호가 맞지 않습니다.");
  }
}

function exitAdminMode() {
  isAdminMode = false;
  adminButton.textContent = "관리자 모드";
  adminButton.classList.remove("active");
  adminPanel.classList.add("hidden");
  renderApps(currentCategory);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderApps(currentCategory);
  });
});

adminButton.addEventListener("click", () => {
  if (isAdminMode) {
    exitAdminMode();
  } else {
    enterAdminMode();
  }
});

updateAdminLinks();
renderApps();
