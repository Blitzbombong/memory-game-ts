import { Card } from "../types/types";

let flippedCards: Card[] = [];
let scoreBlue = 0;
let scoreOrange = 0;
let currentPlayer: "blue" | "orange" = "blue";

/**
 * Initializes the game with a specified starting player.
 * @param {("blue" | "orange")} startPlayer - The player who starts the game.
 */
export function initGame(startPlayer: "blue" | "orange"): void {
  flippedCards = [];
  scoreBlue = 0;
  scoreOrange = 0;
  currentPlayer = startPlayer;
}

/**
 * Creates a deck of cards based on the specified size.
 * @param {number} size - The size of the deck (number of cards).
 * @returns {Card[]} An array of Card objects representing the deck.
 */
export function createDeck(size: number): Card[] {
  const deck: Card[] = [];
  const numberOfPairs = size / 2;
  const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
  for (let i = 0; i < numberOfPairs; i++) {
    const currentMotive = cardValues[i];
    for (let j = 0; j < 2; j++) {
      deck.push({
        id: 0, 
        value: currentMotive, 
        isFlipped: false,
        isMatched: false,
      });
    }
  }
  const shuffledDeck = shuffle(deck);
  return shuffledDeck;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {any[]} array - The array to shuffle.
 * @returns {any[]} The shuffled array.
 */
function shuffle(array: any[]): any[] {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex],
    ];
  }
  return array.map((card, index) => ({ ...card, id: index }));
}

/** Sets up event listeners for the game, including card clicks and exit button.
 * @param {Card[]} allCards - The array of all cards in the game.
 * @param {() => void} render - A callback function to re-render the game state.
 * @param {() => void} onExit - A callback function to handle exiting the game.
 */
export function setupGameListeners(
  allCards: Card[], 
  render: () => void, 
  onExit: () => void 
): void {
  setupExitListener(onExit);
  setupGridListener(allCards, render);
}

/** Sets up the event listener for the exit button.
 * @param {() => void} onExit - A callback function to handle exiting the game.
 */
function setupExitListener(onExit: () => void): void {
  const exitBtn = document.getElementById('exit-game-btn');
  if (exitBtn) exitBtn.onclick = () => onExit();
}

/** Sets up the event listener for the game grid. 
 * @param {Card[]} allCards - The array of all cards in the game.
 * @param {() => void} render - A callback function to re-render the game state.
 */
function setupGridListener(allCards: Card[], render: () => void): void {
  const gridRef = document.getElementById('game-grid');
  if (!gridRef) return;

  gridRef.addEventListener('click', (e) => {
    const cardEl = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
    if (!cardEl) return;

    const cardId = parseInt(cardEl.getAttribute('data-id') || "-1");
    const clickedCard = allCards.find(c => c.id === cardId);

    if (clickedCard && !clickedCard.isFlipped && !clickedCard.isMatched) {
      handleCardClick(clickedCard, cardEl, render);
    }
  });
}

/** Handles the click event for a card. 
 * @param {Card} card - The card that was clicked.
 * @param {HTMLButtonElement} cardElement - The HTML button element representing the clicked card.
 * @param {() => void} render - A callback function to re-render the game state.
 */
function handleCardClick(card: Card, cardElement: HTMLButtonElement, render: () => void): void {
  if (flippedCards.length >= 2) return;

  card.isFlipped = true;
  cardElement.classList.add('is-flipped');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    checkForMatch(render);
  }
}

/** Checks if the flipped cards form a match. 
 * @param {() => void} render - A callback function to re-render the game state.
 */
function checkForMatch(render: () => void): void {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
    card1.isMatched = true;
    card2.isMatched = true;
    awardPoint();
    flippedCards = [];
    render();
  } else {
    resetUnmatchedCards(card1, card2, render);
  }
}

/** Resets the unmatched cards after a mismatch. 
 * @param {Card} card1 - The first unmatched card.
 * @param {Card} card2 - The second unmatched card.
 * @param {() => void} render - A callback function to re-render the game state.
 */
function resetUnmatchedCards(card1: Card, card2: Card, render: () => void): void {
  setTimeout(() => {
    card1.isFlipped = false;
    card2.isFlipped = false;
    flippedCards = [];
    switchPlayer();
    render();
  }, 1000);
}

/** Awards a point to the current player. */
function awardPoint(): void {
  if (currentPlayer === 'blue') {
    scoreBlue++;
  } else {
    scoreOrange++;
  }
}

/** Switches the current player. */
function switchPlayer(): void {
  currentPlayer = currentPlayer === 'blue' ? 'orange' : 'blue';
}

/** Returns the current game state. */
export function getGameState() {
  return {
    scores: { blue: scoreBlue, orange: scoreOrange },
    activePlayer: currentPlayer
  };
}

/** Checks if the game is over and returns the result.
 * @param {number} totalCards - The total number of cards in the game.
 * @returns An object containing the game over status and the winner.
 */
export function getGameResult(totalCards: number) {
  const totalPairs = totalCards / 2;
  const currentPairsFound = scoreBlue + scoreOrange;

  if (currentPairsFound < totalPairs) {
    return { isGameOver: false, winner: null };
  }

  if (scoreBlue > scoreOrange) {
    return { isGameOver: true, winner: 'blue' as const };
  } else if (scoreOrange > scoreBlue) {
    return { isGameOver: true, winner: 'orange' as const };
  } else {
    return { isGameOver: true, winner: 'draw' as const }; 
  }
}