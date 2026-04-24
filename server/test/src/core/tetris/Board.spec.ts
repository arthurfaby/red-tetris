import { describe, expect, it } from 'vitest'
import { Board } from '../../../../src/core/tetris/Board'

describe('Board', () => {
    it('should create', () => {
        const board = new Board()

        expect(board instanceof Board)
    })

    it('should have grid', () => {
        const board = new Board()
        expect(board.grid).toBeTruthy()
        expect(board.grid.length).toBe(20)
        for (const row of board.grid) {
            expect(row.length).toBe(10)
        }
    })
})
