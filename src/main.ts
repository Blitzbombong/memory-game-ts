import "./styles/style.scss";
import type { GameSettings, GameState, Card } from "./types/types";
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
    const inGameScreenRef = document.querySelector(".in-game-screen");

    if (inGameScreenRef) {
      inGameScreenRef.insertAdjacentHTML("beforeend", getExitDialogHTML(currentSettings.theme));
    } else {
      appRef.insertAdjacentHTML("beforeend", getExitDialogHTML(currentSettings.theme));
    }
    setupExitDialogLogic();
  } else if (currentState === "result") {
    renderResultScreen(appRef);
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
    initGame(newSettings.playerColor);
    allCards = createDeck(currentSettings.boardSize);
    currentState = "in-game";
    render();
  });
}

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
  const result = getGameResult(allCards.length);
  if (result.isGameOver && result.winner) {
    gameWinner = result.winner; // Gewinner für gleich merken
    currentState = "result"; // Zustand wechseln
    render(); // Zentrales Render aufrufen
    return;
  }

  setupGameListeners(
    allCards,
    () => render(),
    () => {
      const exitModal = document.getElementById("exit-modal");
      if (exitModal) {
        exitModal.classList.add("is-open");
      }
    },
  );
}

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

function renderResultScreen(appRef: HTMLElement) {
  const scores = getGameState().scores; // Holt nur noch die Scores aus dem State
  
  // 🟢 Wir nutzen direkt deine globale Variable für das Theme!
  // Wenn deine Variable z.B. "code-vibes" speichert, wird daraus "theme-code-vibes"
  const currentThemeClass = `theme-${currentSettings.theme}`; 

  if (gameWinner === "draw") {
    showResult(appRef, { type: "draw", scores }, currentThemeClass);
    return;
  }

  // 1. Screen: Game over
  showResult(appRef, { type: "game-over", scores }, currentThemeClass);
  
  // 2. Screen: Winner nach 3 Sekunden
  setTimeout(() => {
    showResult(appRef, {
      type: "win",
      winnerColor: gameWinner,
      winnerName: gameWinner === "blue" ? "Player Blue" : "Player Orange",
      scores
    }, currentThemeClass);
  }, 3000);
}

function showResult(appRef: HTMLElement, data: GameResultData, currentThemeClass: string) {
  appRef.innerHTML = getGameResultHTML(data, currentThemeClass);
  
  if (data.type !== "game-over") {
    document.getElementById("back-to-start-btn")?.addEventListener("click", () => {
      currentState = "start";
      render();
    });
  }
}

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
