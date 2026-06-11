import { getBoardWithPenaltyLines } from "@/lib/game/logic/get-board-with-penalty-lines.ts";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { GRID_HEIGHT, GRID_WIDTH, Tetromino } from "@red-tetris/shared";

describe("get-board-with-penalty-lines.ts", () => {
  it("appends the requested number of penalty lines at the bottom", () => {
    const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
    const result = getBoardWithPenaltyLines(board, 2);

    expect(result).toHaveLength(GRID_HEIGHT);
    expect(
      result[GRID_HEIGHT - 1].every((cell) => cell === Tetromino.PENALTY),
    ).toBe(true);
    expect(
      result[GRID_HEIGHT - 2].every((cell) => cell === Tetromino.PENALTY),
    ).toBe(true);
    expect(
      result[GRID_HEIGHT - 3].every((cell) => cell === Tetromino.NONE),
    ).toBe(true);
  });

  it("drops the topmost rows so the board keeps a fixed height", () => {
    const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
    board[0] = new Array(GRID_WIDTH).fill(Tetromino.I);

    const result = getBoardWithPenaltyLines(board, 1);

    expect(result).toHaveLength(GRID_HEIGHT);
    expect(result[0].every((cell) => cell === Tetromino.NONE)).toBe(true);
    expect(
      result[GRID_HEIGHT - 1].every((cell) => cell === Tetromino.PENALTY),
    ).toBe(true);
  });

  it("returns the board unchanged (besides slicing) when adding zero penalty lines", () => {
    const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
    const result = getBoardWithPenaltyLines(board, 0);
    expect(result).toEqual(board);
  });
});
