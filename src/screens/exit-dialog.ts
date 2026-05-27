export const getExitDialogHTML = (): string => {
  return `
    <div class="modal-backdrop" id="exit-modal">
      <div class="modal-content">
        <h2 class="modal-title">Are you sure you want to quit the game?</h2>
        <div class="modal-actions">
          <button id="cancel-exit-btn" class="modal-btn btn-primary">No, back to game</button>
          <button id="confirm-exit-btn" class="modal-btn btn-secondary">Yes, quit game</button>
        </div>
      </div>
    </div>
  `;
};