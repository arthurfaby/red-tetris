import { GRID_WIDTH } from '@red-tetris/shared'

export class Player {
    public spectrum: number[] = new Array(GRID_WIDTH).fill(0)

    #username: string
    #isDead: boolean

    constructor(
        readonly id: string,
        username: string
    ) {
        this.#username = username
        this.#isDead = false
    }

    get isDead(): boolean {
        return this.#isDead
    }

    setDeath(deathStatus: boolean) {
        this.#isDead = deathStatus
    }

    resetState() {
        this.#isDead = false
    }

    get username() {
        return this.#username
    }

    set username(value: string) {
        this.#username = value
    }

}
