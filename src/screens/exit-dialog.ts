const dialogTexts: Record<string, { cancel: string; confirm: string }> = {
  "code-vibes": {
    cancel: "Back to game",
    confirm: "Exit game",
  },
  gaming: {
    cancel: "No, back to game",
    confirm: "Yes, quit game",
  },
};

/** @param {string} currentTheme */
export const getExitDialogHTML = (currentTheme: string): string => {
  const texts = dialogTexts[currentTheme] || dialogTexts["code-vibes"];

  return /*html*/ `
    <div class="modal-backdrop" id="exit-modal">
      <div class="modal-content">
        <h2 class="modal-title">Are you sure you want to quit the game?</h2>
        <div class="modal-actions">
          <button id="cancel-exit-btn" class="modal-btn btn-primary">${texts.cancel}</button>
          <button id="confirm-exit-btn" class="modal-btn btn-secondary">${texts.confirm}</button>
        </div>
      </div>
    </div>
  `;
};
