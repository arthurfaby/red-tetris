import { GRID_WIDTH, GRID_HEIGHT } from "@red-tetris/shared";

export function isInBoard(x: number, y: number) {
  return y >= 0 && y < GRID_HEIGHT && x >= 0 && x < GRID_WIDTH;
}
