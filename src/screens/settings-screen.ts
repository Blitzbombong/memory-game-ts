export const getSettingsScreenHTML = (): string => {
  return `
    <section class="settings-screen">
        <div class="settings-content-box">
            <div class="settings-title-group">
                <h1 class="settings-title">Settings</h1>
                <img class="settings-divider" src="./assets/icons/ui/line_1.svg" alt="" />
            </div>

                <div class="settings-layout-wrapper">
                    <div class="settings-controls">
                        <fieldset class="settings-group">
  
                            <legend class="settings-label">
                                <div class="legend-content">
                                    <img class="settings-icon" src="./assets/icons/ui/settings_print.svg" alt="settings icon" />
                                    <span>Choose player</span>
                                </div>
                            </legend>

                            <div class="options">
                                <label class="option-item">
                                    <input type="radio" name="chosenPlayer" value="blue" checked>
                                    <span class="custom-radio"></span>
                                    <span>Blue</span>
                                </label>
                                <label class="option-item">
                                    <input type="radio" name="chosenPlayer" value="orange">
                                    <span class="custom-radio"></span>
                                    <span>Orange</span>
                                </label>
                            </div>

                        </fieldset>

                        <fieldset class="settings-group">
  
                            <legend class="settings-label">
                                <div class="legend-content">
                                    <img class="settings-icon" src="./assets/icons/ui/chess_pawn.svg" alt="settings icon" />
                                    <span>Choose player</span>
                                </div>
                            </legend>

                            <div class="options">
                                <label class="option-item">
                                    <input type="radio" name="chosenPlayer" value="blue" checked>
                                    <span class="custom-radio"></span>
                                    <span>Blue</span>
                                </label>
                                <label class="option-item">
                                    <input type="radio" name="chosenPlayer" value="orange">
                                    <span class="custom-radio"></span>
                                    <span>Orange</span>
                                </label>
                            </div>

                        </fieldset>

                        <fieldset class="settings-group">
  
                            <legend class="settings-label">
                                <div class="legend-content">
                                    <img class="settings-icon" src="./assets/icons/ui/settings_panel.svg" alt="settings icon" />
                                    <span>Choose player</span>
                                </div>
                            </legend>

                            <div class="options">
                                <label class="option-item">
                                    <input type="radio" name="chosenPlayer" value="blue" checked>
                                    <span class="custom-radio"></span>
                                    <span>Blue</span>
                                </label>
                                <label class="option-item">
                                    <input type="radio" name="chosenPlayer" value="orange">
                                    <span class="custom-radio"></span>
                                    <span>Orange</span>
                                </label>
                            </div>

                        </fieldset>
                    </div>

                    <div class="preview-panel">
                        <img id="code-theme-preview" src="./assets/images/code_theme.svg"/>
                        <!--<img id="gaming-theme-preview" src="./assets/images/gaming_theme.svg" alt="Gaming theme preview"/>-->
                    </div>
                </div>

            <!-- Der Button zum Starten unter dem Layout-Wrapper -->
            <button class="play-button" id="start-game-btn">Play</button>
        </div>
    </section>
  `;
};
