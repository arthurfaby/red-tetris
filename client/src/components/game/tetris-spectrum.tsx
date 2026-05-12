import { cn } from "@/lib/utils.ts";
import { GRID_HEIGHT } from "@red-tetris/shared";

interface TetrisSpectrumProps {
  spectrum: number[];
}

export function TetrisSpectrum({ spectrum }: TetrisSpectrumProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-10 grid-rows-20 w-full max-h-full max-w-full aspect-1/2",
      )}
    >
      {Array(GRID_HEIGHT)
        .fill(0)
        .map((_, i) => {
          return spectrum.map((height, index) => {
            const isFilled = 20 - i <= height;
            return (
              <div
                key={`${index}-${i}`}
                className={cn(
                  "w-full h-full",
                  isFilled
                    ? "bg-gray-400 border border-t-gray-300 border-l-gray-300 border-b-gray-700 border-r-gray-700"
                    : "bg-transparent",
                )}
              />
            );
          });
        })}
    </div>
  );
}
