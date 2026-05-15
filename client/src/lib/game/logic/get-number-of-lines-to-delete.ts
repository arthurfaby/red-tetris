import { type TetrominoType } from "@red-tetris/shared";
import { getClearedBoard } from "@/lib/game/logic/get-cleared-board.ts";

export function getNumberOfLinesToDelete(board: TetrominoType[][]): number {
  const clearedBoard = getClearedBoard(board);
  return board.length - clearedBoard.length;
}
