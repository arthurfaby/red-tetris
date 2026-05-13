import { GRID_WIDTH, Tetromino, type TetrominoType } from "@red-tetris/shared";

export function clearLines(board: TetrominoType[][]) {
  let newBoard = board.map((row) => [...row]);
  for (let i = newBoard.length - 1; i >= 0; i--) {
    const row = newBoard[i];
    const isLineFull = row.every((cell) => cell !== Tetromino.NONE);
    if (isLineFull) {
      for (let j = i; j >= 0; j--) {
        if (j === 0) {
          newBoard[j] = new Array(GRID_WIDTH).fill(Tetromino.NONE);
        } else {
          newBoard[j] = newBoard[j - 1];
        }
      }
      newBoard = clearLines(newBoard);
      break;
    }
  }
  return newBoard;
}
