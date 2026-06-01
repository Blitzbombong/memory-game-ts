export interface GameSettings {
  theme: 'code-vibes' | 'gaming';
  playerColor: 'blue' | 'orange';
  boardSize: 16 | 24 | 36;
}

export type GameState = 'start' | 'settings' | 'in-game' | 'result';

export interface Card {
  id: number;
  value: string;      
  isFlipped: boolean; 
  isMatched: boolean; 
}

export interface IconSet {
  playerOne: string;
  playerTwo: string;
  exit: string;
}

export interface GameResultData {
  type: 'win' | 'game-over' | 'draw';
  winnerName?: string;
  winnerColor?: 'blue' | 'orange' | 'draw';
  scores: {
    blue: number;
    orange: number;
  };
}
export type ThemeIcons = Record<GameSettings['theme'], IconSet>;