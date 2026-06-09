import { useKeyboard } from "@/lib/game/hooks/use-keyboard.ts";
import { TetrisInfoLayout } from "@/components/game/layout/tetris-info-layout.tsx";
import { TetrisBoardLayout } from "@/components/game/layout/tetris-board-layout.tsx";
import { TetrisSpectrumsLayout } from "@/components/game/layout/tetris-spectrums-layout.tsx";
import { useSocketGame } from "@/lib/game/hooks/use-socket-game.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

export function TetrisGame() {
  const isSoloGame = useTetrisStore((state) => state.isSoloGame);

  useKeyboard();
  useSocketGame();

  return (
    <div className="h-svh w-screen bg-background text-foreground flex flex-col items-center justify-center gap-3 p-3 overflow-hidden lg:flex-row lg:items-center lg:gap-8 lg:p-6">
      <TetrisInfoLayout />
      <div className="flex flex-row items-stretch justify-center gap-3 w-full min-h-0 lg:w-auto lg:contents">
        <TetrisBoardLayout />
        {!isSoloGame && <TetrisSpectrumsLayout />}
      </div>
    </div>
  );
}
