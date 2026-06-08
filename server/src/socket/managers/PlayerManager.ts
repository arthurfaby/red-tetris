import { Player } from '../../domain/Player'
import { SocketPlayer } from '@red-tetris/shared'

export class PlayerManager {
    #players: Player[]
    #sockets: Map<string, SocketPlayer>

    constructor() {
        this.#players = []
        this.#sockets = new Map()
    }

    addOrUpdatePlayer(player: Player, socket: SocketPlayer): Player {
        const findPlayer = this.#players.find((p) => p.id === player.id)
        if (findPlayer) {
            Object.assign(findPlayer, player)
            return findPlayer
        }
        this.#players.push(player)
        this.#sockets.set(player.id, socket)
        return player
    }

    getSocket(playerId: string) {
        return this.#sockets.get(playerId)
    }

    getPlayerOrFail(playerId: string) {
        const player = this.#players.find((player) => player.id === playerId)
        if (!player) throw new Error(`Unknown player ID: ${playerId}`)
        return player
    }

    updatePlayer(playerId: string, data: Partial<Omit<Player, 'id'>>) {
        const player = this.#players.find((player) => player.id === playerId)
        if (!player) return

        Object.assign(player, data)
    }

    removePlayer(playerId: string) {
        this.#players = this.#players.filter((player) => player.id !== playerId)
        this.#sockets.delete(playerId)
    }
    get sockets() {
        return this.#sockets
    }
}
