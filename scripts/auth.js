const correctHash = "bcb072a82e2c420458dd48584a57f8cb7bbea821bfaed1c40aa802e542cd92b7";
const SESSION_KEY = "familyNewsAuthTime";
const SESSION_DURATION_MS = 10 * 60 * 1000; // 10분

function sha256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return crypto.subtle.digest("SHA-256", data).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  });
}

function setSession() {
  localStorage.setItem(SESSION_KEY, Date.now().toString());
}

function isSessionValid() {
  const storedTime = localStorage.getItem(SESSION_KEY);
  if (!storedTime) return false;

  const elapsed = Date.now() - parseInt(storedTime, 10);
  return elapsed < SESSION_DURATION_MS;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  location.reload(); // 페이지 새로고침
}

function checkPassword() {
  const input = document.getElementById("password").value.trim();

  sha256(input).then(hash => {

    if (hash === correctHash) {
      setSession();
      document.getElementById("login").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
    } else {
      document.getElementById("errorMsg").textContent = "비밀번호가 틀렸습니다.";
    }
  });
}

function checkSession() {
  if (isSessionValid()) {
    document.getElementById("login")?.remove();
    document.getElementById("content")?.classList.remove("hidden");
  }
}

// DOM이 준비되면 자동으로 세션 검사 실행
document.addEventListener("DOMContentLoaded", () => {
  checkSession();

  // 엔터키 입력 처리
  const pwInput = document.getElementById("password");
  if (pwInput) {
    pwInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        checkPassword();
      }
    });
  }

  // 로그아웃 버튼 처리
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
    });
  }
});

