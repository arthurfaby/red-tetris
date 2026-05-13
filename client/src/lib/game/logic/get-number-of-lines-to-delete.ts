import { Tetromino, type TetrominoType } from "@red-tetris/shared";

export function getNumberOfLinesToDelete(board: TetrominoType[][]): number {
  let linesToDelete = 0;
  for (let i = board.length - 1; i >= 0; i--) {
    const row = board[i];
    const isLineFull = row.every((cell) => cell !== Tetromino.NONE);
    if (isLineFull) {
      linesToDelete += 1;
    }
  }

  return linesToDelete;
}
