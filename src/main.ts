import "./styles/style.scss";
import type { GameSettings, GameState, Card } from "./types/types";
import { getStartScreenHTML } from "./screens/start-screen";
import { getSettingsScreenHTML } from "./screens/settings-screen";
import { getInGameScreenHTML } from "./screens/in-game-screen";
import { setupSettingsScreenListeners } from "./logic/settings-logic";
import { createDeck } from "./logic/game-logic";
import { setupGameListeners } from "./logic/game-logic";

let currentSettings: GameSettings = {
  theme: "code-vibes",
  playerColor: "blue",
  boardSize: 16,
};

let currentState: GameState = "start";

let allCards: Card[] = [];

function init() {
  render();
}

function render() {
  const appRef = document.getElementById("app");
  if (!appRef) return;

  if (currentState === "start") {
    renderStartScreen(appRef);
  } else if (currentState === "settings") {
   renderSettingsScreen(appRef);
  } else if (currentState === "in-game") {
    renderInGameScreen(appRef);
  }
}

function renderStartScreen(appRef: HTMLElement) {
  appRef.innerHTML = getStartScreenHTML();
  setupStartScreenListeners();
}

function renderSettingsScreen(appRef: HTMLElement) {
  appRef.innerHTML = getSettingsScreenHTML();
  setupSettingsScreenListeners((newSettings) => {
    currentSettings = newSettings;
    allCards = createDeck(currentSettings.boardSize);
    currentState = "in-game";
    render();
  });
}

function renderInGameScreen(appRef: HTMLElement) {
  appRef.innerHTML = getInGameScreenHTML(allCards, currentSettings.theme);
  const gameWrapper = document.querySelector(".game-layout-wrapper");
  if (gameWrapper) {
    gameWrapper.classList.add(`theme-${currentSettings.theme}`);
  }
  setupGameListeners(allCards, () => render(), () => {         
    currentState = 'settings';
    render(); 
  });
}

function setupStartScreenListeners() {
  const startButton = document.querySelector(
    ".play-button"
  ) as HTMLButtonElement;
  if (startButton) {
    startButton.addEventListener("click", () => {
      currentState = "settings";
      render();
    });
  }
}

init();
