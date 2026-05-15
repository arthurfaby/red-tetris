import type { TetrominoState } from "@/lib/stores/use-tetris-store.ts";
import { Tetromino } from "@red-tetris/shared";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { getBoardWithCurrentPiece } from "@/lib/game/logic/get-board-with-current-piece.ts";

describe("get-board-with-current-piece.ts", () => {
  it("should merge tetromino", () => {
    const currentPiece: TetrominoState = {
      rotation: 0,
      y: 0,
      x: 4,
      type: Tetromino.J,
    };
    const emptyBoard = createEmptyBoard(20, 10);
    const board = getBoardWithCurrentPiece(emptyBoard, currentPiece);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        if (
          (j === 0 && i === 4) ||
          (j === 1 && i === 4) ||
          (j === 1 && i === 5) ||
          (j === 1 && i === 6)
        ) {
          expect(board[j][i]).toEqual(Tetromino.J);
        } else {
          expect(board[j][i]).toEqual(Tetromino.NONE);
        }
      }
    }
  });

  it("should do nothing", () => {
    const currentPiece: TetrominoState = {
      rotation: 0,
      y: 20,
      x: 10,
      type: Tetromino.J,
    };
    const emptyBoard = createEmptyBoard(20, 10);
    const board = getBoardWithCurrentPiece(emptyBoard, currentPiece);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        expect(board[j][i]).toEqual(Tetromino.NONE);
      }
    }
  });
});
