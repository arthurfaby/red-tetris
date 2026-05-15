import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { Tetromino } from "@red-tetris/shared";

describe("create-empty-board.ts", () => {
  it("should create empty board", () => {
    const emptyBoard = createEmptyBoard(20, 10);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        expect(emptyBoard[j][i]).toEqual(Tetromino.NONE);
      }
    }
  });
});
