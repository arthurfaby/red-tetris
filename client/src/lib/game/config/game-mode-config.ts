import { type GameMode } from "@red-tetris/shared";

interface GameModeConfig {
  getTickInterval: (linesCleared?: number) => number;
}

const DEFAULT_TICK_INTERVAL = 1000;

export const GAME_MODE_CONFIGS: Record<GameMode, GameModeConfig> = {
  DEFAULT: {
    getTickInterval: () => DEFAULT_TICK_INTERVAL,
  },
  ACCELERATED_GRAVITY: {
    getTickInterval: (linesCleared) =>
      Math.max(100, DEFAULT_TICK_INTERVAL - (linesCleared ?? 0) * 150),
  },
  SWAP_PIECES: {
    getTickInterval: () => DEFAULT_TICK_INTERVAL,
  },
};

export const getGameModeConfig = (gameMode: GameMode) =>
  GAME_MODE_CONFIGS[gameMode];
