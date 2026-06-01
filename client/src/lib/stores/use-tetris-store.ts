import { create } from "zustand";
import {
  DEFAULT_TETROMINO_POSITION,
  GRID_HEIGHT,
  GRID_WIDTH,
  type PlayerListData,
  POINTS_PER_LINE,
  Tetromino,
  type TetrominoType,
} from "@red-tetris/shared";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";
import { isValidPosition } from "@/lib/game/logic/is-valid-position.ts";
import { getBoardWithCurrentPiece } from "@/lib/game/logic/get-board-with-current-piece.ts";
import { getNumberOfLinesToDelete } from "@/lib/game/logic/get-number-of-lines-to-delete.ts";
import { clearLines } from "@/lib/game/logic/clear-lines.ts";

import { getSpectrum } from "@/lib/game/logic/get-spectrum.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";
import { getBoardWithPenaltyLines } from "@/lib/game/logic/get-board-with-penalty-lines.ts";

export type BoardState = TetrominoType[][];

export interface TetrominoState {
  type: TetrominoType;
  x: number;
  y: number;
  rotation: number; // Rotation index (0, 1, 2, 3)
}

export interface Opponent {
  username: string;
  spectrum: number[];
}

export interface TetrisStore {
  board: BoardState;
  currentPiece: TetrominoState;
  nextPiece: TetrominoType;
  score: number;
  linesCleared: number;
  isPlaying: boolean;
  isGameOver: boolean;
  room: string | null;
  opponents: Opponent[];

  intervalId: number;

  resetInterval: () => void;

  startGame: (
    startPiece: TetrominoType,
    nextPiece: TetrominoType,
    playerList: PlayerListData[],
  ) => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  tick: () => void;
  lockPiece: () => void;
  setRoom: (room: string) => void;
  setOpponent: (opponent: string) => void;
  setSpectrum: () => void;
}

export const useTetrisStore = create<TetrisStore>((set, get) => ({
  // --- STATE ---
  board: createEmptyBoard(GRID_HEIGHT, GRID_WIDTH),

  currentPiece: {
    type: Tetromino.L,
    ...DEFAULT_TETROMINO_POSITION,
    rotation: 0,
  },

  nextPiece: Tetromino.Z,
  score: 0,
  linesCleared: 0,
  isPlaying: false,
  isGameOver: false,
  intervalId: 0,
  room: null,
  opponents: [],

  setOpponent: (opponentUsername: string) => {
    const newOpponent: Opponent = {
      username: opponentUsername,
      spectrum: new Array(GRID_WIDTH).fill(0),
    };
    set({ opponents: [...get().opponents, newOpponent] });
  },

  setSpectrum: () => {},

  setRoom: (roomName: string) => set({ room: roomName }),

  // --- ACTIONS ---
  resetInterval: () => {
    if (get().intervalId) {
      clearInterval(get().intervalId);
    }

    set({
      intervalId: +setInterval(() => {
        get().tick();
      }, 1000),
    });
  },
  startGame: (
    startPiece: TetrominoType,
    nextPiece: TetrominoType,
    playerList,
  ) => {
    if (get().isPlaying && !get().isGameOver) return;
    const opponents: Opponent[] = playerList
      .filter((player) => player.id !== useSocket.getState().id)
      .map((player) => ({
        username: player.username,
        spectrum: new Array(GRID_WIDTH).fill(0),
      }));
    set({ opponents });
    useSocket.getState().off("player_spectrum");
    useSocket
      .getState()
      .listen("player_spectrum", (username: string, spectrum: number[]) => {
        set({
          opponents: get().opponents.map((opponent) =>
            opponent.username === username
              ? { ...opponent, spectrum }
              : opponent,
          ),
        });
      });
    set({ isPlaying: true, isGameOver: false, score: 0, linesCleared: 0 });
    set({ board: createEmptyBoard(GRID_HEIGHT, GRID_WIDTH) });
    set({
      currentPiece: {
        type: startPiece,
        ...DEFAULT_TETROMINO_POSITION,
        rotation: 0,
      },
    });
    set({ nextPiece });
    set({
      intervalId: +setInterval(() => {
        get().tick();
      }, 1000),
    });

    useSocket.getState().listen("next_piece", (next_piece) => {
      set({ nextPiece: next_piece });
    });

    useSocket.getState().listen("penalty_lines", (numberOfPenaltyLines) => {
      set({
        board: getBoardWithPenaltyLines(get().board, numberOfPenaltyLines),
      });
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

  softDrop: () => {
    const currentPiece = get().currentPiece;
    if (
      isValidPosition(get().board, { ...currentPiece, y: currentPiece.y + 1 })
    ) {
      set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 } });
    }
    get().tick();
    get().resetInterval();
  },

  hardDrop: async () => {
    let currentPiece = get().currentPiece;
    while (
      isValidPosition(get().board, { ...currentPiece, y: currentPiece.y + 1 })
    ) {
      currentPiece = { ...currentPiece, y: currentPiece.y + 1 };
      set({ currentPiece });
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    get().lockPiece();
  },

  lockPiece: () => {
    // 1. Merge currentPiece in board
    const newBoard = getBoardWithCurrentPiece(get().board, get().currentPiece);
    set({ board: newBoard });

    // 2. Check and delete lines
    const numberOfLinesDeleted = getNumberOfLinesToDelete(get().board);
    set({ board: clearLines(get().board) });
    if (numberOfLinesDeleted > 1) {
      useSocket.getState().emit("finish_lines", numberOfLinesDeleted);
    }

    useSocket.getState().emit("new_spectrum", getSpectrum(get().board));

    // 3. Update score
    set({
      score: get().score + numberOfLinesDeleted * POINTS_PER_LINE,
      linesCleared: get().linesCleared + numberOfLinesDeleted,
    });

    // 4. Check Game Over
    if (
      !isValidPosition(get().board, {
        type: get().nextPiece,
        ...DEFAULT_TETROMINO_POSITION,
        rotation: 0,
      })
    ) {
      set({ isGameOver: true, isPlaying: false });
      clearInterval(get().intervalId);
      return;
    }

    // 5. Update currentPiece with nextPiece
    set({
      currentPiece: {
        type: get().nextPiece,
        ...DEFAULT_TETROMINO_POSITION,
        rotation: 0,
      },
    });

    // 6. Update nextPiece from backend
    const roomId = get().room;
    if (roomId) {
      useSocket.getState().emit("next_piece", roomId);
    }
  },
}));
