const correctHash = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f";


async function checkPassword() {
  const input = document.getElementById("password").value;
  const hash = await sha256(input);

  if (hash === correctHash) {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  } else {
    document.getElementById("errorMsg").innerText = "비밀번호가 틀렸습니다.";
  }
}

// SHA-256 함수
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

