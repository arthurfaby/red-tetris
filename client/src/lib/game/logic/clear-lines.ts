import { GRID_WIDTH, Tetromino, type TetrominoType } from "@red-tetris/shared";

export function clearLines(board: TetrominoType[][]) {
  for (let i = board.length - 1; i >= 0; i--) {
    const row = board[i];
    const isLineFull = row.every((cell) => cell !== Tetromino.NONE);
    if (isLineFull) {
      for (let j = i; j >= 0; j--) {
        if (j === 0) {
          board[j] = new Array(GRID_WIDTH).fill(Tetromino.NONE);
        } else {
          board[j] = board[j - 1];
        }
      }
      board = clearLines(board);
      break;
    }
  }
  return board.map((row) => [...row]);
}
