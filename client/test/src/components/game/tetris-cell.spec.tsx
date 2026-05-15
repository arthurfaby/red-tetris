import { render, cleanup } from "@testing-library/react";
import { TetrisCell } from "@/components/game/tetris-cell.tsx";
import { Tetromino } from "@red-tetris/shared";
import { afterEach } from "vitest";

const indexToNameMap = {
  0: "NONE",
  1: "I",
  2: "J",
  3: "L",
  4: "O",
  5: "S",
  6: "T",
  7: "Z",
} as const;

describe("TetrisCell", () => {
  afterEach(() => cleanup());

  it.each([
    [indexToNameMap[Tetromino.NONE], Tetromino.NONE, "bg-transparent"],
    [indexToNameMap[Tetromino.I], Tetromino.I, "bg-cyan-400"],
    [indexToNameMap[Tetromino.J], Tetromino.J, "bg-pink-400"],
    [indexToNameMap[Tetromino.L], Tetromino.L, "bg-orange-400"],
    [indexToNameMap[Tetromino.O], Tetromino.O, "bg-yellow-400"],
    [indexToNameMap[Tetromino.S], Tetromino.S, "bg-red-400"],
    [indexToNameMap[Tetromino.T], Tetromino.T, "bg-purple-400"],
    [indexToNameMap[Tetromino.Z], Tetromino.Z, "bg-green-400"],
  ])("renders correct classes for Tetromino.%s", (_name, type, expectedBg) => {
    const { container } = render(<TetrisCell type={type} />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("size-8");
    expect(el.className).toContain(expectedBg);
  });
});
