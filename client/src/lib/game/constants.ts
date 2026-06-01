import { Tetromino, type TetrominoType } from "@red-tetris/shared";

export const TETROMINO_CLASSES: Record<TetrominoType, string> = {
  [Tetromino.NONE]: "bg-transparent",
  [Tetromino.PENALTY]:
    "bg-gray-400 border-4 border-t-gray-300 border-l-gray-300 border-b-gray-700 border-r-gray-700",
  [Tetromino.I]:
    "bg-cyan-400 border-4 border-t-cyan-300 border-l-cyan-300 border-b-cyan-700 border-r-cyan-700",
  [Tetromino.J]:
    "bg-pink-400 border-4 border-t-pink-300 border-l-pink-300 border-b-pink-700 border-r-pink-700",
  [Tetromino.L]:
    "bg-orange-400 border-4 border-t-orange-300 border-l-orange-300 border-b-orange-700 border-r-orange-700",
  [Tetromino.O]:
    "bg-yellow-400 border-4 border-t-yellow-300 border-l-yellow-300 border-b-yellow-700 border-r-yellow-700",
  [Tetromino.S]:
    "bg-red-400 border-4 border-t-red-300 border-l-red-300 border-b-red-700 border-r-red-700",
  [Tetromino.T]:
    "bg-purple-400 border-4 border-t-purple-300 border-l-purple-300 border-b-purple-700 border-r-purple-700",
  [Tetromino.Z]:
    "bg-green-400 border-4 border-t-green-300 border-l-green-300 border-b-green-700 border-r-green-700",
};
