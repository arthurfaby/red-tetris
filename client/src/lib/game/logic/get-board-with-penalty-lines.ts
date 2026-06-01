import { GRID_WIDTH, Tetromino, type TetrominoType } from "@red-tetris/shared";

export function getBoardWithPenaltyLines(
  board: TetrominoType[][],
  numberOfPenaltyLines: number,
) {
  const penaltyLines = Array.from({ length: numberOfPenaltyLines }, () =>
    new Array<TetrominoType>(GRID_WIDTH).fill(Tetromino.PENALTY),
  );
  return [...board, ...penaltyLines].slice(-20);
}
