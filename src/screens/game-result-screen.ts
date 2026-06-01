import { GameResultData } from "../types/types";

export const getGameResultHTML = (data: GameResultData, currentThemeClass: string): string => {
  const isWin = data.type === 'win';
  const isGameOver = data.type === 'game-over';
  const isDraw = data.type === 'draw';
  return /*html*/ `
    <section class="result-overlay ${currentThemeClass} ${isWin ? 'has-confetti' : ''}">
        <article class="result-content-container">
            
            <header class="result-header">
                ${isWin ? `
                    <p class="winner-label">The winner is</p>
                    <h2 class="winner-name color-${data.winnerColor}">${data.winnerName?.toUpperCase()}</h2>
                ` : ''}

                ${isGameOver ? `
                    <h1 class="game-over-title">Game over</h1>
                ` : ''}

                ${isDraw ? `
                    <p class="draw-label">It's a</p>
                    <h1 class="draw-title">DRAW</h1>
                ` : ''}
            </header>

            ${isWin ? `
                <figure class="winner-illustration">
                    <img src="./assets/icons/ui/icon-${data.winnerColor}-pawn.svg" class="winner-pawn" alt="Winner Icon">
                </figure>
            ` : ''}
            
            ${isDraw ? `
                <figure class="draw-illustration">
                    <img src="./assets/icons/ui/scale-icon.svg" class="draw-scale" alt="Draw Scales Icon">
                </figure>
            ` : ''}
                
            ${isGameOver ? `
                <section class="score-summary">
                    <p class="final-score-label">Final score</p>
                    <ul class="score-list">
                        <li class="badge blue">Blue ${data.scores.blue}</li>
                        <li class="badge orange">Orange ${data.scores.orange}</li>
                    </ul>
                </section>
            ` : ''}

            ${!isGameOver ? `
                <button id="back-to-start-btn" class="primary-button">
                    Back to start
                </button>
            ` : ''}

        </article>
    </section>
  `;
};