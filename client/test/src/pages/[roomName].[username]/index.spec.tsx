import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

afterEach(() => cleanup());

vi.mock("@/router.ts", () => ({
  useParams: vi.fn(() => ({ roomName: "test-room", username: "test-user" })),
}));

vi.mock("@/components/game/layout/tetris-game.tsx", () => ({
  TetrisGame: () => <div data-testid="tetris-game" />,
}));

let useStateOverride: (() => [string[], (v: string[]) => void]) | null = null;

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (args: unknown) => {
      if (useStateOverride) {
        const override = useStateOverride;
        useStateOverride = null;
        return override();
      }
      return actual.useState(args);
    },
  };
});

import Room from "@/pages/[roomName].[username]/index.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useParams } from "@/router.ts";

function renderRoom() {
  return render(<Room />);
}

describe("Room page", () => {
  beforeEach(() => {
    useTetrisStore.setState({ isPlaying: false });
    vi.mocked(useParams).mockReturnValue({
      roomName: "test-room",
      username: "test-user",
    });
    useStateOverride = null;
  });

  it("renders the lobby when isPlaying is false", () => {
    renderRoom();
    expect(screen.getByText("Red Tetris - test-room")).toBeDefined();
  });

  it("renders TetrisGame when isPlaying is true", () => {
    useTetrisStore.setState({ isPlaying: true });
    renderRoom();
    expect(screen.getByTestId("tetris-game")).toBeDefined();
  });

  it("displays the roomName in the header", () => {
    renderRoom();
    expect(screen.getByText("Red Tetris - test-room")).toBeDefined();
  });

  it("lists players including the added username", () => {
    renderRoom();
    expect(screen.getByText("Player 1")).toBeDefined();
    expect(screen.getByText("Player 2")).toBeDefined();
    expect(screen.getByText("Player 3")).toBeDefined();
    expect(screen.getByText("Player 4")).toBeDefined();
    expect(screen.getByText("test-user")).toBeDefined();
  });

  it("does not add duplicate username (username already in list)", () => {
    vi.mocked(useParams).mockReturnValueOnce({
      roomName: "test-room",
      username: "Player 1",
    });
    renderRoom();
    const playerElements = screen.getAllByText("Player 1");
    expect(playerElements.length).toBe(1);
  });

  it("start game button calls startGame", () => {
    const startGame = vi.fn();
    useTetrisStore.setState({ isPlaying: false, startGame });
    renderRoom();
    fireEvent.click(screen.getByText("Start game"));
    expect(startGame).toHaveBeenCalledTimes(1);
  });

  it("shows error message when users list is empty", () => {
    useStateOverride = () => [[], vi.fn()];
    renderRoom();
    expect(screen.getByText("ERROR. SHOULD NOT HAPPEN.")).toBeDefined();
  });

  it("handles username with no space (covers ?? empty string fallback for single-word usernames)", () => {
    // Username with empty string triggers the `?? ""` fallback for userSplit[0].at(0)
    vi.mocked(useParams).mockReturnValueOnce({
      roomName: "test-room",
      username: "",
    });
    renderRoom();
    // The empty username is added to the list - just check the component renders
    expect(screen.getByText("Red Tetris - test-room")).toBeDefined();
  });
});
