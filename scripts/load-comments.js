// scripts/load-comments.js

/**
 * JSONP 방식으로 Google Apps Script 웹앱에서 댓글 목록을 가져와서
 * 화면에 표시하는 기능을 수행합니다.
 *
 * 반드시 Web App URL을 본인의 것으로 바꿔주세요!
 */

// 1) JSONP 콜백 함수 정의
function loadCommentsJSONP(comments) {
  const container = document.getElementById("comments-container");
  container.innerHTML = "";

  if (!Array.isArray(comments) || comments.length === 0) {
    container.innerHTML = "<p>아직 댓글이 없습니다.</p>";
    return;
  }

  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <div class="comment-author">${c.name || "익명"}</div>
      <div class="comment-timestamp">${new Date(c.timestamp).toLocaleString()}</div>
      <div class="comment-text">${c.comment}</div>
    `;
    container.appendChild(div);
  });
}

// 2) DOMContentLoaded 이벤트에서 JSONP 스크립트 태그를 동적으로 생성
document.addEventListener("DOMContentLoaded", () => {
  // ▶▶ 반드시 이 URL을 본인의 실제 Web App URL로 교체하세요. ◀◀
  const GAS_URL = "https://script.google.com/macros/s/AKfycbz_H96DBhu8Kz8KER9kYznC90r3VC2GFilkfzz_ic-qTDPPnwTemLX18TGrCHtDXti5/exec";
  const jsonpSrc = GAS_URL + "?callback=loadCommentsJSONP";

  const script = document.createElement("script");
  script.src = jsonpSrc;
  document.body.appendChild(script);
});
