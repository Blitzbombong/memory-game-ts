export const getSettingsScreenHTML = (): string => {
  return `
    <section class="settings-screen">
        <h2>Settings</h2>

        <div class="settings-layout-wrapper">
            <div class="settings-controls">
                <fieldset class="settings-group">
                    <legend class="settings-label">Game themes</legend>
                    <div class="options">
                    <label class="option-item">
                            <input type="radio" name="gameTheme" value="code-vibes" checked>
                            <span>Code vibes theme</span>
                        </label>
                        <label class="option-item">
                            <input type="radio" name="gameTheme" value="gaming">
                            <span>Gaming theme</span>
                        </label>
                    </div>
                </fieldset>

                <fieldset class="settings-group">
                    <legend class="settings-label">Choose player</legend>
                    <div class="options">
                    <label class="option-item">
                            <input type="radio" name="chosenPlayer" value="blue" checked>
                            <span>Blue</span>
                        </label>
                        <label class="option-item">
                            <input type="radio" name="chosenPlayer" value="orange">
                            <span>Orange</span>
                        </label>
                    </div>
                </fieldset>

                <fieldset class="settings-group">
                    <legend class="settings-label">Board size</legend>
                    <div class="options">
                        <label class="option-item">
                            <input type="radio" name="boardSize" value="16" checked>
                            <span>16 cards</span>
                        </label>
                        <label class="option-item">
                            <input type="radio" name="boardSize" value="24">
                            <span>24 cards</span>
                        </label>
                        <label class="option-item">
                            <input type="radio" name="boardSize" value="36">
                            <span>36 cards</span>
                        </label>
                    </div>
                </fieldset>
            </div>

            <div class="preview-panel">
                <img id="theme-preview" src="" alt="Theme Preview" />
            </div>
        </div>

            <!-- Der Button zum Starten unter dem Layout-Wrapper -->
            <button class="play-button" id="start-game-btn">Play</button>
    </section>
  `;
};
