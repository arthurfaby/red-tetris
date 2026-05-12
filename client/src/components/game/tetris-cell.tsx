import { type TetrominoType } from "@red-tetris/shared";
import { cn } from "@/lib/utils.ts";
import { memo } from "react";
import { TETROMINO_CLASSES } from "@/lib/game/constants.ts";

interface TetrisCellProps {
  type: TetrominoType;
}

export const TetrisCell = memo(({ type }: TetrisCellProps) => {
  return <div className={cn("size-8", TETROMINO_CLASSES[type])}></div>;
});
