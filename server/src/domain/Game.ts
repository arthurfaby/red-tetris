import { Player } from './Player'
import { Piece } from './Piece'

export class Game {
    #playerList: Player[]
    #piece: Piece

    constructor(leader: Player) {
        this.#playerList = [leader]
        this.#piece = new Piece(this.#playerList)
    }

    get playerList() {
        return this.#playerList
    }

    get piece() {
        return this.#piece
    }

    addPlayer(player: Player) {
        if (this.#playerList.some((p) => p.id === player.id)) return
        this.#playerList.push(player)
        this.#piece.addPlayer(player.id)
    }

    removePlayer(playerIdToRemove: string) {
        this.#playerList = this.#playerList.filter(
            (player) => player.id !== playerIdToRemove
        )
    }
}
