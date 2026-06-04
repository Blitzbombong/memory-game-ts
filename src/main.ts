import "./styles/style.scss";
import type { GameSettings, GameState, Card, ThemeIcons } from "./types/types";
import type { GameResultData } from "./types/types";
import { getStartScreenHTML } from "./screens/start-screen";
import { getSettingsScreenHTML } from "./screens/settings-screen";
import { getInGameScreenHTML } from "./screens/in-game-screen";
import { getExitDialogHTML } from "./screens/exit-dialog";
import { getGameResultHTML } from "./screens/game-result-screen";
import { setupSettingsScreenListeners } from "./logic/settings-logic";
import { createDeck } from "./logic/game-logic";
import { setupGameListeners } from "./logic/game-logic";
import { initGame, getGameState, getGameResult } from "./logic/game-logic";

let currentSettings: GameSettings = {
  theme: "code-vibes",
  playerColor: "blue",
  boardSize: 16,
};

let currentState: GameState = "start";
let gameWinner: "blue" | "orange" | "draw" = "draw";
let allCards: Card[] = [];

export const themeIcons: ThemeIcons = {
  "code-vibes": {
    playerOne: "./assets/icons/ui/label_blue.svg",
    playerTwo: "./assets/icons/ui/label_orange.svg",
    exit: "./assets/icons/ui/exit_with.svg",
    pawnBlue: "./assets/icons/ui/blue_player.svg",
    pawnOrange: "./assets/icons/ui/orange_player.svg",
    scale: "./assets/icons/ui/scal_icon.svg",
    buttonText: "Back to start",
    titleGameOver: "./assets/icons/ui/game_over_green.svg",
    titleDraw: "./assets/icons/ui/draw_green.svg",
  },
  gaming: {
    playerOne: "./assets/icons/ui/blue_player.svg",
    playerTwo: "./assets/icons/ui/orange_player.svg",
    exit: "./assets/icons/ui/exit_with.svg",
    pawnBlue: "./assets/icons/ui/pockal-one.svg",
    pawnOrange: "./assets/icons/ui/pockal-one.svg",
    scale: "./assets/icons/ui/scale_gaming.svg",
    buttonText: "Home",
    titleGameOver: "./assets/icons/ui/game_over_pink.svg",
  },
};

/**
 * Initializes the game by rendering the start screen.
 */
function init() {
  render();
}

/**
 * Renders the current game state based on the `currentState` variable.
 */
function render() {
  const appRef = document.getElementById("app");
  if (!appRef) return;

  switch (currentState) {
    case "start":
      renderStartScreen(appRef);
      break;
    case "settings":
      renderSettingsScreen(appRef);
      break;
    case "in-game":
      handleInGameRender(appRef);
      break;
    case "result":
      renderResultScreen(appRef);
      break;
  }
}

/**
 * Handles the rendering logic for the in-game screen, including setting up the exit dialog.
 * @param appRef - The reference to the main app container where the in-game screen will be rendered.
 */
function handleInGameRender(appRef: HTMLElement): void {
  renderInGameScreen(appRef);

  const targetRef = document.querySelector(".in-game-screen") || appRef;
  targetRef.insertAdjacentHTML(
    "beforeend",
    getExitDialogHTML(currentSettings.theme),
  );

  setupExitDialogLogic();
}

/** Renders the start screen and sets up its event listeners.
 * @param appRef - The reference to the main app container where the start screen will be rendered.
 */
function renderStartScreen(appRef: HTMLElement) {
  appRef.innerHTML = getStartScreenHTML();
  setupStartScreenListeners();
}

/** Renders the settings screen and sets up its event listeners.
 * @param appRef - The reference to the main app container where the settings screen will be rendered.
 */
function renderSettingsScreen(appRef: HTMLElement) {
  appRef.innerHTML = getSettingsScreenHTML();
  setupSettingsScreenListeners((newSettings) => {
    currentSettings = newSettings;
    initGame(newSettings.playerColor);
    allCards = createDeck(currentSettings.boardSize);
    currentState = "in-game";
    render();
  });
}

