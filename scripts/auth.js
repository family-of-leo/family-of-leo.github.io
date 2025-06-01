const correctHash = "bcb072a82e2c420458dd48584a57f8cb7bbea821bfaed1c40aa802e542cd92b7";


function checkPassword() {
  const input = document.getElementById("password").value.trim();

  const hash = sha256(input);

  if (hash === correctHash) {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  } else {
    document.getElementById("errorMsg").textContent = "비밀번호가 틀렸습니다.";
  }
}

