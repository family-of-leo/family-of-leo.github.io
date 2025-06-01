const correctHash = "bcb072a82e2c420458dd48584a57f8cb7bbea821bfaed1c40aa802e542cd92b7";
const EXPIRATION_MINUTES = 10;

function sha256(str) {
  // 브라우저가 SubtleCrypto API를 지원할 경우 SHA-256 해시 계산
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return crypto.subtle.digest("SHA-256", data).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  });
}

function checkPassword() {
  const input = document.getElementById("password").value.trim();
  sha256(input).then(hash => {
    console.log("입력된 해시값:", hash);
    if (hash === correctHash) {
      // 인증 저장 + 시간 기록
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authTime", Date.now().toString());

      showContent();
    } else {
      document.getElementById("errorMsg").textContent = "비밀번호가 틀렸습니다.";
    }
  });
}

function showContent() {
  document.getElementById("login").style.display = "none";
  document.getElementById("content").classList.remove("hidden");
}

function hideContent() {
  document.getElementById("login").style.display = "block";
  document.getElementById("content").classList.add("hidden");
}

function logout() {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("authTime");
  hideContent();
}

function checkSession() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const authTime = parseInt(localStorage.getItem("authTime"), 10);

  const now = Date.now();
  const elapsedMinutes = (now - authTime) / 1000 / 60;

  if (isAuthenticated === "true" && !isNaN(authTime) && elapsedMinutes < EXPIRATION_MINUTES) {
    showContent();
  } else {
    logout(); // 자동 로그아웃 처리
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkSession();

