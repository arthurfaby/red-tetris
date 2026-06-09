import { render, cleanup } from "@testing-library/react";
import { TetrisBoard } from "@/components/game/tetris-board.tsx";

const { mockState } = vi.hoisted(() => ({
  mockState: {
    board: Array(20)
      .fill(null)
      .map(() => Array(10).fill(0)),
    currentPiece: { type: 3, x: 4, y: 0, rotation: 0 },
    isPlayerDead: false,
  },
}));

vi.mock("@/lib/stores/use-tetris-store.ts", () => ({
  useTetrisStore: (selector: (state: typeof mockState) => unknown) =>
    selector(mockState),
}));

describe("TetrisBoard", () => {
  afterEach(() => {
    cleanup();
    mockState.isPlayerDead = false;
  });

  it("applies the grayscale class when the player is dead", () => {
    mockState.isPlayerDead = true;
    const { container } = render(<TetrisBoard />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("grayscale");
  });

  it("does not apply the grayscale class when the player is alive", () => {
    const { container } = render(<TetrisBoard />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).not.toContain("grayscale");
  });

  it("renders 200 cells (20 rows x 10 columns)", () => {
    const { container } = render(<TetrisBoard />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(200);
  });

  it("renders a grid container", () => {
    const { container } = render(<TetrisBoard />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
    expect(grid.className).toContain(
      "grid grid-cols-[repeat(10,32px)] grid-rows-[repeat(20,32px)]",
    );
  });
});
