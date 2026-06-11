import { render, cleanup, act } from "@testing-library/react";
import { useSocketLobby } from "@/lib/game/hooks/use-socket-lobby.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useParams } from "@/router.ts";
import { JOIN_GAME_STATUS, Tetromino } from "@red-tetris/shared";
import { toast } from "sonner";

vi.mock("@/router.ts", () => ({
  useParams: vi.fn(() => ({ roomName: "room-1", username: "Alice" })),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const { mockListen, mockOff, mockEmit } = vi.hoisted(() => ({
  mockListen: vi.fn(),
  mockOff: vi.fn(),
  mockEmit: vi.fn(),
}));

vi.mock("@/lib/stores/use-socket.ts", () => {
  const mockState = {
    listen: mockListen,
    off: mockOff,
    emit: mockEmit,
    socketId: "socket-1",
  };
  return {
    useSocket: (selector: (state: typeof mockState) => unknown) =>
      selector(mockState),
  };
});

const mockStartGame = vi.fn();
const mockSetRoom = vi.fn();
const mockSetGameOver = vi.fn();

let lastResult: ReturnType<typeof useSocketLobby> | null = null;

function TestComponent() {
  lastResult = useSocketLobby();
  return null;
}

function getHandler<T extends (...args: never[]) => void>(event: string) {
  const call = mockListen.mock.calls.find(([e]) => e === event);
  return call?.[1] as T | undefined;
}

describe("useSocketLobby", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    vi.clearAllMocks();
    lastResult = null;
    vi.mocked(useParams).mockReturnValue({
      roomName: "room-1",
      username: "Alice",
    });
    useTetrisStore.setState({
      startGame: mockStartGame,
      setRoom: mockSetRoom,
      setGameOver: mockSetGameOver,
    });
  });

  it("registers all listeners and joins the room on mount", () => {
    render(<TestComponent />);
    expect(mockSetRoom).toHaveBeenCalledWith("room-1");
    expect(mockEmit).toHaveBeenCalledWith("join_game", {
      gameId: "room-1",
      username: "Alice",
    });
    const events = mockListen.mock.calls.map(([event]) => event);
    expect(events).toEqual(
      expect.arrayContaining([
        "start_piece",
        "set_leader",
        "player_list",
        "join_game",
        "game_over",
      ]),
    );
  });

  it("does nothing when roomName is missing", () => {
    vi.mocked(useParams).mockReturnValue({ roomName: "", username: "Alice" });
    render(<TestComponent />);
    expect(mockSetRoom).not.toHaveBeenCalled();
    expect(mockListen).not.toHaveBeenCalled();
  });

  it("starts the game with the latest player list when start_piece is received", () => {
    render(<TestComponent />);
    const players = [{ id: "p1", username: "Alice", ko: false }];

    act(() => {
      getHandler<(list: typeof players) => void>("player_list")?.(players);
    });
    getHandler<(start: number, next: number) => void>("start_piece")?.(
      Tetromino.I,
      Tetromino.O,
    );

    expect(mockStartGame).toHaveBeenCalledWith(
      Tetromino.I,
      Tetromino.O,
      players,
    );
  });

  it("updates leaderId when set_leader is received", () => {
    render(<TestComponent />);
    act(() => {
      getHandler<(id: string) => void>("set_leader")?.("p1");
    });
    expect(lastResult?.leaderId).toBe("p1");
  });

  it("updates the player list when player_list is received", () => {
    render(<TestComponent />);
    const players = [{ id: "p1", username: "Alice", ko: false }];
    act(() => {
      getHandler<(list: typeof players) => void>("player_list")?.(players);
    });
    expect(lastResult?.players).toEqual(players);
  });

  it("shows a success toast when the game is joined", () => {
    render(<TestComponent />);
    act(() => {
      getHandler<(status: number) => void>("join_game")?.(
        JOIN_GAME_STATUS.JOINED,
      );
    });
    expect(toast.success).toHaveBeenCalledWith("Game joined successfully");
  });

  it("shows a success toast when the game is created", () => {
    render(<TestComponent />);
    act(() => {
      getHandler<(status: number) => void>("join_game")?.(
        JOIN_GAME_STATUS.CREATED,
      );
    });
    expect(toast.success).toHaveBeenCalledWith("Game created successfully");
  });

  it("shows an error toast and sets errorMessage when the game is already launched", () => {
    render(<TestComponent />);
    act(() => {
      getHandler<(status: number) => void>("join_game")?.(
        JOIN_GAME_STATUS.ALREADY_LAUNCHED,
      );
    });
    expect(toast.error).toHaveBeenCalledWith("Game is already launched");
    expect(lastResult?.errorMessage).toBe("Game is already launched");
  });

  it("shows a generic error toast for an unknown join_game status", () => {
    render(<TestComponent />);
    act(() => {
      getHandler<(status: number) => void>("join_game")?.(JOIN_GAME_STATUS.ERROR);
    });
    expect(toast.error).toHaveBeenCalledWith("Error has occurred");
  });

  it("forwards the game_over payload to setGameOver", () => {
    render(<TestComponent />);
    const payload = { id: "p1", username: "Winner" };
    getHandler<(p: { id: string; username: string }) => void>("game_over")?.(payload);
    expect(mockSetGameOver).toHaveBeenCalledWith(payload);
  });

  it("leaves the room and unsubscribes from listeners on unmount", () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(mockEmit).toHaveBeenCalledWith("leave_game", "room-1");
    const offEvents = mockOff.mock.calls.map(([event]) => event);
    expect(offEvents).toEqual(
      expect.arrayContaining([
        "start_piece",
        "set_leader",
        "player_list",
        "join_game",
      ]),
    );
  });
});
