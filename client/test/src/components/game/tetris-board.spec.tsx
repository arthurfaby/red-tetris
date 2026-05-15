import { render, cleanup } from "@testing-library/react";
import { TetrisBoard } from "@/components/game/tetris-board.tsx";

const { mockStartGame } = vi.hoisted(() => {
  return { mockStartGame: vi.fn() };
});

vi.mock("@/lib/stores/use-tetris-store.ts", () => {
  const mockState = {
    board: Array(20)
      .fill(null)
      .map(() => Array(10).fill(0)),
    currentPiece: { type: 3, x: 4, y: 0, rotation: 0 },
    startGame: mockStartGame,
  };
  return {
    useTetrisStore: (selector: (state: typeof mockState) => unknown) =>
      selector(mockState),
  };
});

describe("TetrisBoard", () => {
  afterEach(() => cleanup());

  it("renders 200 cells (20 rows x 10 columns)", () => {
    const { container } = render(<TetrisBoard />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.children.length).toBe(200);
  });

  it("calls startGame on render", () => {
    mockStartGame.mockClear();
    render(<TetrisBoard />);
    expect(mockStartGame).toHaveBeenCalled();
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
