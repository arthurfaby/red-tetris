import { TETROMINOS, type TetrominoType } from "@red-tetris/shared";
import { cn } from "@/lib/utils.ts";
import { memo } from "react";

interface TetrisCellProps {
  type: TetrominoType;
}

export const TetrisCell = memo(({ type }: TetrisCellProps) => {
  return <div className={cn("size-8", TETROMINOS[type].classes)}></div>;
});
