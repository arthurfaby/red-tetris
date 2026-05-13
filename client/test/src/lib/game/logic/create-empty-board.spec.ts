import { describe, expect, it } from "vitest";
import { createEmptyBoard } from "../../../../../src/lib/game/logic/create-empty-board";
import { Tetromino } from "@red-tetris/shared";

describe("is-in-board.ts", () => {
  it("should create empty board", () => {
    const emptyBoard = createEmptyBoard(20, 10);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        expect(emptyBoard[j][i]).toEqual(Tetromino.NONE);
      }
    }
  });
});
