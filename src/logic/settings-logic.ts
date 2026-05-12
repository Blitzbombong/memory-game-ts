import { GameSettings } from "../types/types";

export function setupSettingsScreenListeners(
  onPlay: (settings: GameSettings) => void,
): void {
  initThemePreviewListener();
  initPlayButtonListener(onPlay);
}

function initThemePreviewListener(): void {
  const themeRadios = document.querySelectorAll(
    'input[name="gameTheme"]',
  ) as NodeListOf<HTMLInputElement>;
  const previewImg = document.getElementById(
    "theme-preview",
  ) as HTMLImageElement;

  themeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked && previewImg) {
        previewImg.src = `./assets/${radio.value}-preview.png`;
      }
    });
  });
}

function initPlayButtonListener(
  onPlay: (settings: GameSettings) => void,
): void {
  const playBtn = document.getElementById("start-game-btn");
  playBtn?.addEventListener("click", () => {
    const settings = getSelectedSettings();
    onPlay(settings);
  });
}

function getSelectedSettings(): GameSettings {
  const theme = (
    document.querySelector(
      'input[name="gameTheme"]:checked',
    ) as HTMLInputElement
  ).value;
  const player = (
    document.querySelector(
      'input[name="chosenPlayer"]:checked',
    ) as HTMLInputElement
  ).value;
  const size = (
    document.querySelector(
      'input[name="boardSize"]:checked',
    ) as HTMLInputElement
  ).value;

  return {
    theme: theme as GameSettings["theme"],
    playerColor: player as GameSettings["playerColor"],
    boardSize: parseInt(size) as GameSettings["boardSize"],
  };
}
