import { render, cleanup } from "@testing-library/react";
import { TetrisNextPiece } from "@/components/game/tetris-next-piece.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { Tetromino } from "@red-tetris/shared";
import { expect } from "vitest";

describe("TetrisNextPiece", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    useTetrisStore.setState({ isPlayerDead: false });
  });

  it("applies the grayscale class when the player is dead", () => {
    useTetrisStore.setState({ isPlayerDead: true });
    const { container } = render(<TetrisNextPiece type={Tetromino.O} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("grayscale");
  });

  it("does not apply the grayscale class when the player is alive", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.O} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).not.toContain("grayscale");
  });

  it("renders a grid for Tetromino.I (has empty rows filtered out)", () => {
    // I shape[0] = [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]
    // after filter: [[1,1,1,1]] — 1 row x 4 cols = 4 cells
    const { container } = render(<TetrisNextPiece type={Tetromino.I} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
    expect(grid.children.length).toBe(4);
  });

  it("renders a grid for Tetromino.O (no empty rows)", () => {
    // O shape[0] = [[4,4],[4,4]] — all rows non-empty, filter keeps both
    // 2 rows x 2 cols = 4 cells
    const { container } = render(<TetrisNextPiece type={Tetromino.O} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
    expect(grid.children.length).toBe(4);
  });

  it("renders a grid for Tetromino.L (mixed empty and non-empty rows)", () => {
    // L shape[0] = [[0,0,3],[3,3,3],[0,0,0]]
    // after filter: [[0,0,3],[3,3,3]] — 2 rows x 3 cols = 6 cells
    const { container } = render(<TetrisNextPiece type={Tetromino.L} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
    expect(grid.children.length).toBe(6);
  });

  it("renders cells with size-8 class", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.O} />);
    const cells = container.querySelectorAll(".size-8");
    const grid = container.firstChild as HTMLElement;
    expect(cells.length).toBeGreaterThan(0);
    expect(grid.children.length).toBe(4);
  });

  it("renders for Tetromino.J", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.J} />);
    const grid = container.firstChild as HTMLElement;
    expect(container.firstChild).toBeInTheDocument();
    expect(grid.children.length).toBe(6);
  });

  it("renders for Tetromino.S", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.S} />);
    const grid = container.firstChild as HTMLElement;
    expect(container.firstChild).toBeInTheDocument();
    expect(grid.children.length).toBe(6);
  });

  it("renders for Tetromino.T", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.T} />);
    const grid = container.firstChild as HTMLElement;
    expect(container.firstChild).toBeInTheDocument();
    expect(grid.children.length).toBe(6);
  });

  it("renders for Tetromino.Z", () => {
    const { container } = render(<TetrisNextPiece type={Tetromino.Z} />);
    const grid = container.firstChild as HTMLElement;
    expect(container.firstChild).toBeInTheDocument();
    expect(grid.children.length).toBe(6);
  });
});
