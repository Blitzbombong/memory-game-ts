import "./styles/style.scss";
import type { GameSettings, GameState } from "./types/types";
import { getStartScreenHTML } from "./screens/start-screen";
import { getSettingsScreenHTML } from "./screens/settings-screen";
import { setupSettingsScreenListeners } from "./logic/settings-logic";

let currentSettings: GameSettings = {
  theme: "code-vibes",
  playerColor: "blue",
  boardSize: 16,
};

let currentState: GameState = "start";

function init() {
  render();
}

function render() {
  const appRef = document.getElementById("app");
  if (!appRef) return;

  if (currentState === "start") {
    appRef.innerHTML = getStartScreenHTML();
    setupStartScreenListeners();
  } else if (currentState === "settings") {
    appRef.innerHTML = getSettingsScreenHTML();
    setupSettingsScreenListeners((newSettings) => {
      currentSettings = newSettings;
      currentState = "in-game";
      render();
    });
  }
}

function setupStartScreenListeners() {
  const startButton = document.querySelector(
    ".start-button",
  ) as HTMLButtonElement;
  if (startButton) {
    startButton.addEventListener("click", () => {
      currentState = "settings";
      render();
    });
  }
}

//const fieldRef = document.getElementById('field')
//if (fieldRef) {
//fieldRef.addEventListener('click', e => {
///const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement
//if (card) {
//card.classList.toggle('is-flipped')
//}
//})
//}

init();
