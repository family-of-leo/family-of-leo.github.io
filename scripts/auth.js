const correctHash = "2c3b70ef82f3f73dd1c67869e54fe604d63d994d57c93c2d1c6dc6f7c9ae582e";

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

