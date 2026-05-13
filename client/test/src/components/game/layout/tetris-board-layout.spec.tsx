import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => cleanup());
import { TetrisBoardLayout } from "@/components/game/layout/tetris-board-layout.tsx";

vi.mock("@/components/game/tetris-board.tsx", () => ({
  TetrisBoard: () => <div data-testid="tetris-board" />,
}));

describe("TetrisBoardLayout", () => {
  it("renders TetrisBoard inside a container div", () => {
    render(<TetrisBoardLayout />);
    expect(screen.getByTestId("tetris-board")).toBeDefined();
  });

  it("renders a container with flex layout classes", () => {
    const { container } = render(<TetrisBoardLayout />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("border-4");
  });
});
