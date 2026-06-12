import type { TetrominoState } from "@/lib/stores/use-tetris-store.ts";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  Tetromino,
  TETROMINOS,
} from "@red-tetris/shared";
import { isInBoard } from "@/lib/game/logic/is-in-board.ts";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";

export function getBoardWithOnlyCurrentPiece(currentPiece: TetrominoState) {
  const newBoard = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
  const shape = TETROMINOS[currentPiece.type].shape[currentPiece.rotation];
  shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value !== Tetromino.NONE && value !== Tetromino.PENALTY) {
        const boardY = currentPiece.y + dy;
        const boardX = currentPiece.x + dx;
        if (isInBoard(boardX, boardY)) {
          newBoard[boardY][boardX] = currentPiece.type;
        }
      }
    });
  });
  return newBoard;
}
