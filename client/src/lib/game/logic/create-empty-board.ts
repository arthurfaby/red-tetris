import { Tetromino } from "@red-tetris/shared";

export function createEmptyBoard(height: number, width: number) {
  return Array.from({ length: height }, () =>
    new Array(width).fill(Tetromino.NONE),
  );
}
