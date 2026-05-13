import { describe, expect, it } from "vitest";
import { isInBoard } from "../../../../../src/lib/game/logic/is-in-board";
import { GRID_HEIGHT, GRID_WIDTH } from "@red-tetris/shared";

describe("is-in-board.ts", () => {
  it("should be in board", () => {
    expect(isInBoard(0, 0)).toEqual(true);
    expect(isInBoard(GRID_WIDTH - 1, GRID_HEIGHT - 1)).toEqual(true);
  });

  it("should not be in board", () => {
    expect(isInBoard(-1, 0)).toEqual(false);
    expect(isInBoard(0, -1)).toEqual(false);
    expect(isInBoard(GRID_WIDTH, 0)).toEqual(false);
    expect(isInBoard(0, GRID_HEIGHT)).toEqual(false);
  });
});
