import { beforeEach, describe, expect, it } from 'vitest'
import { TetrominoI } from '../../../../../src/core/tetris/tetrominos/TetrominoI'
import { TetrominoType } from '../../../../../src/core/tetris/enums/TetrominoType'
import { Matrix } from '../../../../../src/core/tetris/types/Matrix'
import { checkMatrix } from './check-matrix'

describe('TetrominoI', () => {
    const firstPosition: Matrix = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    const secondPosition: Matrix = [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ]

    const thirdPosition: Matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ]

    const fourthPosition: Matrix = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]

    let tetromino: TetrominoI

    beforeEach(() => {
        tetromino = new TetrominoI()
    })

    it('should have correct type', () => {
        expect(tetromino.type).toBe(TetrominoType.I)
    })

    it('should have default position', () => {
        expect(tetromino.position.x).toBe(0)
        expect(tetromino.position.y).toBe(0)
    })

    it('should have correct matrix size', () => {
        expect(tetromino.matrix.length).toBe(4)
        for (const row of tetromino.matrix) {
            expect(row.length).toBe(4)
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
