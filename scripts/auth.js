const correctHash = "ebba4656472f21ef2e19a0a5e84306137a9738a7cb7f23cc8f49f3b1014f5f4b";


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

