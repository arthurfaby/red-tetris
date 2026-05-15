import { render, screen, cleanup } from "@testing-library/react";
import { TetrisGame } from "@/components/game/layout/tetris-game.tsx";

vi.mock("@/lib/game/hooks/use-keyboard.ts", () => ({
  useKeyboard: vi.fn(),
}));

vi.mock("@/components/game/layout/tetris-info-layout.tsx", () => ({
  TetrisInfoLayout: () => <div data-testid="tetris-info-layout" />,
}));

vi.mock("@/components/game/layout/tetris-board-layout.tsx", () => ({
  TetrisBoardLayout: () => <div data-testid="tetris-board-layout" />,
}));

vi.mock("@/components/game/layout/tetris-spectrums-layout.tsx", () => ({
  TetrisSpectrumsLayout: () => <div data-testid="tetris-spectrums-layout" />,
}));

describe("TetrisGame", () => {
  afterEach(() => cleanup());

  it("renders all three layout sub-components", () => {
    render(<TetrisGame />);
    expect(screen.getByTestId("tetris-info-layout")).toBeInTheDocument();
    expect(screen.getByTestId("tetris-board-layout")).toBeInTheDocument();
    expect(screen.getByTestId("tetris-spectrums-layout")).toBeInTheDocument();
  });

  it("calls useKeyboard on mount", async () => {
    const { useKeyboard } = await import("@/lib/game/hooks/use-keyboard.ts");
    render(<TetrisGame />);
    expect(useKeyboard).toHaveBeenCalled();
  });

  it("renders root container with full-screen background classes", () => {
    const { container } = render(<TetrisGame />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("min-h-screen");
    expect(wrapper.className).toContain("bg-background");
  });
});
