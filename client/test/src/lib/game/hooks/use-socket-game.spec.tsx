import { render, cleanup } from "@testing-library/react";
import { useSocketGame } from "@/lib/game/hooks/use-socket-game.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { Tetromino } from "@red-tetris/shared";

const { mockListen, mockOff } = vi.hoisted(() => ({
  mockListen: vi.fn(),
  mockOff: vi.fn(),
}));

vi.mock("@/lib/stores/use-socket.ts", () => {
  const mockState = { listen: mockListen, off: mockOff };
  return {
    useSocket: (selector: (state: typeof mockState) => unknown) =>
      selector(mockState),
  };
});

const mockSetOpponent = vi.fn();
const mockSetNextPiece = vi.fn();
const mockAddPenaltyLines = vi.fn();
const mockSetKo = vi.fn();

function TestComponent() {
  useSocketGame();
  return null;
}

function getHandler<T extends (...args: never[]) => void>(event: string) {
  const call = mockListen.mock.calls.find(([e]) => e === event);
  return call?.[1] as T | undefined;
}

describe("useSocketGame", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    vi.clearAllMocks();
    useTetrisStore.setState({
      setOpponent: mockSetOpponent,
      setNextPiece: mockSetNextPiece,
      addPenaltyLines: mockAddPenaltyLines,
      setKo: mockSetKo,
    });
  });

  it("subscribes to the relevant socket events on mount", () => {
    render(<TestComponent />);
    const events = mockListen.mock.calls.map(([event]) => event);
    expect(events).toEqual(
      expect.arrayContaining([
        "player_spectrum",
        "next_piece",
        "penalty_lines",
        "ko",
      ]),
    );
  });

  it("forwards player_spectrum events to setOpponent", () => {
    render(<TestComponent />);
    getHandler<(id: string, spectrum: number[]) => void>("player_spectrum")?.(
      "p1",
      [1, 2, 3],
    );
    expect(mockSetOpponent).toHaveBeenCalledWith("p1", [1, 2, 3]);
  });

  it("forwards next_piece events to setNextPiece", () => {
    render(<TestComponent />);
    getHandler<(piece: number) => void>("next_piece")?.(Tetromino.T);
    expect(mockSetNextPiece).toHaveBeenCalledWith(Tetromino.T);
  });

  it("forwards penalty_lines events to addPenaltyLines", () => {
    render(<TestComponent />);
    getHandler<(lines: number) => void>("penalty_lines")?.(2);
    expect(mockAddPenaltyLines).toHaveBeenCalledWith(2);
  });

  it("forwards ko events to setKo", () => {
    render(<TestComponent />);
    getHandler<(id: string) => void>("ko")?.("p1");
    expect(mockSetKo).toHaveBeenCalledWith("p1");
  });

  it("unsubscribes from socket events on unmount", () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    const events = mockOff.mock.calls.map(([event]) => event);
    expect(events).toEqual(
      expect.arrayContaining([
        "player_spectrum",
        "next_piece",
        "penalty_lines",
      ]),
    );
  });
});
