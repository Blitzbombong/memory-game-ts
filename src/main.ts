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
    titleDraw: "./assets/icons/ui/draw_green.svg"
  },
  gaming: {
    playerOne: "./assets/icons/ui/blue_player.svg",
    playerTwo: "./assets/icons/ui/orange_player.svg",
    exit: "./assets/icons/ui/exit_with.svg",
    pawnBlue: "./assets/icons/ui/pockal-one.svg", 
    pawnOrange: "./assets/icons/ui/pockal-one.svg",
    scale: "./assets/icons/ui/scale_gaming.svg",
    buttonText: "Home",
    titleGameOver: "./assets/icons/ui/game_over_pink.svg"
  },
};

function init() {
  render();
}

function render() {
  const appRef = document.getElementById("app");
  if (!appRef) return;

  currentState = "result";
  currentSettings.theme = "gaming";

  (window as any).gameWinner = "blue";

  renderResultScreen(appRef);
  return;

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
      winnerName: gameWinner === "blue" ? "Blue Player" : "Orange Player",
      scores
    }, currentThemeClass);
  }, 3000);
}

function showResult(appRef: HTMLElement, data: GameResultData, currentThemeClass: string) {
  // 1. Wir holen das exakte Icon-Set für das aktuelle Theme (z.B. 'code-vibes')
  const themeName = currentSettings.theme; // 'code-vibes' oder 'gaming'
  const icons = themeIcons[themeName]; // 👈 Hier haben wir die echten Pfade!

  // 2. Wir übergeben die echten Icons als DRITTEN Baustein an dein HTML-Template
  appRef.innerHTML = getGameResultHTML(data, currentThemeClass, icons);
  
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
