import { Card, GameSettings } from "../types/types";
import { ThemeIcons } from "../types/types";

const themeIcons: ThemeIcons = {
  "code-vibes": {
    playerOne: "./assets/icons/ui/label_blue.svg",
    playerTwo: "./assets/icons/ui/label_orange.svg",
    exit: "./assets/icons/ui/exit_with.svg",
  },
  gaming: {
    playerOne: "./assets/icons/ui/blue_player.svg",
    playerTwo: "./assets/icons/ui/orange_player.svg",
    exit: "./assets/icons/ui/exit_with.svg",
  },
};

export const getInGameScreenHTML = (
  allCards: Card[],
  currentTheme: GameSettings["theme"], scores: { blue: number; orange: number },
  activePlayer: 'blue' | 'orange'
): string => {
  const boardSize = allCards.length as GameSettings["boardSize"];
  const icons = themeIcons[currentTheme];
  const activePlayerIcon = activePlayer === 'blue' ? icons.playerOne : icons.playerTwo;

  const cardsHTML = allCards
    .map(
      (card) => /*html*/ `
    <button class="card ${card.isFlipped ? "is-flipped" : ""} ${card.isMatched ? "is-matched" : ""}" data-id="${card.id}">
      <div class="card__inner">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">
          <img src="./assets/icons/${currentTheme}/${card.value}.svg" alt="Card Symbol ${card.value}">
        </div>
      </div>
    </button>
  `,
    )
    .join("");

  return /*html*/ `
    <section class="in-game-screen theme-${currentTheme}">
      <header class="game-header">
        <div class="score-board">
          <div class="score-item blue-player">
            <img src="${icons.playerOne}" alt="Blue Icon" class="player-icon">
            <span id="score-blue" class="score-value">
              <span class="player-name">Blue</span> ${scores.blue}
            </span>
          </div>
          <div class="score-item orange-player">
            <img src="${icons.playerTwo}" alt="Orange Icon" class="player-icon">
            <span id="score-orange" class="score-value">
              <span class="player-name">Orange</span> ${scores.orange}
            </span>
          </div>
        </div>

        <div class="current-player-status">
          <span class="status-label">Current player:</span>
          <div id="active-player-display" class="player-indicator">
            <img src="${activePlayerIcon}" alt="Current Player" class="active-icon">
          </div>
        </div>

        <div class="game-actions">
          <button id="exit-game-btn" class="exit-button">
            <img src="${icons.exit}" alt="Exit" class="btn-icon">
            <span>Exit game</span>
          </button>
        </div>
      </header>

      <main>
        <div class="game-field grid-${boardSize}" id="game-grid">
          ${cardsHTML} 
        </div>
      </main>
    </section>
  `;
};
