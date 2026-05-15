import { Tetromino, type TetrominoType } from "@red-tetris/shared";

export function createEmptyBoard(height: number, width: number) {
  return Array.from({ length: height }, () =>
    new Array<TetrominoType>(width).fill(Tetromino.NONE),
  );
}
