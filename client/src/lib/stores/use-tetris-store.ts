import { create } from "zustand";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  Tetromino,
  type TetrominoType,
} from "@red-tetris/shared";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { isValidPosition } from "@/lib/game/logic/is-valid-position.ts";

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
  isPlaying: false,
  isGameOver: false,
  intervalId: 0,

  // --- ACTIONS ---
  startGame: () => {
    if (get().isPlaying && !get().isGameOver) return;
    set({ isPlaying: true, isGameOver: false });
    set({
      intervalId: setInterval(() => {
        get().tick();
      }, 1000),
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
      // TODO lockPiece
    }
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
    // TODO implement
    // const { currentPiece, board } = get();
    // if (canMoveDown(currentPiece, board)) {
    //     set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 } });
    // } else {
    //     get().lockPiece();
    // }
  },

  lockPiece: () => {
    // TODO implement
    // 1. Merge currentPiece in board
    // 2. Check and delete lines
    // 3. Update score
    // 4. Update currentPiece with nextPiece
    // 5. Update nextPiece from backend
    // 6. Check Game Over
  },
}));
