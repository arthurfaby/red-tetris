import { Tetromino } from '../Tetromino'
import { TetrominoType } from '../enums/TetrominoType'

export class TetrominoZ extends Tetromino {
    constructor() {
        const matrix = [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ]
        super(TetrominoType.Z, matrix)
    }
}
