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
    appRef.innerHTML = getStartScreenHTML();
    setupStartScreenListeners();
  } else if (currentState === "settings") {
    appRef.innerHTML = getSettingsScreenHTML();
    setupSettingsScreenListeners((newSettings) => {
      currentSettings = newSettings;
      allCards = createDeck(currentSettings.boardSize);
      currentState = "in-game";
      render();
    });
  } else if (currentState === "in-game") {
    appRef.innerHTML = getInGameScreenHTML(allCards);
    setupGameListeners(
      allCards, 
      () => render(), // Was soll beim Klicken passieren? Neu zeichnen!
      () => {         // Was soll beim Exit passieren?
        currentState = 'settings'; // Zurück zu den Einstellungen
        render(); 
      }
    );
  }
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
