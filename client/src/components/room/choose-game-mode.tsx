import { GAME_MODES, type GameMode } from "@red-tetris/shared";
import { cn } from "@/lib/utils.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";

const GAME_MODES_INFO: Record<
  GameMode,
  { styles: string; displayText: string }
> = {
  DEFAULT: {
    styles:
      " text-foreground hover:bg-green-500/5 hover:border-green-500 hover:text-green-500 data-[selected=true]:text-green-500 data-[selected=true]:border-green-500 border border-foreground",
    displayText: "Default",
  },
  ACCELERATED_GRAVITY: {
    styles:
      " text-foreground hover:bg-orange-500/5 hover:border-orange-500 hover:text-orange-500 data-[selected=true]:text-orange-500 data-[selected=true]:border-orange-500 border border-foreground",
    displayText: "Accelerated Gravity",
  },
  SWAP_PIECES: {
    styles:
      " text-foreground hover:bg-blue-500/5 hover:border-blue-500 hover:text-blue-500 data-[selected=true]:text-blue-500 data-[selected=true]:border-blue-500 border border-foreground",
    displayText: "Swap Pieces",
  },
};

interface GameModeProps {
  gameMode: GameMode;
  selected: boolean;
}

function GameModeOption({ gameMode, selected }: GameModeProps) {
  return (
    <div
      className={cn(
        "w-30 h-10 grow flex justify-center items-center rounded-sm",
        GAME_MODES_INFO[gameMode].styles,
      )}
      data-selected={selected}
      onClick={() => {
        useSocket.getState().emit("change_game_mode", gameMode);
      }}
    >
      <div className={cn("flex justify-center items-center")}>
        <span className="text-sm text-center ">
          {GAME_MODES_INFO[gameMode].displayText}
        </span>
      </div>
    </div>
  );
}

export function ChooseGameMode() {
  const gameModes: GameMode[] = Object.values(GAME_MODES);
  const selectedGameMode = useTetrisStore((state) => state.gameMode);

  return (
    <div className="flex flex-wrap gap-4">
      {gameModes.map((gameMode) => (
        <GameModeOption
          key={gameMode}
          gameMode={gameMode}
          selected={selectedGameMode === gameMode}
        />
      ))}
    </div>
  );
}
