import { beforeEach, describe, expect, it } from 'vitest'
import { TetrominoL } from '../../../../../src/core/tetris/tetrominos/TetrominoL'
import { TetrominoType } from '../../../../../src/core/tetris/enums/TetrominoType'
import { Matrix } from '../../../../../src/core/tetris/types/Matrix'
import { checkMatrix } from './check-matrix'

describe('TetrominoL', () => {
    const firstPosition: Matrix = [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ]

    const secondPosition: Matrix = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ]

    const thirdPosition: Matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ]

    const fourthPosition: Matrix = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ]

    let tetromino: TetrominoL

    beforeEach(() => {
        tetromino = new TetrominoL()
    })

    it('should have correct type', () => {
        expect(tetromino.type).toBe(TetrominoType.L)
    })

    it('should have correct matrix size', () => {
        expect(tetromino.matrix.length).toBe(3)
        for (const row of tetromino.matrix) {
            expect(row.length).toBe(3)
        }
    })

    it('should have correct matrix data', () => {
        checkMatrix(tetromino, firstPosition)
    })

    it('should rotate right', () => {
        tetromino.rotateRight()
        checkMatrix(tetromino, secondPosition)
        tetromino.rotateRight()
        checkMatrix(tetromino, thirdPosition)
        tetromino.rotateRight()
        checkMatrix(tetromino, fourthPosition)
        tetromino.rotateRight()
        checkMatrix(tetromino, firstPosition)
    })

    it('should rotate left', () => {
        tetromino.rotateLeft()
        checkMatrix(tetromino, fourthPosition)
        tetromino.rotateLeft()
        checkMatrix(tetromino, thirdPosition)
        tetromino.rotateLeft()
        checkMatrix(tetromino, secondPosition)
        tetromino.rotateLeft()
        checkMatrix(tetromino, firstPosition)
    })
})
