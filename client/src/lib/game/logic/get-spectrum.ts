import {GRID_HEIGHT, GRID_WIDTH, Tetromino, type TetrominoType} from "@red-tetris/shared";

export function getSpectrum(board: TetrominoType[][]): number[] {
    const spectrum = new Array(GRID_WIDTH).fill(0);
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            if (board[y][x] !== Tetromino.NONE) {
                spectrum[x] = GRID_HEIGHT - y;
                break;
            }
        }
    }
    return spectrum;
}