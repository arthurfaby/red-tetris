import { Tetromino } from '../Tetromino'
import { TetrominoType } from '../enums/TetrominoType'

export class TetrominoO extends Tetromino {
    constructor() {
        const matrix = [
            [1, 1],
            [1, 1],
        ]
        super(TetrominoType.O, matrix)
    }
}
