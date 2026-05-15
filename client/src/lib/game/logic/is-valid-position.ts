import { Tetromino, TETROMINOS, type TetrominoType } from "@red-tetris/shared";
import type { TetrominoState } from "@/lib/stores/use-tetris-store.ts";
import { isInBoard } from "@/lib/game/logic/is-in-board.ts";

export function isValidPosition(
  board: TetrominoType[][],
  futurePieceState: TetrominoState,
) {
  const shape =
    TETROMINOS[futurePieceState.type].shape[futurePieceState.rotation];
  for (const [dy, row] of shape.entries()) {
    for (const [dx, value] of row.entries()) {
      if (value !== Tetromino.NONE) {
        const boardY = futurePieceState.y + dy;
        const boardX = futurePieceState.x + dx;
        if (
          !isInBoard(boardX, boardY) ||
          board[boardY][boardX] !== Tetromino.NONE
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
