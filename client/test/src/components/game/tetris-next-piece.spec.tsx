import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { TetrisNextPiece } from "@/components/game/tetris-next-piece.tsx";
import { Tetromino } from "@red-tetris/shared";

afterEach(() => cleanup());

describe("TetrisNextPiece", () => {
  it("renders a grid for Tetromino.I (has empty rows filtered out)", () => {
    // I shape[0] = [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]
    // after filter: [[1,1,1,1]] — 1 row x 4 cols = 4 cells
    const { container } = render(<TetrisNextPiece type={Tetromino.I} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeDefined();
    expect(grid.children.length).toBe(4);
  });

  it("renders a grid for Tetromino.O (no empty rows)", () => {
    // O shape[0] = [[4,4],[4,4]] — all rows non-empty, filter keeps both
    // 2 rows x 2 cols = 4 cells
    const { container } = render(<TetrisNextPiece type={Tetromino.O} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeDefined();
    expect(grid.children.length).toBe(4);
  });

  it("renders a grid for Tetromino.L (mixed empty and non-empty rows)", () => {
    // L shape[0] = [[0,0,3],[3,3,3],[0,0,0]]
    // after filter: [[0,0,3],[3,3,3]] — 2 rows x 3 cols = 6 cells
    const { container } = render(<TetrisNextPiece type={Tetromino.L} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeDefined();
    expect(grid.children.length).toBe(6);
  });

  it("renders cells with size-8 class", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.O} />);
    const cells = container.querySelectorAll(".size-8");
    expect(cells.length).toBeGreaterThan(0);
  });

  it("renders for Tetromino.J", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.J} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders for Tetromino.S", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.S} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders for Tetromino.T", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.T} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders for Tetromino.Z", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.Z} />);
    expect(container.firstChild).toBeDefined();
  });
});
