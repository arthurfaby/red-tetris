import { Board } from './Board'

export class GameEngine {
    #board!: Board

    public get board() {
        return this.#board
    }

    public constructor() {
        this.#board = new Board()
    }
}
