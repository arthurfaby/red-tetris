import { render, screen, cleanup } from "@testing-library/react";
import { PlayerList } from "@/components/room/player-list.tsx";
import type { PlayerListData } from "@red-tetris/shared";

const players: PlayerListData[] = [
  { id: "p1", username: "John Doe", ko: false },
  { id: "p2", username: "Solo", ko: false },
];

describe("PlayerList", () => {
  afterEach(() => cleanup());

  it("renders one entry per player with their username", () => {
    render(<PlayerList players={players} leaderId="p1" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Solo")).toBeInTheDocument();
  });

  it("renders the fallback initials from the first two words of the username", () => {
    render(<PlayerList players={players} leaderId="p1" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("falls back to a single initial for a one-word username", () => {
    render(<PlayerList players={players} leaderId="p1" />);
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("falls back to an empty first initial when the username starts with a space", () => {
    render(
      <PlayerList
        players={[{ id: "p3", username: " John", ko: false }]}
        leaderId="p1"
      />,
    );
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("falls back to an empty second initial when the username has consecutive spaces", () => {
    render(
      <PlayerList
        players={[{ id: "p4", username: "John  Doe", ko: false }]}
        leaderId="p1"
      />,
    );
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("shows the crown badge only for the leader", () => {
    const { container } = render(
      <PlayerList players={players} leaderId="p1" />,
    );
    const crowns = container.querySelectorAll("svg.lucide-crown");
    expect(crowns.length).toBe(1);
  });

  it("renders nothing identifiable as leader when leaderId matches no player", () => {
    const { container } = render(
      <PlayerList players={players} leaderId="unknown" />,
    );
    const crowns = container.querySelectorAll("svg.lucide-crown");
    expect(crowns.length).toBe(0);
  });

  it("renders an empty result for an empty player list", () => {
    const { container } = render(<PlayerList players={[]} leaderId="p1" />);
    expect(container.textContent).toBe("");
  });
});
