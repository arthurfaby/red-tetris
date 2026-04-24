import { Tetromino } from '../Tetromino'
import { TetrominoType } from '../enums/TetrominoType'

export class TetrominoS extends Tetromino {
    constructor() {
        const matrix = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ]
        super(TetrominoType.S, matrix)
    }
}
