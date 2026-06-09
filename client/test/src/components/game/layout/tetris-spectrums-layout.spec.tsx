import { render, screen, cleanup } from "@testing-library/react";
import { TetrisSpectrumsLayout } from "@/components/game/layout/tetris-spectrums-layout.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

const mockSpectrum = [5, 4, 12, 3, 1, 0, 18, 3, 4, 2];
const mockOpponents = Array.from({ length: 8 }, (_, i) => ({
  id: `player-${i + 1}`,
  username: `Joueur ${i + 1}`,
  ko: i >= 6,
  spectrum: mockSpectrum,
}));

vi.mock("@/components/game/tetris-spectrum.tsx", () => ({
  TetrisSpectrum: ({ spectrum }: { spectrum: number[] }) => (
    <div data-testid="tetris-spectrum" data-spectrum={spectrum.join(",")} />
  ),
}));

vi.mock("@/components/ui/card.tsx", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

vi.mock("@/components/ui/badge.tsx", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="badge">{children}</span>
  ),
}));

describe("TetrisSpectrumsLayout", () => {
  beforeEach(() => {
    useTetrisStore.setState({ opponents: mockOpponents });
  });
  afterEach(() => cleanup());

  it("renders 8 opponent slots", () => {
    render(<TetrisSpectrumsLayout />);
    const spectrums = screen.getAllByTestId("tetris-spectrum");
    expect(spectrums).toHaveLength(8);
  });

  it("renders player labels from 'Joueur 1' to 'Joueur 8'", () => {
    render(<TetrisSpectrumsLayout />);
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(`Joueur ${i}`)).toBeInTheDocument();
    }
  });

  it("renders 'Adversaires' section title", () => {
    render(<TetrisSpectrumsLayout />);
    expect(screen.getByText("Adversaires")).toBeInTheDocument();
  });

  it("renders the badge with opponent count", () => {
    render(<TetrisSpectrumsLayout />);
    expect(screen.getByTestId("badge").textContent).toBe("6 en vie");
  });

  it("passes the correct spectrum data to each TetrisSpectrum", () => {
    render(<TetrisSpectrumsLayout />);
    const spectrums = screen.getAllByTestId("tetris-spectrum");
    const expectedSpectrum = "5,4,12,3,1,0,18,3,4,2";
    spectrums.forEach((el) => {
      expect(el.getAttribute("data-spectrum")).toBe(expectedSpectrum);
    });
  });
});
