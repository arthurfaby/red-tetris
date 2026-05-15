import { GRID_WIDTH, Tetromino, type TetrominoType } from "@red-tetris/shared";
import { getClearedBoard } from "@/lib/game/logic/get-cleared-board.ts";

export function clearLines(board: TetrominoType[][]): TetrominoType[][] {
  const clearedBoard = getClearedBoard(board);
  const emptyRows = board.length - clearedBoard.length;
  const emptyLines = Array.from({ length: emptyRows }, () =>
    new Array<TetrominoType>(GRID_WIDTH).fill(Tetromino.NONE),
  );
  return [...emptyLines, ...clearedBoard];
}
