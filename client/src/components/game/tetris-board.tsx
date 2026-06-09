import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { TetrisCell } from "@/components/game/tetris-cell.tsx";
import { getBoardWithCurrentPiece } from "@/lib/game/logic/get-board-with-current-piece.ts";
import { cn } from "@/lib/utils.ts";

export function TetrisBoard() {
  const board = useTetrisStore((state) => state.board);
  const currentPiece = useTetrisStore((state) => state.currentPiece);
  const isDead = useTetrisStore((state) => state.isPlayerDead);

  const displayBoard = getBoardWithCurrentPiece(board, currentPiece);

  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(10,32px)] grid-rows-[repeat(20,32px)]",
        isDead && "grayscale",
      )}
    >
      {displayBoard.map((row, y) =>
        row.map((cellType, x) => (
          <TetrisCell key={`${y}-${x}`} type={cellType} />
        )),
      )}
    </div>
  );
}
