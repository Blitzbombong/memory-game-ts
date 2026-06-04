import { GameSettings } from "../types/types";

/** Sets up event listeners for the settings screen.
 * @param {function} onPlay - A callback function that is called when the play button is clicked, receiving the selected game settings as an argument.
 */
export function setupSettingsScreenListeners(
  onPlay: (settings: GameSettings) => void,
): void {
  initRadioChangeListeners();
  initPlayButtonListener(onPlay);
  checkIfFormIsValid();
}

/** Initializes change listeners for all radio buttons in the settings form. */
function initRadioChangeListeners(): void {
  const allRadios = document.querySelectorAll('.option-item input[type="radio"]');
  allRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      checkIfFormIsValid();
    });
  });
}

/** Checks if the settings form is valid. */
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

/** Initializes the event listener for the play button.
 * @param {function} onPlay - A callback function that is called when the play button is clicked, receiving the selected game settings as an argument.
 */
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

/** Retrieves the selected game settings from the settings form.
 * @returns An object containing the selected theme, player color, and board size.
 */
export function getSelectedSettings(): GameSettings {
  return {
    theme: getCheckedValue('gameTheme') as GameSettings["theme"],
    playerColor: getCheckedValue('chosenPlayer') as GameSettings["playerColor"],
    boardSize: parseInt(getCheckedValue('gameBoardSize')) as GameSettings["boardSize"],
  };
}

/** Retrieves the value of the checked radio button for a given input name.
 * @param {string} inputName - The name attribute of the radio button group.
 * @returns The value of the checked radio button, or an empty string if none are checked.
 */
function getCheckedValue(inputName: string): string {
  const checkedInput = document.querySelector(`input[name="${inputName}"]:checked`) as HTMLInputElement;
  return checkedInput ? checkedInput.value : '';
}
