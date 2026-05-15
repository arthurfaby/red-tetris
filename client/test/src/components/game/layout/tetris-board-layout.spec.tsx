import { render, screen, cleanup } from "@testing-library/react";
import { TetrisBoardLayout } from "@/components/game/layout/tetris-board-layout.tsx";

vi.mock("@/components/game/tetris-board.tsx", () => ({
  TetrisBoard: () => <div data-testid="tetris-board" />,
}));

describe("TetrisBoardLayout", () => {
  afterEach(() => cleanup());

  it("renders TetrisBoard inside a container div", () => {
    render(<TetrisBoardLayout />);
    expect(screen.getByTestId("tetris-board")).toBeInTheDocument();
  });

  it("renders a container with flex layout classes", () => {
    const { container } = render(<TetrisBoardLayout />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("border-4");
  });
});
