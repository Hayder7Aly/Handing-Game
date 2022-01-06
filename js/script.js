const scores = document.getElementById("scores");
const hiScore = document.getElementById("hiScores");
const boxes = document.querySelectorAll(".box");
const gamePlayer = document.getElementById("gamePlayer");
const seconds = document.querySelector(".seconds");
const popUp = document.querySelector(".popUp");
const reply = document.querySelector(".reply");
const point = document.querySelector(".myscore");
const scorer = document.querySelector(".scorer");

let score, time, interval;

let HiScoreValue = localStorage.getItem("HiScore");

hiScore.innerHTML = HiScoreValue ? HiScoreValue : "00";

reply.addEventListener("click", (e) => {
  popUp.classList.remove("animated");
  popUp.classList.add("startGame");
  time = 2;
  score = 0;
  scores.innerHTML = score <= 9 ? "0" + score : score;
  hiScore.innerHTML = localStorage.getItem("HiScore")
    ? localStorage.getItem("HiScore")
    : "00";
  seconds.innerHTML = time <= 9 ? "0" + time : time;

  interval = setInterval(() => {
    if (time === 0) {
      gameOver();
    }
    seconds.innerHTML = time <= 9 ? "0" + time : time;
    time--;
  }, 1000);
});

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (box.classList.contains("activator")) {
      time = 2;
      getRandomPlace();
      score++;
      showScore();
    }
  });
});

function showScore() {
  scores.textContent = score <= 9 ? "0" + score : score;
}

function removeAllClasses() {
  boxes.forEach((box) => {
    box.classList.remove("activator");
  });
}

function getRandomPlace() {
  let place = Math.floor(Math.random() * boxes.length);
  boxes[place].appendChild(gamePlayer);
  removeAllClasses();
  boxes[place].classList.add("activator");
}

getRandomPlace();

function gameOver() {
  clearInterval(interval);
  popUp.classList.remove("startGame");
  scorer.textContent = "Your Score Point Is : ";
  reply.innerHTML = "Play Again";
  point.innerHTML = score <= 9 ? "0" + score : score;
  popUp.classList.add("animated");
  if (score > HiScoreValue) {
    localStorage.setItem("HiScore", score);
  }
}
