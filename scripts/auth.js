const correctHash = "ebba4656472f21ef2e19a0a5e84306137a9738a7cb7f23cc8f49f3b1014f5f4b"; // family1212

function checkPassword() {
  const input = document.getElementById("password").value.trim();

  // 디버깅용 로그
  console.log("입력된 비밀번호:", input);
  console.log("입력된 해시값:", sha256(input));
  console.log("정답 해시값:", correctHash);

  const hash = sha256(input);

  if (hash === correctHash) {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  } else {
    document.getElementById("errorMsg").textContent = "비밀번호가 틀렸습니다.";
  }
}

