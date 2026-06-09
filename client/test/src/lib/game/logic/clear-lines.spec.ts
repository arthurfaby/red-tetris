import { clearLines } from "@/lib/game/logic/clear-lines.ts";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { GRID_HEIGHT, GRID_WIDTH, Tetromino } from "@red-tetris/shared";

describe("clear-lines.ts", () => {
  it("keeps the board unchanged when no line is full", () => {
    const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
    board[GRID_HEIGHT - 1][0] = Tetromino.I;

    const result = clearLines(board);

    expect(result).toHaveLength(GRID_HEIGHT);
    expect(result[GRID_HEIGHT - 1][0]).toBe(Tetromino.I);
  });

  it("removes full lines and prepends empty rows to keep the board height", () => {
    const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
    board[GRID_HEIGHT - 1] = new Array(GRID_WIDTH).fill(Tetromino.I);
    board[GRID_HEIGHT - 2] = new Array(GRID_WIDTH).fill(Tetromino.J);

    const result = clearLines(board);

    expect(result).toHaveLength(GRID_HEIGHT);
    expect(result[0].every((cell) => cell === Tetromino.NONE)).toBe(true);
    expect(result[1].every((cell) => cell === Tetromino.NONE)).toBe(true);
    expect(
      result.slice(2).every((row) => row.every((cell) => cell === Tetromino.NONE)),
    ).toBe(true);
  });
});
