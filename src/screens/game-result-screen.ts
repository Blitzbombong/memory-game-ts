import { GameResultData } from "../types/types";

export const getGameResultHTML = (data: GameResultData, currentThemeClass: string, icons: any): string => {
  const isWin = data.type === 'win';
  const isGameOver = data.type === 'game-over';
  const isDraw = data.type === 'draw';

  // Holt dynamisch das richtige Icon passend zum aktiven Style (Code-Vibes oder Gaming)!
  const winnerPawnSrc = data.winnerColor === 'blue' ? icons.pawnBlue : icons.pawnOrange;

  return /*html*/ `
    <section class="result-overlay ${currentThemeClass} ${isWin ? 'has-confetti' : ''}">
    <article class="result-content-container">
        
        <header class="result-header">
            ${isGameOver ? `
                <img src="${icons.titleGameOver}" class="result-title-img game-over-title" alt="Game Over">
            ` : ''}

        </header>

        ${isWin ? `
            <div class="winner-box">
                <p class="winner-label">The winner is</p>
                <h2 class="winner-name color-${data.winnerColor}">${data.winnerName?.toUpperCase()}</h2>
                
                <figure class="winner-illustration">
                    <img src="${winnerPawnSrc}" class="winner-pawn" alt="Winner Icon">
                </figure>
            </div>
        ` : ''}
        
        ${isDraw ? `
            <div class="draw-container">
                <p class="draw-label">It's a</p>
                
                ${icons.titleDraw ? `
                    <img src="${icons.titleDraw}" class="result-title-img draw-title" alt="DRAW">
                ` : `
                    <h1 class="draw-title">DRAW</h1>
                `}

                <figure class="draw-illustration">
                    <img src="${icons.scale}" class="draw-scale" alt="Draw Scales Icon">
                </figure>
            </div>
        ` : ''}
            
        ${isGameOver ? `
            <section class="score-summary">
                <p class="final-score-label">Final score</p>
                
                <div class="score-board">
                    
                    <div class="score-item blue-player">
                        <img src="${icons.playerOne}" alt="Blue Icon" class="player-icon">
                        <span class="score-value">
                            <span class="player-name">Blue</span> ${data.scores.blue}
                        </span>
                    </div>
                    
                    <div class="score-item orange-player">
                        <img src="${icons.playerTwo}" alt="Orange Icon" class="player-icon">
                        <span class="score-value">
                            <span class="player-name">Orange</span> ${data.scores.orange}
                        </span>
                    </div>
                    
                </div>
            </section>
        ` : ''}

        ${!isGameOver ? `
            <button id="back-to-start-btn" class="primary-button">
                ${icons.buttonText}
            </button>
        ` : ''}

    </article>
</section>
  `;
};