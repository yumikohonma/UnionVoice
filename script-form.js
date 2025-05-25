const questions = [
  "ありたい職場の姿について教えてください。",
  "今年度、あなたが期待していたことと実際に起きていることの違いを教えてください。",
  "その違いがなぜ起きているのか、あなたの考えを教えてください。",
  "その違いや背景をふまえて、改善に必要だと思う取り組みや工夫を教えてください。",
  "それが改善されたら、どんな良い変化があると思いますか？",
  "【重要！】これまでの設問を通して感じた『あなたが本当に伝えたい“職場の問題”』を、具体的に書いてください。"
];

let currentStep = 0;
let answers = [];

document.addEventListener("DOMContentLoaded", () => {
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const nextBtn = document.getElementById("next");
  const categoryBox = document.getElementById("category-box");
  const categorySelect = document.getElementById("category");

  function updateQuestion() {
    question.textContent = questions[currentStep];
  }

  updateQuestion();

  nextBtn.addEventListener("click", () => {
    const input = answer.value.trim();
    if (!input) return alert("入力してください");
    answers.push(input);
    answer.value = "";
    currentStep++;

    if (currentStep === 5) categoryBox.style.display = "block";

    if (currentStep === 6) {
      const logData = JSON.parse(localStorage.getItem("unionVoiceLogs") || "[]");
      logData.push({
        issueSummary: answers[5],
        category: categorySelect.value || "未分類",
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("unionVoiceLogs", JSON.stringify(logData));
      alert("ログが保存されました！");
      window.location.href = "log.html";
      return;
    }

    updateQuestion();
  });
});
