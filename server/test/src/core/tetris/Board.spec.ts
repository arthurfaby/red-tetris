import { beforeEach, describe, expect, it } from 'vitest'
import { Board } from '../../../../src/core/tetris/Board'
import { TetrominoO } from '../../../../src/core/tetris/tetrominos/TetrominoO'
import { TetrominoI } from '../../../../src/core/tetris/tetrominos/TetrominoI'

describe('Board', () => {
    let board: Board

    beforeEach(() => {
        board = new Board()
    })

    it('should create', () => {
        expect(board instanceof Board)
    })

    it('should have grid', () => {
        expect(board.grid).toBeTruthy()
        expect(board.grid.length).toBe(20)
        for (const row of board.grid) {
            expect(row.length).toBe(10)
        }
    })

    describe('checkCollision', () => {
        const tetrominoI = new TetrominoI()

        it('should not detect collision', () => {
            expect(board.checkCollision(tetrominoI, { x: 6, y: 18 })).toBe(
                false
            )
        })

        it('should detect collision on right', () => {
            expect(board.checkCollision(tetrominoI, { x: 6, y: 18 }))
        })
    })
})
