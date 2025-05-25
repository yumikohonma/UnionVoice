const board = document.getElementById("board");
const logs = JSON.parse(localStorage.getItem("unionVoiceLogs") || "[]");

const getColor = cat => ({
  "人間関係": "#b3e5fc",
  "業務量／労働時間": "#c8e6c9",
  "評価制度": "#f8bbd0",
  "安全衛生": "#e1bee7",
  "ハラスメント": "#f5f5f5",
  "設備・IT": "#ffe0b2",
  "賃金・待遇": "#fff9c4",
  "その他": "#dcedc8"
}[cat] || "#eeeeee");

const getLikeKey = log => `like_${log.timestamp}`;
const getCountKey = log => `like_count_${log.timestamp}`;

logs.forEach(log => {
  const div = document.createElement("div");
  const left = Math.random() * (window.innerWidth - 250);
  const top = Math.random() * (window.innerHeight - 150);
  div.className = "node";
  div.style.left = `${left}px`;
  div.style.top = `${top}px`;
  div.style.backgroundColor = getColor(log.category);

  const likeKey = getLikeKey(log);
  const countKey = getCountKey(log);

  const liked = localStorage.getItem(likeKey) === "1";
  let likeCount = parseInt(localStorage.getItem(countKey) || "0");

  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = liked ? `いいね ${likeCount} 済` : `いいね ${likeCount}`;
  if (liked) button.disabled = true;

  button.addEventListener("click", () => {
    if (!liked) {
      likeCount++;
      localStorage.setItem(likeKey, "1");
      localStorage.setItem(countKey, likeCount);
      button.textContent = `いいね ${likeCount} 済`;
      button.disabled = true;
    }
  });

  div.innerHTML = `
    <strong>${log.category}</strong><br>
    ${log.issueSummary}<br>
    <small>${new Date(log.timestamp).toLocaleString()}</small><br>
  `;
  div.appendChild(button);
  board.appendChild(div);
});
