'use strict';

// Selecting Element
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
// Variables
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let isPlaying = true;
const winningScore = 100;
// PreCondition

scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');
//function for toggling user
function toggleUser() {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Rolling Dice Functionality
btnRollDice.addEventListener('click', function () {
  //1. Generate a random Number
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    //3. Check for roll 1
    if (dice !== 1) {
      //2. Display the dice image and update current score

      diceEl.src = `dice-${dice}.png`;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      console.log('in else');
      diceEl.src = `dice-${dice}.png`;
      //Switch to Next Player

      document.getElementById(`current--${activePlayer}`).textContent = 0;
      toggleUser();
    }
  }
});
// hold Functionality
btnHold.addEventListener('click', function () {
  // add current score to activePlayer's  Score
  if (isPlaying) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // Check for winning Score
    if (score[activePlayer] < winningScore) {
      // if not winningScore
      toggleUser();
    } else {
      //if winning score then highlight the active player
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .getElementById(`name--${activePlayer}`)
        .classList.add('player--winner');
    }
  }
});

// New game functionality
btnNewGame.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .getElementById(`name--${activePlayer}`)
    .classList.remove('player--winner');
  isPlaying = true;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
});
