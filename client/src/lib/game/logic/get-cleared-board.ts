import { Tetromino, type TetrominoType } from "@red-tetris/shared";

export function getClearedBoard(board: TetrominoType[][]) {
  return board.filter((row) => !row.every((cell) => cell !== Tetromino.NONE));
}
