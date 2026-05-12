import { TETROMINOS, type TetrominoType } from "@red-tetris/shared";
import { cn } from "@/lib/utils.ts";
import { TETROMINO_CLASSES } from "@/lib/game/constants.ts";

interface TetrisNextPieceProps {
  type: TetrominoType;
}

export function TetrisNextPiece({ type }: TetrisNextPieceProps) {
  const shape = TETROMINOS[type].shape[0].filter((row) =>
    row.some((cell) => cell !== 0),
  );

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${shape.length}, 32px)`,
        gridTemplateColumns: `repeat(${shape[0].length}, 32px)`,
      }}
    >
      {shape.map((row, y) =>
        row.map((cellType, x) => (
          <div
            key={`${y}-${x}`}
            className={cn("size-8", TETROMINO_CLASSES[cellType])}
          ></div>
        )),
      )}
    </div>
  );
}
