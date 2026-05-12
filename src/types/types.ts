export interface GameSettings {
  theme: 'code-vibes' | 'gaming';
  playerColor: 'blue' | 'orange';
  boardSize: 16 | 24 | 36;
}

export type GameState = 'start' | 'settings' | 'in-game' | 'game-over';