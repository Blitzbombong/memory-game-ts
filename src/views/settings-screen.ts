/**
 * Generates the HTML structure for the settings screen of the game.
 * This screen allows users to customize their gaming experience by selecting themes, players, and board sizes.
 * @returns {string} The HTML markup for the settings screen.
 */
export const getSettingsScreenHTML = (): string => {
  return /*html*/ `
    <section class="settings-screen">
        <div class="settings-content-box">
            <header class="settings-title-group">
                <h1 class="settings-title">Settings</h1>
                <img class="settings-divider" src="./assets/icons/ui/line_1.svg" alt="" />
            </header>

                <main class="settings-layout-wrapper">
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
                                    <input type="radio" name="gameTheme" value="code-vibes" checked>
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
                                    <input type="radio" name="gameBoardSize" value="16">
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

                    <figure class="preview-panel">
                        <img id="code-theme-preview" class="theme-preview-img" src="./assets/images/code_theme.svg" alt="Code theme preview"/>
                        <img id="gaming-theme-preview" class="theme-preview-img" src="./assets/images/gaming_theme.svg" alt="Gaming theme preview"/>

                        <div class="settings-start-bar">
                            <div class="status-indicators">
                                <span class="status-item" id="status-theme">Theme</span>
                                <span class="status-divider"></span>
                                <span class="status-item" id="status-player">Player</span>
                                <span class="status-divider"></span>
                                <span class="status-item" id="status-size">Board size</span>
                            </div>
                            
                            <button class="btn-start" id="start-game-btn" disabled>
                                <img src="./assets/icons/ui/play_icon.svg" alt="" />
                                <span>Start</span>
                            </button>
                        </div>
                    </figure>

                </main>
        </div>
    </section>
  `;
};
