import { cn } from "@/lib/utils.ts";
import { GRID_HEIGHT, Tetromino } from "@red-tetris/shared";
import { TETROMINO_CLASSES } from "@/lib/game/constants.ts";

interface TetrisSpectrumProps {
  spectrum: number[];
  ko: boolean;
}

export function TetrisSpectrum({ spectrum, ko }: TetrisSpectrumProps) {
  function isFilled(limitHeight: number, heightToCheck: number) {
    return GRID_HEIGHT - heightToCheck <= limitHeight;
  }

  if (ko) {
    return (
      <div className="flex justify-center items-center w-full max-h-full max-w-full aspect-1/2">
        <span className="text-lg text-red-400">K.O.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-10 grid-rows-20 w-full max-h-full max-w-full aspect-1/2">
      {Array(GRID_HEIGHT)
        .fill(0)
        .map((_, heightToCheck) =>
          spectrum.map((limitHeight, i) => (
            <div
              key={`${i}-${heightToCheck}`}
              className={cn(
                "w-full h-full",
                isFilled(limitHeight, heightToCheck)
                  ? "bg-gray-600 border border-t-gray-500 border-l-gray-500 border-b-gray-900 border-r-gray-900"
                  : TETROMINO_CLASSES[Tetromino.NONE],
              )}
            />
          )),
        )}
    </div>
  );
}
