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
                                    <span>Game themes</span>
                                </div>
                            </legend>

                            <div class="options">
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="gameTheme" value="code vibes">
                                    <span class="custom-radio"></span>
                                    <span>Code vibes theme</span>
                                    <span class="radio-arrow"></span>
                                </label>
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="gameTheme" value="gaming">
                                    <span class="custom-radio"></span>
                                    <span>Gaming theme</span>
                                    <span class="radio-arrow"></span>
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
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="chosenPlayer" value="blue">
                                    <span class="custom-radio"></span>
                                    <span>Blue</span>
                                    <span class="radio-arrow"></span>
                                </label>
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="chosenPlayer" value="orange">
                                    <span class="custom-radio"></span>
                                    <span>Orange</span>
                                    <span class="radio-arrow"></span>
                                </label>
                            </div>

                        </fieldset>

                        <fieldset class="settings-group">
  
                            <legend class="settings-label">
                                <div class="legend-content">
                                    <img class="settings-icon" src="./assets/icons/ui/settings_panel.svg" alt="settings icon" />
                                    <span>Board size</span>
                                </div>
                            </legend>

                            <div class="options">
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="gameBoardSize" value="16" checked>
                                    <span class="custom-radio"></span>
                                    <span>16 cards</span>
                                    <span class="radio-arrow"></span>
                                </label>
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="gameBoardSize" value="24">
                                    <span class="custom-radio"></span>
                                    <span>24 cards</span>
                                    <span class="radio-arrow"></span>
                                </label>
                                <label class="option-item option-item--with-arrow">
                                    <input type="radio" name="gameBoardSize" value="36">
                                    <span class="custom-radio"></span>
                                    <span>36 cards</span>
                                    <span class="radio-arrow"></span>
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
