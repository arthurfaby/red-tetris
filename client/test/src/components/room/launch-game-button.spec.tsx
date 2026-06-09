import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { LaunchGameButton } from "@/components/room/launch-game-button.tsx";

const { mockEmit } = vi.hoisted(() => ({ mockEmit: vi.fn() }));

vi.mock("@/lib/stores/use-socket.ts", () => ({
  useSocket: { getState: () => ({ emit: mockEmit }) },
}));

describe("LaunchGameButton", () => {
  afterEach(() => cleanup());
  beforeEach(() => mockEmit.mockClear());

  it("renders an enabled 'Start game' button for the leader", () => {
    render(
      <LaunchGameButton leaderId="p1" socketId="p1" roomName="room-1" />,
    );
    const button = screen.getByText("Start game");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("emits start_game with the room name when the leader clicks the button", () => {
    render(
      <LaunchGameButton leaderId="p1" socketId="p1" roomName="room-1" />,
    );
    fireEvent.click(screen.getByText("Start game"));
    expect(mockEmit).toHaveBeenCalledWith("start_game", "room-1");
  });

  it("renders a disabled 'Waiting for launch...' button for non-leaders", () => {
    render(
      <LaunchGameButton leaderId="p1" socketId="p2" roomName="room-1" />,
    );
    const button = screen.getByText("Waiting for launch...");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockEmit).not.toHaveBeenCalled();
  });

  it("renders the waiting state when socketId is undefined", () => {
    render(<LaunchGameButton leaderId="p1" roomName="room-1" />);
    expect(screen.getByText("Waiting for launch...")).toBeInTheDocument();
  });
});
