import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { TetrisCell } from "@/components/game/tetris-cell.tsx";
import { Tetromino } from "@red-tetris/shared";

afterEach(() => cleanup());

describe("TetrisCell", () => {
  it("renders a div for Tetromino.NONE", () => {
    const { container } = render(<TetrisCell type={Tetromino.NONE} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders a div for Tetromino.I", () => {
    const { container } = render(<TetrisCell type={Tetromino.I} />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("size-8");
  });

  it("renders a div for Tetromino.J", () => {
    const { container } = render(<TetrisCell type={Tetromino.J} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders a div for Tetromino.L", () => {
    const { container } = render(<TetrisCell type={Tetromino.L} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders a div for Tetromino.O", () => {
    const { container } = render(<TetrisCell type={Tetromino.O} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders a div for Tetromino.S", () => {
    const { container } = render(<TetrisCell type={Tetromino.S} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders a div for Tetromino.T", () => {
    const { container } = render(<TetrisCell type={Tetromino.T} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders a div for Tetromino.Z", () => {
    const { container } = render(<TetrisCell type={Tetromino.Z} />);
    expect(container.firstChild).toBeDefined();
  });
});
