import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { TetrisCell } from "@/components/game/tetris-cell.tsx";
import { GRID_HEIGHT, GRID_WIDTH, TETROMINOS } from "@red-tetris/shared";

export function TetrisBoard() {
  const board = useTetrisStore((state) => state.board);
  const currentPiece = useTetrisStore((state) => state.currentPiece);
  const startGame = useTetrisStore((state) => state.startGame);

  const displayBoard = board.map((row) => [...row]);

  startGame();

  const shape = TETROMINOS[currentPiece.type].shape[currentPiece.rotation];
  shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value !== 0) {
        const boardY = currentPiece.y + dy;
        const boardX = currentPiece.x + dx;
        if (
          boardY >= 0 &&
          boardY < GRID_HEIGHT &&
          boardX >= 0 &&
          boardX < GRID_WIDTH
        ) {
          displayBoard[boardY][boardX] = currentPiece.type;
        }
      }
    });
  });

  return (
    <div className="grid grid-cols-[repeat(10,32px)] grid-rows-[repeat(20,32px)]">
      {displayBoard.map((row, y) =>
        row.map((cellType, x) => (
          <TetrisCell key={`${y}-${x}`} type={cellType} />
        )),
      )}
    </div>
  );
}
