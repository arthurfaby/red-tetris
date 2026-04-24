import { Tetromino } from '../../../../../src/core/tetris/Tetromino'
import { Matrix } from '../../../../../src/core/tetris/types/Matrix'
import { expect } from 'vitest'

export function checkMatrix(tetromino: Tetromino, matrix: Matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i]
        expect(tetromino.matrix[i]).toStrictEqual(row)
    }
}
