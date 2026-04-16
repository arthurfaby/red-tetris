import {Tetromino} from "../Tetromino";
import {TetrominoType} from "../enums/TetrominoType";

export class TetrominoJ extends Tetromino {
    constructor() {
        const matrix = [
            [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
        ]
        super(TetrominoType.J, matrix)
    }
}