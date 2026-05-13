import { create } from "zustand";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  Tetromino,
  type TetrominoType,
} from "@red-tetris/shared";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { isValidPosition } from "@/lib/game/logic/is-valid-position.ts";
import { getBoardWithCurrentPiece } from "@/lib/game/logic/get-board-with-current-piece.ts";
import { getNumberOfLinesToDelete } from "@/lib/game/logic/get-number-of-lines-to-delete.ts";
import { clearLines } from "@/lib/game/logic/clear-lines.ts";

export type BoardState = TetrominoType[][];

export interface TetrominoState {
  type: TetrominoType;
  x: number;
  y: number;
  rotation: number; // Rotation index (0, 1, 2, 3)
}

export interface TetrisStore {
  board: BoardState;
  currentPiece: TetrominoState;
  nextPiece: TetrominoType;
  score: number;
  linesCleared: number;
  isPlaying: boolean;
  isGameOver: boolean;

  intervalId: number;

  startGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  tick: () => void;
  lockPiece: () => void;
}

export const useTetrisStore = create<TetrisStore>((set, get) => ({
  // --- STATE ---
  board: createEmptyBoard(GRID_HEIGHT, GRID_WIDTH),

  currentPiece: {
    type: Tetromino.L,
    x: 4,
    y: 0,
    rotation: 0,
  },

  nextPiece: Tetromino.Z,
  score: 0,
  linesCleared: 0,
  isPlaying: false,
  isGameOver: false,
  intervalId: 0,

  // --- ACTIONS ---
  startGame: () => {
    if (get().isPlaying && !get().isGameOver) return;
    set({ isPlaying: true, isGameOver: false, score: 0, linesCleared: 0 });
    set({ board: createEmptyBoard(GRID_HEIGHT, GRID_WIDTH) });
    // TODO change with backend sequence (current and next)
    set({
      currentPiece: {
        type: Tetromino.L,
        x: 4,
        y: 0,
        rotation: 0,
      },
    });
    const randomIndex = Math.floor(Math.random() * 7);
    const randomPiece = [
      Tetromino.I,
      Tetromino.J,
      Tetromino.L,
      Tetromino.O,
      Tetromino.S,
      Tetromino.T,
      Tetromino.Z,
    ][randomIndex];
    set({ nextPiece: randomPiece });
    set({
      intervalId: setInterval(() => {
        get().tick();
      }, 500),
    });
  },

  moveLeft: () => {
    const currentPiece = get().currentPiece;
    if (
      isValidPosition(get().board, { ...currentPiece, x: currentPiece.x - 1 })
    ) {
      set({ currentPiece: { ...currentPiece, x: currentPiece.x - 1 } });
    }
  },
  moveRight: () => {
    const currentPiece = get().currentPiece;
    if (
      isValidPosition(get().board, { ...currentPiece, x: currentPiece.x + 1 })
    ) {
      set({ currentPiece: { ...currentPiece, x: currentPiece.x + 1 } });
    }
  },
  rotate: () => {
    const currentPiece = get().currentPiece;
    const newRotation = (currentPiece.rotation + 1) % 4;
    if (
      isValidPosition(get().board, { ...currentPiece, rotation: newRotation })
    ) {
      set({ currentPiece: { ...currentPiece, rotation: newRotation } });
    }
  },
  tick: () => {
    const currentPiece = get().currentPiece;
    if (
      isValidPosition(get().board, { ...currentPiece, y: currentPiece.y + 1 })
    ) {
      set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 } });
    } else {
      get().lockPiece();
    }
  },

  lockPiece: () => {
    // 1. Merge currentPiece in board
    const newBoard = getBoardWithCurrentPiece(get().board, get().currentPiece);
    set({ board: newBoard });

    // 2. Check and delete lines
    const numberOfLinesDeleted = getNumberOfLinesToDelete(get().board);
    set({ board: clearLines(get().board) });

    // 3. Update score
    set({
      score: get().score + numberOfLinesDeleted * 1000,
      linesCleared: get().linesCleared + numberOfLinesDeleted,
    });

    // 4. Check Game Over
    if (
      !isValidPosition(get().board, {
        type: get().nextPiece,
        y: 0,
        x: 4,
        rotation: 0,
      })
    ) {
      set({ isGameOver: true, isPlaying: false });
      clearInterval(get().intervalId);
      return;
    }

    // 5. Update currentPiece with nextPiece
    set({ currentPiece: { type: get().nextPiece, y: 0, x: 4, rotation: 0 } });

    // 6. Update nextPiece from backend
    // TODO change with backend sequence
    const randomIndex = Math.floor(Math.random() * 7);
    const randomPiece = [
      Tetromino.I,
      Tetromino.J,
      Tetromino.L,
      Tetromino.O,
      Tetromino.S,
      Tetromino.T,
      Tetromino.Z,
    ][randomIndex];
    set({ nextPiece: randomPiece });
  },
}));
