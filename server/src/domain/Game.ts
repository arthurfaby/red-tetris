import { Player } from './Player'

export class Game {
    #roomId: string
    #playerList: Player[]

    constructor(room: string, leader: Player) {
        this.#roomId = room
        this.#playerList = [leader]
    }

    get playerList() {
        return this.#playerList
    }

    get roomId() {
        return this.#roomId
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

    isLeader(playerId: string) {
        return this.#playerList[0].id === playerId
    }
}
