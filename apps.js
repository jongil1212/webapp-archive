// 이 파일에서 웹앱 목록만 수정하면 됩니다.
// url: 실제 웹앱 접속 주소
// editUrl: 해당 웹앱의 코드 수정 또는 관리용 주소
//         Apps Script로 만든 웹앱이라면 연결된 Google Sheet 주소나 Apps Script 편집기 주소를 넣으면 됩니다.

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
    url: "https://example.com/counseling",
    editUrl: "https://docs.google.com/spreadsheets/d/여기에_상담기록_시트_ID/edit"
  },
  {
    title: "과학 서논술형 채점",
    description: "중3 과학 - 복사평형 서논술형 자동 채점 웹앱입니다.",
    category: "수업용",
    status: "베타",
    url: "https://example.com/science-grading",
    editUrl: "https://docs.google.com/spreadsheets/d/여기에_과학채점_시트_ID/edit"
  },
  {
    title: "수학 형성평가 채점 도우미",
    description: "점수와 윤리수 서논술형 형성평가 피드백 도우미 웹앱입니다.",
    category: "수업용",
    status: "베타",
    url: "https://example.com/math-formative-check",
    editUrl: "https://docs.google.com/spreadsheets/d/여기에_수학채점_시트_ID/edit"
  },
  {
    title: "인수분해 연습 게임",
    description: "인수분해를 연습할 수 있는 게임 웹앱입니다.",
    category: "수업용",
    status: "운영중",
    url: "https://example.com/factorization-game",
    editUrl: "https://docs.google.com/spreadsheets/d/여기에_인수분해게임_시트_ID/edit"
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

// 이 아카이브 사이트의 apps.js 파일을 수정하는 GitHub 주소입니다.
function getArchiveCodeEditUrl() {
  const { user, repo } = getRepositoryInfo();

  if (!user || !repo) {
    return "https://github.com/";
  }

  return `https://github.com/${user}/${repo}/edit/main/${adminConfig.editFilePath}`;
}

function updateAdminLinks() {
  const currentUrl = window.location.href;
  const archiveEditUrl = getArchiveCodeEditUrl();

  currentSiteLink.href = currentUrl;
  currentSiteLink.textContent = currentUrl;

  codeEditLink.href = archiveEditUrl;
  codeEditLink.textContent = archiveEditUrl;
}

function getAppEditUrl(app) {
  return app.editUrl || getArchiveCodeEditUrl();
}

function renderAdminCardLinks(app) {
  if (!isAdminMode) {
    return "";
  }

  const appEditUrl = getAppEditUrl(app);

  return `
    <div class="admin-card-area">
      <p class="admin-card-title">관리자 확인용</p>
      <a class="mini-link" href="${app.url}" target="_blank" rel="noopener noreferrer">사이트 URL 확인</a>
      <a class="mini-link" href="${appEditUrl}" target="_blank" rel="noopener noreferrer">코드 수정 URL 열기</a>
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
