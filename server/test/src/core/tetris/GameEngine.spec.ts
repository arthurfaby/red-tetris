import { describe, expect, it } from 'vitest'
import { GameEngine } from '../../../../src/core/tetris/GameEngine'
import { Board } from '../../../../src/core/tetris/Board'

describe('GameEngine', () => {
    it('should create', () => {
        const game = new GameEngine()

        expect(game instanceof GameEngine)
    })

    it('should have a board', () => {
        const game = new GameEngine()
        expect(game.board instanceof Board).toBeTruthy()
    })
})
