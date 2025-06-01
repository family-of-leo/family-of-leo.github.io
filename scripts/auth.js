const correctHash = "bcb072a82e2c420458dd48584a57f8cb7bbea821bfaed1c40aa802e542cd92b7";


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

