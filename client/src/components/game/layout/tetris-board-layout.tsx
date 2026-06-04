import { TetrisBoard } from "@/components/game/tetris-board.tsx";

export function TetrisBoardLayout() {
  return (
    <div className="flex items-center justify-center shrink-0">
      <div className="border-4 [zoom:0.72] sm:[zoom:0.85] md:[zoom:0.95] lg:[zoom:1]">
        <TetrisBoard />
      </div>
    </div>
  );
}
