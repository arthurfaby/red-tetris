import { create } from 'zustand';
import {Tetromino, type TetrominoType} from "@red-tetris/shared";

function createEmptyBoard(height: number, width: number) {
    return new Array<Array<TetrominoType>>(height).fill(new Array<TetrominoType>(width).fill(Tetromino.NONE));
}

interface TetrisStore {
    board: TetrominoType[][];
    currentPiece: {
        type: TetrominoType;
        x: number;
        y: number;
        rotation: number; // Rotation index (0, 1, 2, 3)
    }
    nextPiece: TetrominoType;
    score: number;
    isPlaying: boolean;
    isGameOver: boolean;

    startGame: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    rotate: () => void;
    tick: () => void;
    lockPiece: () => void;
}

export const useTetrisStore = create<TetrisStore>((set, get) => ({
    // --- STATE ---
    board: createEmptyBoard(20, 10),

    currentPiece: {
        type: Tetromino.L,
        x: 4,
        y: 0,
        rotation: 0
    },

    nextPiece: Tetromino.Z,
    score: 0,
    isPlaying: false,
    isGameOver: false,

    // --- ACTIONS ---
    startGame: () => {
        set({isPlaying: true, isGameOver: false});
        // TODO start game logic
    },

    moveLeft: () => {
        const currentPiece = get().currentPiece
        set({currentPiece: {...currentPiece, x: currentPiece.x - 1}})
        // TODO check collisions
    },
    moveRight: () => {

        const currentPiece = get().currentPiece
        set({currentPiece: {...currentPiece, x: currentPiece.x + 1}})
        // TODO check collisions
    },
    rotate: () => {
        const currentPiece = get().currentPiece
        const newRotation = (currentPiece.rotation + 1) % 4
        set({currentPiece: {...currentPiece, rotation: newRotation}})
        // TODO check collisions
    },
    tick: () => {
        const currentPiece = get().currentPiece
        set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 } });
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
    }
}));