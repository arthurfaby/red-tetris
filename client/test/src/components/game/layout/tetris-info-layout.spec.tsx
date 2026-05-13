import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => cleanup());
import { TetrisInfoLayout } from "@/components/game/layout/tetris-info-layout.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { Tetromino } from "@red-tetris/shared";

vi.mock("@/components/game/tetris-next-piece.tsx", () => ({
  TetrisNextPiece: ({ type }: { type: string }) => (
    <div data-testid="tetris-next-piece" data-type={type} />
  ),
}));

vi.mock("@/components/ui/card.tsx", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
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

vi.mock("@/components/ui/separator.tsx", () => ({
  Separator: () => <hr data-testid="separator" />,
}));

describe("TetrisInfoLayout", () => {
  beforeEach(() => {
    useTetrisStore.setState({ nextPiece: Tetromino.I });
  });

  it("renders TetrisNextPiece with the nextPiece from store", () => {
    render(<TetrisInfoLayout />);
    const nextPieceEl = screen.getByTestId("tetris-next-piece");
    expect(nextPieceEl).toBeDefined();
    expect(nextPieceEl.getAttribute("data-type")).toBe(String(Tetromino.I));
  });

  it("displays static score and lines labels", () => {
    render(<TetrisInfoLayout />);
    expect(screen.getByText("Score")).toBeDefined();
    expect(screen.getByText("Lignes")).toBeDefined();
    expect(screen.getByText("000000")).toBeDefined();
    expect(screen.getByText("0")).toBeDefined();
  });

  it("displays 'Suivante' section title", () => {
    render(<TetrisInfoLayout />);
    expect(screen.getByText("Suivante")).toBeDefined();
  });

  it("renders with a different nextPiece from store", () => {
    useTetrisStore.setState({ nextPiece: Tetromino.Z });
    render(<TetrisInfoLayout />);
    const nextPieceEl = screen.getByTestId("tetris-next-piece");
    expect(nextPieceEl.getAttribute("data-type")).toBe(String(Tetromino.Z));
  });
});
