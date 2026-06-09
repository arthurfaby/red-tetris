import {
  GRID_HEIGHT,
  GRID_WIDTH,
  Tetromino,
  type TetrominoType,
} from "@red-tetris/shared";

export function getSpectrum(board: TetrominoType[][]): number[] {
  return Array.from({ length: GRID_WIDTH }, (_, x) => {
    const firstBlockY = board.findIndex((row) => row[x] !== Tetromino.NONE);
    return firstBlockY === -1 ? 0 : GRID_HEIGHT - firstBlockY;
  });
}
