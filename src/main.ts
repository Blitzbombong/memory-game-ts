import "./styles/style.scss";
import type { GameSettings, GameState, Card } from "./types/types";
import type { GameResultData } from "./types/types";
import { getStartScreenHTML } from "./screens/start-screen";
import { getSettingsScreenHTML } from "./screens/settings-screen";
import { getInGameScreenHTML } from "./screens/in-game-screen";
import { getGameResultHTML } from "./screens/game-result-screen";
import { setupSettingsScreenListeners } from "./logic/settings-logic";
import { createDeck } from "./logic/game-logic";
import { setupGameListeners } from "./logic/game-logic";
import { initGame, getGameState, getGameResult} from "./logic/game-logic";

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
  appRef.innerHTML = getInGameScreenHTML(allCards, currentSettings.theme, gameState.scores, gameState.activePlayer);
  document.querySelector(".game-layout-wrapper")?.classList.add(`theme-${currentSettings.theme}`);
  const result = getGameResult(allCards.length);
  if (result.isGameOver && result.winner) {
    gameWinner = result.winner; // Gewinner für gleich merken
    currentState = "result";    // Zustand wechseln
    render();                   // Zentrales Render aufrufen
    return; 
  }

  setupGameListeners(allCards, () => render(), () => {
    currentState = "settings";
    render();
  });
}

function renderResultScreen(appRef: HTMLElement) {
  const gameState = getGameState();

  const resultData: GameResultData = {
    type: gameWinner === "draw" ? "game-over" : "win",
    winnerName: gameWinner === "draw" ? "Draw" : gameWinner === "blue" ? "Player Blue" : "Player Orange",
    winnerColor: gameWinner !== "draw" ? gameWinner : undefined,
    scores: gameState.scores,
  };

  appRef.innerHTML = getGameResultHTML(resultData);

  document.getElementById("back-to-start-btn")?.addEventListener("click", () => {
    currentState = "start";
    render();
  });
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
