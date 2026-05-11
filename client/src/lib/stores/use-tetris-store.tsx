import { create } from 'zustand';
import {Tetromino, type TetrominoType} from "@/lib/tetrominos.ts";

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

    nextPiece: Tetromino.T,
    score: 0,
    level: 1,
    isPlaying: true,
    isGameOver: false,

    // --- ACTIONS ---
    startGame: () => set({ /* reset state */ }),

    moveLeft: () => { /* Logique + vérification des collisions */ },
    moveRight: () => { /* Logique + vérification des collisions */ },
    rotate: () => {
        const currentPiece = get().currentPiece
        set({currentPiece: {...currentPiece, rotation: (currentPiece.rotation + 1) % 4}})
    },

    // La fonction critique appelée par la boucle de jeu (ex: toutes les 800ms)
    tick: () => {
        get().rotate()
        // const { currentPiece, board } = get();
        // if (canMoveDown(currentPiece, board)) {
        //     set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 } });
        // } else {
        //     get().lockPiece(); // Fige la pièce dans le `board`
        // }
    },

    // Fige la pièce, vérifie les lignes complètes et génère la suivante
    lockPiece: () => {
        // 1. Fusionner currentPiece dans board
        // 2. Vérifier et supprimer les lignes pleines
        // 3. Mettre à jour le score
        // 4. Générer la nouvelle currentPiece
        // 5. Vérifier le Game Over
    }
}));