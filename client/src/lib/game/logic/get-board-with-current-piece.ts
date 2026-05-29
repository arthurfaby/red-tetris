import type {
  BoardState,
  TetrominoState,
} from "@/lib/stores/use-tetris-store.ts";
import { Tetromino, TETROMINOS } from "@red-tetris/shared";
import { isInBoard } from "@/lib/game/logic/is-in-board.ts";

export function getBoardWithCurrentPiece(
  board: BoardState,
  currentPiece: TetrominoState,
) {
  const newBoard = board.map((row) => [...row]);
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
