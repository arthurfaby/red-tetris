import  {PieceMatrix, TetrominoType} from "./types";

export const TETROMINOS: Record<TetrominoType, PieceMatrix>  = {
    [TetrominoType.I]: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [TetrominoType.J]: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [TetrominoType.L]: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [TetrominoType.O]: [
        [1, 1],
        [1, 1],
    ],
    [TetrominoType.S]: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [TetrominoType.T]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [TetrominoType.Z]: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ]
}