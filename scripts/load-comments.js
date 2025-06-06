document.addEventListener("DOMContentLoaded", () => {
  const commentsList = document.getElementById("commentsList");

  fetch("https://script.google.com/macros/s/AKfycby4GGQl8bIQl8lOPumbQl2DbNsJJ7Rw6BaQjq0cLzXle-8WNZ4NFCRyMu8ehIRb5_YS/exec")
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
