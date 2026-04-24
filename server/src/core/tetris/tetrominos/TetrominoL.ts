import { Tetromino } from '../Tetromino'
import { TetrominoType } from '../enums/TetrominoType'

export class TetrominoL extends Tetromino {
    constructor() {
        const matrix = [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ]
        super(TetrominoType.L, matrix)
    }
}
