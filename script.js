'use strict';

let randomNumber;
// El = element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const btnroll = document.querySelector('.btn--roll');
const btnnewGame = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentScore, activePlayer, playing, scores;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Hide the dice
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll dice
btnroll.addEventListener('click', function () {
  if (playing) {
    // Generate random number
    randomNumber = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.classList.remove('hidden');
    // Add to current
    // Check for rolled 1:if true, switch to next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// Hold current score
btnhold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnnewGame.addEventListener('click', init);
