import { Player } from './Player'
import { Piece } from './Piece'
import { GameStatus } from '@red-tetris/shared'

export class Game {
    #playerList: Player[]
    #piece: Piece
    #status: GameStatus

    constructor(leader: Player) {
        this.#playerList = [leader]
        this.#piece = new Piece(this.#playerList)
        this.#status = 'IN_LOBBY'
    }

    get status(): GameStatus {
        return this.#status
    }

    get playerList() {
        return this.#playerList
    }

    get piece() {
        return this.#piece
    }

    setStatus(status: GameStatus) {
        this.#status = status
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

    getPlayer(playerId: string) {
        return this.#playerList.find((p) => p.id === playerId)
    }

    get winnerOrNull() {
        const playerNotDead = this.#playerList.filter((p) => !p.isDead)
        if (playerNotDead.length > 1) {
            return null
        }
        return playerNotDead[0]
    }
}
