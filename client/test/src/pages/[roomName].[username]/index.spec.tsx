import { render, screen, cleanup } from "@testing-library/react";
import Room from "@/pages/[roomName].[username]/index.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useParams } from "@/router.ts";
import { useSocketLobby } from "@/lib/game/hooks/use-socket-lobby.ts";

vi.mock("@/router.ts", () => ({
  useParams: vi.fn(() => ({ roomName: "test-room", username: "test-user" })),
}));

vi.mock("@/components/game/layout/tetris-game.tsx", () => ({
  TetrisGame: () => <div data-testid="tetris-game" />,
}));

vi.mock("@/lib/game/hooks/use-socket-lobby.ts", () => ({
  useSocketLobby: vi.fn(),
}));

const { mockSocketState } = vi.hoisted(() => ({
  mockSocketState: { socketId: undefined as string | undefined, emit: vi.fn() },
}));

vi.mock("@/lib/stores/use-socket.ts", () => ({
  useSocket: Object.assign(
    (selector: (state: typeof mockSocketState) => unknown) =>
      selector(mockSocketState),
    { getState: () => mockSocketState },
  ),
}));

function renderRoom() {
  return render(<Room />);
}

const defaultLobby = {
  players: [] as import("@red-tetris/shared").PlayerListData[],
  leaderId: "",
  roomName: "test-room",
  errorMessage: "",
  emit: vi.fn(),
  setErrorMessage: vi.fn(),
};

describe("Room page", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    useTetrisStore.setState({
      isPlaying: false,
      isPlayerDead: false,
      isGameOver: false,
      isSoloGame: false,
      winner: null,
    });
    vi.mocked(useParams).mockReturnValue({
      roomName: "test-room",
      username: "test-user",
    });
    vi.mocked(useSocketLobby).mockReturnValue({ ...defaultLobby });
    mockSocketState.socketId = undefined;
  });

  it("renders the lobby when isPlaying is false", () => {
    renderRoom();
    expect(screen.getByText("Red Tetris - test-room")).toBeInTheDocument();
  });

  it("renders TetrisGame when the player is dead but the game is not over", () => {
    useTetrisStore.setState({
      isPlaying: false,
      isPlayerDead: true,
      isGameOver: false,
    });
    renderRoom();
    expect(screen.getByTestId("tetris-game")).toBeInTheDocument();
  });

  it("shows 'You have won' when the current socket is the winner", () => {
    mockSocketState.socketId = "p1";
    useTetrisStore.setState({
      isSoloGame: false,
      winner: { id: "p1", username: "Alice" },
    });
    vi.mocked(useSocketLobby).mockReturnValue({
      ...defaultLobby,
      players: [{ id: "p1", username: "Alice", ko: false }],
      leaderId: "p1",
    });
    renderRoom();
    expect(screen.getByText("You have won !")).toBeInTheDocument();
  });

  it("shows '<username> has won' when another player is the winner", () => {
    mockSocketState.socketId = "p2";
    useTetrisStore.setState({
      isSoloGame: false,
      winner: { id: "p1", username: "Alice" },
    });
    vi.mocked(useSocketLobby).mockReturnValue({
      ...defaultLobby,
      players: [
        { id: "p1", username: "Alice", ko: false },
        { id: "p2", username: "Bob", ko: false },
      ],
      leaderId: "p1",
    });
    renderRoom();
    expect(screen.getByText("Alice has won !")).toBeInTheDocument();
  });

  it("shows the error message when present", () => {
    vi.mocked(useSocketLobby).mockReturnValue({
      ...defaultLobby,
      errorMessage: "Game is already launched",
    });
    renderRoom();
    expect(screen.getByText("Game is already launched")).toBeInTheDocument();
  });
});
