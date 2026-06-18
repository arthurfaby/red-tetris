import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { TetrisCell } from "@/components/game/tetris-cell.tsx";
import { getBoardWithCurrentPiece } from "@/lib/game/logic/get-board-with-current-piece.ts";
import { cn } from "@/lib/utils.ts";
import { Tetromino, TETROMINOS } from "@red-tetris/shared";

export function TetrisBoard() {
  const board = useTetrisStore((state) => state.board);
  const currentPiece = useTetrisStore((state) => state.currentPiece);
  const ghostPiece = useTetrisStore((state) => state.ghostPiece);
  const isDead = useTetrisStore((state) => state.isPlayerDead);

  const displayBoard = getBoardWithCurrentPiece(board, currentPiece);

  const ghostCoordinates = new Set();
  if (ghostPiece) {
    const shape = TETROMINOS[ghostPiece.type].shape[ghostPiece.rotation];
    shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value !== Tetromino.NONE && value !== Tetromino.PENALTY) {
          ghostCoordinates.add(`${ghostPiece.y + dy},${ghostPiece.x + dx}`);
        }
      });
    });
  }

  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(10,32px)] grid-rows-[repeat(20,32px)]",
        isDead && "grayscale",
      )}
    >
      {displayBoard.map((row, y) =>
        row.map((cellType, x) => {
          const isGhost = ghostCoordinates.has(`${y},${x}`);
          return (
            <TetrisCell
              key={`${y}-${x}`}
              type={cellType}
              ghost={isGhost && cellType === Tetromino.NONE}
            />
          );
        }),
      )}
    </div>
  );
}
