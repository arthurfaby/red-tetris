import { useKeyboard } from "@/lib/game/hooks/use-keyboard.ts";
import { TetrisInfoLayout } from "@/components/game/layout/tetris-info-layout.tsx";
import { TetrisBoardLayout } from "@/components/game/layout/tetris-board-layout.tsx";
import { TetrisSpectrumsLayout } from "@/components/game/layout/tetris-spectrums-layout.tsx";
import { useSocketGame } from "@/lib/game/hooks/use-socket-game.ts";

export function TetrisGame() {
  useKeyboard();
  useSocketGame();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="flex flex-col h-160 lg:flex-row items-start gap-6 lg:gap-10">
        <TetrisInfoLayout />
        <TetrisBoardLayout />
        <TetrisSpectrumsLayout />
      </div>
    </div>
  );
}
