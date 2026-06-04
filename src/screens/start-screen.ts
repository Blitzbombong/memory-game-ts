/**
 * Generates the HTML for the start screen of the game.
 * @returns {string} The HTML string for the start screen.
 */
export const getStartScreenHTML = (): string => {
  return /*html*/ `
    <section class="start-screen">
      <header class="start-header">
        <p class="welcome-message">It's play time!</p>
        <h1>Ready to play?</h1>
      </header>
      <main class="start-main">
        <button class="play-button">
  
        <span class="icon-left">
          <img src="assets/icons/ui/stadia_controller.svg" alt="Play Icon">
        </span>
        
        <span class="button-text">Play</span>
        
        <span class="arrow-wrapper">
          <img src="assets/icons/ui/arrow_one.svg" class="arrow-normal" alt="Normal Arrow">
          <img src="assets/icons/ui/arrow_two.svg" class="arrow-hover" alt="Hover Arrow">
        </span>

      </button>
      </main>
      <footer class="start-footer">
        <img class="start-controller" src="assets/icons/ui/start_controller.svg" alt="Start screen illustration" class="start-illustration">
      </footer>
    </section>
  `
}