import { TetrisBoard } from "@/components/game/tetris-board.tsx";

export function TetrisBoardLayout() {
  return (
    <div className="flex flex-col items-center justify-center border-4 h-full">
      <TetrisBoard />
    </div>
  );
}
