import { Tetromino, type TetrominoType } from "@red-tetris/shared";

export function getNumberOfLinesToDelete(board: TetrominoType[][]): number {
  const clearedBoard = board.filter(
    (row) => !row.every((cell) => cell !== Tetromino.NONE),
  );
  return board.length - clearedBoard.length;
}
