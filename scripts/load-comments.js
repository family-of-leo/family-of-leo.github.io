document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("comments-container");

  fetch("https://script.google.com/macros/s/AKfycbyCRaXMmm-DN6_qF5jjCSHMcMv9OIK1lF5GFuLRPfg2f0AdZ1wAN1KJ11Wr6kng_K7l/exec")
    .then(response => {
      if (!response.ok) throw new Error("댓글 데이터를 가져오지 못했습니다.");
      return response.json();
    })
    .then(data => {
      container.innerHTML = "";
      if (data.length === 0) {
        container.innerHTML = "<p>아직 댓글이 없습니다.</p>";
        return;
      }

      data.forEach(comment => {
        const div = document.createElement("div");
        div.className = "comment-item";
        div.innerHTML = `
          <p><strong>${comment.name}</strong> <em style="color:#777">${comment.timestamp}</em></p>
          <p>${comment.comment}</p>
          <hr/>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = "<p style='color:red;'>댓글을 불러오는 중 오류가 발생했습니다.</p>";
    });
});
