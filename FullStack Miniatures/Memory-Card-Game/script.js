/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const cards = document.querySelectorAll('.memory-card');

/* Note: In a real environment with images, we would use the HTML structure. 
   Since I cannot upload images easily, I will modify the DOM to use Emojis for the cards 
   to ensure the game is playable immediately without broken images. */
   
const emojis = ['🚀', '🚀', '🌟', '🌟', '🎮', '🎮', '💡', '💡', '🔥', '🔥', '💎', '💎'];

// Replace Inner HTML with Emojis for standalone playability
const gameBoard = document.querySelector('.memory-game');
gameBoard.innerHTML = '';
emojis.sort(() => 0.5 - Math.random()); // Initial shuffle

emojis.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.framework = emoji;
    
    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.innerText = emoji;
    
    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    backFace.innerText = '❓';
    
    card.appendChild(frontFace);
    card.appendChild(backFace);
    gameBoard.appendChild(card);
});

// Re-select cards after regeneration
const newCards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

newCards.forEach(card => card.addEventListener('click', flipCard));
