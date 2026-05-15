import { render, cleanup } from "@testing-library/react";
import { TetrisSpectrum } from "@/components/game/tetris-spectrum.tsx";
import { GRID_HEIGHT } from "@red-tetris/shared";

describe("TetrisSpectrum", () => {
  afterEach(() => cleanup());

  it("renders GRID_HEIGHT * spectrum.length cells total", () => {
    // spectrum has 10 columns, GRID_HEIGHT rows → 200 cells
    const spectrum = [5, 4, 12, 3, 1, 0, 18, 3, 4, 2];
    const { container } = render(<TetrisSpectrum spectrum={spectrum} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(GRID_HEIGHT * spectrum.length);
  });

  it("covers both branches of isFilled (filled and unfilled cells)", () => {
    // spectrum=[5] → rows 0-14 unfilled, rows 15-19 filled
    // isFilled(5, 14) = 20-14<=5 = 6<=5 = false
    // isFilled(5, 15) = 20-15<=5 = 5<=5 = true
    const spectrum = [5];
    const { container } = render(<TetrisSpectrum spectrum={spectrum} />);
    const grid = container.firstChild as HTMLElement;
    // Total cells: 20 (GRID_HEIGHT * 1 column)
    expect(grid.children.length).toBe(GRID_HEIGHT);

    // Check that some cells have the filled class and some have unfilled
    let filledCount = 0;
    let unfilledCount = 0;
    Array.from(grid.children).forEach((cell) => {
      const el = cell as HTMLElement;
      if (el.className.includes("bg-gray-600")) {
        filledCount++;
      } else {
        unfilledCount++;
      }
    });
    expect(filledCount).toBe(5);
    expect(unfilledCount).toBe(15);
  });

  it("renders with empty spectrum", () => {
    const { container } = render(<TetrisSpectrum spectrum={[]} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(0);
  });

  it("renders with spectrum of all zeros (all unfilled)", () => {
    const spectrum = [0, 0, 0];
    const { container } = render(<TetrisSpectrum spectrum={spectrum} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(GRID_HEIGHT * spectrum.length);
    // All cells should be unfilled since limitHeight=0 means isFilled always false
    // isFilled(0, x) = 20-x<=0 → only true if heightToCheck>=20, which never happens
    Array.from(grid.children).forEach((cell) => {
      const el = cell as HTMLElement;
      expect(el.className).not.toContain("bg-gray-600");
    });
  });

  it("renders with spectrum of max height (all filled)", () => {
    // limitHeight=20 → isFilled(20, x) = 20-x<=20 always true for x>=0
    const spectrum = [20];
    const { container } = render(<TetrisSpectrum spectrum={spectrum} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(GRID_HEIGHT);
    Array.from(grid.children).forEach((cell) => {
      const el = cell as HTMLElement;
      expect(el.className).toContain("bg-gray-600");
    });
  });
});
