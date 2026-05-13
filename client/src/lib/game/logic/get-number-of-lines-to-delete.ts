import { Tetromino, type TetrominoType } from "@red-tetris/shared";

export function getNumberOfLinesToDelete(board: TetrominoType[][]): number {
  let linesToDeleted = 0;
  for (let i = board.length - 1; i >= 0; i--) {
    const row = board[i];
    const isLineFull = row.every((cell) => cell !== Tetromino.NONE);
    if (isLineFull) {
      linesToDeleted += 1;
    }
  }

  return linesToDeleted;
}
