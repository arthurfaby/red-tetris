import { GAME_MODES, type GameMode } from "@red-tetris/shared";
import { cn } from "@/lib/utils.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

const GAME_MODES_INFO: Record<
  GameMode,
  {
    defaultStyles: string;
    leaderStyles: string;
    displayText: string;
    tooltip: string;
  }
> = {
  DEFAULT: {
    defaultStyles:
      "text-foreground data-[selected=true]:text-green-500 data-[selected=true]:border-green-500 border border-foreground",
    leaderStyles:
      "  hover:bg-green-500/5 hover:border-green-500 hover:text-green-500 ",
    displayText: "Default",
    tooltip:
      "Default game mode of Red Tetris. Speed of 1 second between ticks.",
  },
  ACCELERATED_GRAVITY: {
    defaultStyles:
      "text-foreground data-[selected=true]:text-orange-500 data-[selected=true]:border-orange-500 border border-foreground",
    leaderStyles:
      "hover:bg-orange-500/5 hover:border-orange-500 hover:text-orange-500 ",
    displayText: "Accelerated Gravity",
    tooltip:
      "Accelerated Gravity game mode of Red Tetris. As the number of lines cleared will increase, the speed will vary from 1 second to 150 ms.",
  },
  SWAP_PIECES: {
    defaultStyles:
      "text-foreground data-[selected=true]:text-blue-500 data-[selected=true]:border-blue-500 border border-foreground",
    leaderStyles:
      "hover:bg-blue-500/5 hover:border-blue-500 hover:text-blue-500",
    displayText: "Swap Pieces",
    tooltip:
      "Swap Pieces game mode of Red Tetris. You can swap current piece and next piece using the key 's' on your keyboard.",
  },
};

interface GameModeProps {
  gameMode: GameMode;
  selected: boolean;
  isLeader: boolean;
}

function GameModeOption({ gameMode, selected, isLeader }: GameModeProps) {
  return (
    <Tooltip key={gameMode}>
      <TooltipTrigger
        className={cn(
          "w-30 h-10 grow flex justify-center items-center rounded-sm select-none",
          isLeader && GAME_MODES_INFO[gameMode].leaderStyles,
          GAME_MODES_INFO[gameMode].defaultStyles,
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
      </TooltipTrigger>
      <TooltipContent>{GAME_MODES_INFO[gameMode].tooltip}</TooltipContent>
    </Tooltip>
  );
}

interface ChooseGameModeProps {
  isLeader: boolean;
}

export function ChooseGameMode({ isLeader }: ChooseGameModeProps) {
  const gameModes: GameMode[] = Object.values(GAME_MODES);
  const selectedGameMode = useTetrisStore((state) => state.gameMode);

  return (
    <div className="flex flex-wrap gap-4">
      {gameModes.map((gameMode) => (
        <GameModeOption
          gameMode={gameMode}
          selected={selectedGameMode === gameMode}
          isLeader={isLeader}
          key={gameMode}
        />
      ))}
    </div>
  );
}
