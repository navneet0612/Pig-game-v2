"use strict";
// selecting elements
const player0El = document.querySelector(".player--0 ");
const player1El = document.querySelector(".player--1 ");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

let score, currentScore, activePlayer, playing;

// Starting conditions

const init = function () {
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  diceEl.classList.add("hidden");

  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
};

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}
// rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generating a rondom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled dice is 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swicth to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to the score of active player
    score[activePlayer] += currentScore;
    // eg: score[1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2. check if player score >= 100
    if (score[activePlayer] >= 100) {
      //if ye then active playe won the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
      diceEl.classList.add("hidden");
    } else {
      // else switch to next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