/** Checks if the game has ended and updates the state accordingly.
 * @return {boolean} - Returns true if the game has ended, false otherwise.
 */
function checkGameEnd(): boolean {
  const result = getGameResult(allCards.length);

  if (result.isGameOver && result.winner) {
    gameWinner = result.winner;
    currentState = "result";
    render();
    return true;
  }
  return false;
}

/** Opens the exit dialog. */
function openExitModal(): void {
  const exitModal = document.getElementById("exit-modal");
  if (exitModal) exitModal.classList.add("is-open");
}

/** Renders the in-game screen, sets up the game listeners, and checks for game end conditions.
 * @param appRef - The reference to the main app container where the in-game screen will be rendered.
 */
function renderInGameScreen(appRef: HTMLElement) {
  const gameState = getGameState();

  appRef.innerHTML = getInGameScreenHTML(
    allCards,
    currentSettings.theme,
    gameState.scores,
    gameState.activePlayer,
  );

  document
    .querySelector(".game-layout-wrapper")
    ?.classList.add(`theme-${currentSettings.theme}`);

  if (checkGameEnd()) return;
  setupGameListeners(allCards, () => render(), openExitModal);
}

/** Sets up the event listeners for the exit dialog. */
function setupExitDialogLogic() {
  const exitGameBtn = document.getElementById("exit-game-btn");
  const exitModal = document.getElementById("exit-modal");
  const cancelExitBtn = document.getElementById("cancel-exit-btn");
  const confirmExitBtn = document.getElementById("confirm-exit-btn");

  if (!exitGameBtn || !exitModal || !cancelExitBtn || !confirmExitBtn) return;

  exitGameBtn.addEventListener("click", () => {
    exitModal.classList.add("is-open");
  });

  cancelExitBtn.addEventListener("click", () => {
    exitModal.classList.remove("is-open");
  });

  confirmExitBtn.addEventListener("click", () => {
    exitModal.classList.remove("is-open");
    currentState = "settings";
    render();
  });
}

/** Returns the data for the win screen.
 * @param scores - The current scores of the game.
 * @return {GameResultData} - The data object containing the win information.
 */
function getWinData(scores: any): GameResultData {
  return {
    type: "win",
    winnerColor: gameWinner,
    winnerName: gameWinner === "blue" ? "Blue Player" : "Orange Player",
    scores,
  };
}

/** Renders the result screen for the game.
 * @param appRef - The reference to the main app container where the result screen will be rendered.
 */
function renderResultScreen(appRef: HTMLElement) {
  const scores = getGameState().scores;
  const currentThemeClass = `theme-${currentSettings.theme}`;

  if (gameWinner === "draw") {
    return showResult(appRef, { type: "draw", scores }, currentThemeClass);
  }

  showResult(appRef, { type: "game-over", scores }, currentThemeClass);
  setTimeout(() => {
    showResult(appRef, getWinData(scores), currentThemeClass);
  }, 3000);
}

/** Shows the result screen for the game.
 * @param appRef - The reference to the main app container where the result screen will be rendered.
 * @param data - The data object containing the result information.
 * @param currentThemeClass - The class name for the current theme.
 */
function showResult(
  appRef: HTMLElement,
  data: GameResultData,
  currentThemeClass: string,
) {
  const themeName = currentSettings.theme;
  const icons = themeIcons[themeName];
  appRef.innerHTML = getGameResultHTML(data, currentThemeClass, icons);

  if (data.type !== "game-over") {
    document
      .getElementById("back-to-start-btn")
      ?.addEventListener("click", () => {
        currentState = "start";
        render();
      });
  }
}

/** Sets up the event listeners for the start screen. */
function setupStartScreenListeners() {
  const startButton = document.querySelector(
    ".play-button",
  ) as HTMLButtonElement;
  if (startButton) {
    startButton.addEventListener("click", () => {
      currentState = "settings";
      render();
    });
  }
}

init();
