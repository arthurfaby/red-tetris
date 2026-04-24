import {GRID_HEIGHT, GRID_WIDTH} from "./constants";

export type Position = { x: number, y: number };
export type Matrix = number[][];

export enum TetrominoType {
    I = 1,
    J,
    L,
    O,
    S,
    T,
    Z
}

type MatrixUnitValue = 0 | TetrominoType
type FixedArray<T, N extends number, R extends unknown[] = []> =
    R['length'] extends N ? R : FixedArray<T, N, [T, ...R]>;

const TETROMINO_O_MATRIX_SIZE = 2 as const;
const TETROMINO_I_MATRIX_SIZE = 4 as const;
const TETROMINO_DEFAULT_SIZE = 3 as const;

type TetrominoMatrixO = FixedArray<FixedArray<MatrixUnitValue, typeof TETROMINO_O_MATRIX_SIZE>, typeof TETROMINO_O_MATRIX_SIZE>;
type TetrominoMatrixDefault = FixedArray<FixedArray<MatrixUnitValue, typeof TETROMINO_I_MATRIX_SIZE>, typeof TETROMINO_I_MATRIX_SIZE>;
type TetrominoMatrixI = FixedArray<FixedArray<MatrixUnitValue, typeof TETROMINO_DEFAULT_SIZE>, typeof TETROMINO_DEFAULT_SIZE>;

export type PieceMatrix = TetrominoMatrixO | TetrominoMatrixDefault | TetrominoMatrixI;
export type BoardMatrix = FixedArray<FixedArray<MatrixUnitValue, typeof GRID_WIDTH>, typeof GRID_HEIGHT>;
