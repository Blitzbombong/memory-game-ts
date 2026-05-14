interface GameResultData {
  type: 'win' | 'game-over';
  winnerName?: string; // Nur für den Win-Screen
  winnerColor?: 'blue' | 'orange';
  scores: {
    blue: number;
    orange: number;
  };
}

export const getGameResultHTML = (data: GameResultData): string => {
  const isWin = data.type === 'win';
  
  return `
    <section class="result-overlay ${isWin ? 'has-confetti' : ''}">
        <article class="result-card">
            
            <header class="result-header">
                ${isWin 
                    ? `<p class="winner-label">The winner is</p>
                    <h2 class="winner-name color-${data.winnerColor}">${data.winnerName}</h2>`
                    : `<h1 class="game-over-title">Game over</h1>`
                }
            </header>

                ${isWin ? `
                    <figure class="winner-illustration">
                        <img src="/assets/icons/ui/icon-${data.winnerColor}-pawn.svg" class="winner-pawn" alt="Winner Icon">
                    </figure>
                ` : ''}
                
            <section class="score-summary">
                <p class="final-score-label">Final score</p>
                <ul class="score-list">
                    <li class="badge blue">Blue ${data.scores.blue}</li>
                    <li class="badge orange">Orange ${data.scores.orange}</li>
                </ul>
                </section>

                <button id="back-to-start-btn" class="primary-button">
                    Back to start
                </button>
            </article>
    </section>
  `;
};