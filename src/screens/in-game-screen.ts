import { Card, GameSettings } from "../types/types";

export const getInGameScreenHTML = (allCards: Card[], currentTheme: GameSettings["theme"]): string => {
  
  const cardsHTML = allCards.map(card => `
    <button class="card ${card.isFlipped ? 'is-flipped' : ''} ${card.isMatched ? 'is-matched' : ''}" data-id="${card.id}">
      <div class="card__inner">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">
          <img src="./assets/icons/${card.value}.svg" alt="Card Symbol">
        </div>
      </div>
    </button>
  `).join('');

  return `
    <section class="in-game-screen">
      <header class="game-header">
        <div class="score-board">
          <div class="score-item blue-player">
            <img src="./assets/icons/icon-blue.svg" alt="Blue Icon" class="player-icon">
            <span id="score-blue" class="score-value">0</span>
          </div>
          <div class="score-item orange-player">
            <img src="./assets/icons/icon-orange.svg" alt="Orange Icon" class="player-icon">
            <span id="score-orange" class="score-value">0</span>
          </div>
        </div>

        <div class="current-player-status">
          <span class="status-label">Current player:</span>
          <div id="active-player-display" class="player-indicator">
            <img src="./assets/icons/icon-blue.svg" alt="Current Player" class="active-icon">
          </div>
        </div>

        <div class="game-actions">
          <button id="exit-game-btn" class="exit-button">
            <img src="./assets/icons/icon-exit.svg" alt="Exit" class="btn-icon">
            <span>Exit game</span>
          </button>
        </div>
      </header>

      <main>
        <div class="game-info">
          <p>Turn: <span class="turn">1</span></p>
          <p>Pairs found: <span class="score">0</span></p>
        </div>
        <div class="game-field" id="game-grid">
          ${cardsHTML} 
        </div>
      </main>
    </section>
  `;
};