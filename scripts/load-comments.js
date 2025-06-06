document.addEventListener("DOMContentLoaded", () => {
  const commentsList = document.getElementById("commentsList");

  fetch("https://script.google.com/macros/s/AKfycbwe2pcsluAY2U_-1GPv_JhJg9ekF-uholO7PZm0HXTCvGIImpz36caTZHcgNMdzIdSY/exec")
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error("응답 데이터가 배열이 아닙니다.");
      }

      commentsList.innerHTML = "";
      data.forEach(comment => {
        const el = document.createElement("div");
        el.className = "comment";
        el.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.comment}</p><p class="timestamp">${comment.timestamp}</p>`;
        commentsList.appendChild(el);
      });
    })
    .catch(err => {
      console.error("댓글 불러오기 실패:", err);
      commentsList.innerHTML = "<p>댓글을 불러오는 데 실패했습니다.</p>";
    });
});
