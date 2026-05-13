import { GRID_WIDTH, Tetromino, type TetrominoType } from "@red-tetris/shared";

export function clearLines(board: TetrominoType[][]): TetrominoType[][] {
  const clearedBoard = board.filter(
    (row) => !row.every((cell) => cell !== Tetromino.NONE),
  );
  const emptyRows = board.length - clearedBoard.length;
  const emptyLines = Array.from({ length: emptyRows }, () =>
    new Array<TetrominoType>(GRID_WIDTH).fill(Tetromino.NONE),
  );
  return [...emptyLines, ...clearedBoard];
}
