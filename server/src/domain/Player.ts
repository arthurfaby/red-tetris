import { GRID_WIDTH } from '@red-tetris/shared'

export class Player {
    public spectrum: number[] = new Array(GRID_WIDTH).fill(0)

    #username: string

    constructor(
        readonly id: string,
        username: string
    ) {
        this.#username = username
    }

    get username() {
        return this.#username
    }

    set username(value: string) {
        this.#username = value
    }
}
