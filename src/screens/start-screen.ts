export const getStartScreenHTML = (): string => {
  return `
    <section class="start-screen">
      <header class="start-header">
        <p class="welcome-message">It's play time!</p>
        <h1>Ready to play?</h1>
      </header>
      <main class="start-main">
        <button class="play-button">
  
        <span class="icon-left">
          <img src="public/assets/icons/ui/stadia_controller.svg" alt="Play Icon">
        </span>
        
        <span class="button-text">Play</span>
        
        <span class="arrow-wrapper">
          <img src="public/assets/icons/ui/arrow_one.svg" class="arrow-normal" alt="Normal Arrow">
          <img src="public/assets/icons/ui/arrow_two.svg" class="arrow-hover" alt="Hover Arrow">
        </span>

      </button>
      </main>
      <footer class="start-footer">
        <img class="start-controller" src="public/assets/icons/ui/start_controller.svg" alt="Start screen illustration" class="start-illustration">
      </footer>
    </section>
  `
}