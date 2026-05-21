import { GameSettings } from "../types/types";

export function setupSettingsScreenListeners(
  onPlay: (settings: GameSettings) => void,
): void {
  initRadioChangeListeners();
  initPlayButtonListener(onPlay);
  checkIfFormIsValid();
}

function initRadioChangeListeners(): void {
  const allRadios = document.querySelectorAll('.option-item input[type="radio"]');
  allRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      checkIfFormIsValid();
    });
  });
}

function checkIfFormIsValid(): void {
  const playBtn = document.getElementById("start-game-btn") as HTMLButtonElement;
  if (!playBtn) return;
  const themeChecked = document.querySelector('input[name="gameTheme"]:checked');
  const playerChecked = document.querySelector('input[name="chosenPlayer"]:checked');
  const sizeChecked = document.querySelector('input[name="gameBoardSize"]:checked');

  if (themeChecked && playerChecked && sizeChecked) {
    playBtn.removeAttribute("disabled");
  } else {
    playBtn.setAttribute("disabled", "true");
  }
}


function initPlayButtonListener(
  onPlay: (settings: GameSettings) => void,
): void {
  const playBtn = document.getElementById("start-game-btn");
  playBtn?.addEventListener("click", () => {
    if ((playBtn as HTMLButtonElement).hasAttribute("disabled")) return;
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
      'input[name="gameBoardSize"]:checked',
    ) as HTMLInputElement
  ).value;

  return {
    theme: theme as GameSettings["theme"],
    playerColor: player as GameSettings["playerColor"],
    boardSize: parseInt(size) as GameSettings["boardSize"],
  };
}
