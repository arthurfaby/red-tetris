import { type TetrominoType } from "@red-tetris/shared";
import { cn } from "@/lib/utils.ts";
import { memo } from "react";
import { TETROMINO_CLASSES } from "@/lib/game/constants.ts";

interface TetrisCellProps {
  type: TetrominoType;
  ghost: boolean;
}

export const TetrisCell = memo(({ type, ghost }: TetrisCellProps) => {
  const classes = ghost
    ? "border-4 border-t-white-300 border-l-white-300 border-b-white-700 border-r-white-700"
    : TETROMINO_CLASSES[type];
  return <div className={cn("size-8", classes)}></div>;
});
