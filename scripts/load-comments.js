document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.getElementById("comments-container");

  fetch("https://script.google.com/macros/s/AKfycbyCRaXMmm-DN6_qF5jjCSHMcMv9OIK1lF5GFuLRPfg2f0AdZ1wAN1KJ11Wr6kng_K7l/exec")
    .then(response => response.json())
    .then(comments => {
      if (comments.length === 0) {
        commentsContainer.innerHTML = "<p>아직 댓글이 없습니다.</p>";
        return;
      }

      comments.forEach(comment => {
        const div = document.createElement("div");
        div.className = "comment";

        div.innerHTML = `
          <p><strong>${comment.name}</strong> (${comment.timestamp})</p>
          <p>${comment.comment}</p>
          <hr />
        `;

        commentsContainer.appendChild(div);
      });
    })
    .catch(error => {
      commentsContainer.innerHTML = "<p>댓글을 불러오는 중 오류가 발생했습니다.</p>";
      console.error("댓글 불러오기 실패:", error);
    });
});
