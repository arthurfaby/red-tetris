import { Player } from './Player'

export class Game {
    #playerList: Player[]

    constructor(leader: Player) {
        this.#playerList = [leader]
    }

    get playerList() {
        return this.#playerList
    }

    addPlayer(player: Player) {
        if (this.#playerList.some((p) => p.id === player.id)) return
        this.#playerList.push(player)
    }

    removePlayer(playerIdToRemove: string) {
        this.#playerList = this.#playerList.filter(
            (player) => player.id !== playerIdToRemove
        )
    }
}
