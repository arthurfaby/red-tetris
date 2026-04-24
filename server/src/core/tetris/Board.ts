import { Matrix } from './types/Matrix'
import { Tetromino } from './Tetromino'
import { Position } from '@red-tetris/shared'

export class Board {
    #grid: Matrix
    #height: number
    #width: number

    public get grid() {
        return this.#grid
    }

    constructor() {
        this.#width = 10
        this.#height = 20
        this.#grid = Array(this.#height)
            .fill(null)
            .map((_) => Array(this.#width).fill(0))
    }

    public checkCollision(tetromino: Tetromino, position: Position) {
        for (let x = 0; x < tetromino.size; ++x) {
            for (let y = 0; y < tetromino.size; ++y) {
                if (tetromino.matrix[y][x] === 0) continue

                const posToCheck = { x: position.x + x, y: position.y + y }

                if (this._checkOutOfBounds(posToCheck)) {
                    return true
                }

                if (posToCheck.y < 0) {
                    continue
                }

                if (this.grid[posToCheck.y][posToCheck.x] !== 0) {
                    return true
                }
            }
        }
        return false
    }

    private _checkOutOfBounds(position: Position) {
        return (
            position.x < 0 ||
            position.x >= this.#width ||
            position.y >= this.#height
        )
    }
}
