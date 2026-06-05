const resultBox = document.getElementById("resultBox");
const resultType = document.getElementById("resultType");
const resultText = document.getElementById("resultText");

const diceBtn = document.querySelector(".dice");
const specialCardBtn = document.querySelector(".special-card");
const taskBtn = document.querySelector(".task");
const questionBtn = document.querySelector(".question");
const coupleTaskBtn = document.querySelector(".couple-task");
const coupleQuestionBtn = document.querySelector(".couple-question");

let decks = {};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function resetDeck(deckName, originalArray) {
  decks[deckName] = shuffleArray(originalArray);
}

function drawCard(deckName, originalArray) {
  if (!originalArray || originalArray.length === 0) {
    return "לא נמצאו קלפים בקטגוריה הזאת";
  }

  if (!decks[deckName] || decks[deckName].length === 0) {
    resetDeck(deckName, originalArray);
  }

  return decks[deckName].pop();
}

function drawPunishment(array) {
  if (!array || array.length === 0) {
    return "אין עונשים מוגדרים";
  }

  return array[Math.floor(Math.random() * array.length)];
}

function animateResult() {
  resultText.classList.remove("open-animation");
  void resultText.offsetWidth;
  resultText.classList.add("open-animation");
}

function showResult(type, html) {
  resultType.textContent = type;
  resultText.innerHTML = html;
  animateResult();
}

function isSpecialCard(cardText) {
  return cardText.trim() === "קלף מיוחד";
}

function showSpecialCard() {
  const specialCard = drawCard("special", special);

  showResult("✨ קלף מיוחד", `
    <div class="main-result">${specialCard}</div>
  `);
}

diceBtn.addEventListener("click", function () {
  const number = Math.floor(Math.random() * 6) + 1;
  const text = diceTexts[number] || "";

  showResult("🎲 קובייה", `
    <div class="dice-number">${number}</div>
    <div class="small-note">${text}</div>
  `);
});

specialCardBtn.addEventListener("click", function () {
  showSpecialCard();
});

questionBtn.addEventListener("click", function () {
  const question = drawCard("questions", questions);

  if (
    question.trim() === "קלף מיוחד🤩" ||
    question.trim() === "פתחו קלף שאלה זוגית!♥️" ||
    question.trim() === "פתחו קלף משימה זוגית!♥️"
  ) {
    showResult("❤️ שאלה", `
      <div class="main-result">${question}</div>
    `);
    return;
  }

  const punishment = drawPunishment(qp);

  showResult("❤️ שאלה", `
    <div class="main-result">${question}</div>
    <div class="small-note">לא ענית?</div>
    <div class="punishment-result">${punishment}</div>
  `);
});

coupleQuestionBtn.addEventListener("click", function () {
  const question = drawCard("cquestions", cquestions);

  if (
    question.trim() === "קלף מיוחד🤩"
  ) {
    showResult("💘 שאלה זוגית", `
      <div class="main-result">${question}</div>
    `);
    return;
  }

  const punishment = drawPunishment(qp);

  showResult("💘 שאלה זוגית", `
    <div class="main-result">${question}</div>
    <div class="small-note">לא עניתם?</div>
    <div class="punishment-result">${punishment}</div>
  `);
});

taskBtn.addEventListener("click", function () {
  const task = drawCard("tasks", tasks);

  if (
    task.trim() === "קלף מיוחד🤩" ||
    task.trim() === "פתחו קלף שאלה זוגית!♥️" ||
    task.trim() === "פתחו קלף משימה זוגית!♥️"
  ) {
    showResult("💌 משימה", `
      <div class="main-result">${task}</div>
    `);
    return;
  }

  const punishment = drawPunishment(tp);

  showResult("💌 משימה", `
    <div class="main-result">${task}</div>
    <div class="small-note">לא ביצעת?</div>
    <div class="punishment-result">${punishment}</div>
  `);
});

coupleTaskBtn.addEventListener("click", function () {
  const task = drawCard("ctasks", ctasks);

  if (
    task.trim() === "קלף מיוחד🤩"
  ) {
    showResult("💞 משימה זוגית", `
      <div class="main-result">${task}</div>
    `);
    return;
  }

  const punishment = drawPunishment(tp);

  showResult("💞 משימה זוגית", `
    <div class="main-result">${task}</div>
    <div class="small-note">לא עניתם?</div>
    <div class="punishment-result">${punishment}</div>
  `);
});