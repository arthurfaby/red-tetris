import { Game } from '../../domain/Game'
import { Player } from '../../domain/Player'
import { PlayerListData } from '@red-tetris/shared'
import { Piece } from '../../domain/Piece'

export class GameManager {
    #games: Map<string, Game>

    constructor() {
        this.#games = new Map()
    }

    getGame(gameId: string): Game | undefined {
        return this.#games.get(gameId)
    }

    getGameOrFail(gameId: string): Game {
        const game = this.#games.get(gameId)
        if (!game) throw new Error(`Unknown game ID: ${gameId}`)
        return game
    }

    // Return true if game is created, false otherwise
    joinGame(gameId: string, player: Player): boolean {
        const game = this.#games.get(gameId)
        if (!game) {
            const newGame = new Game(player)
            this.#games.set(gameId, newGame)
            return true
        } else {
            game.addPlayer(player)
            return false
        }
    }

    leaveGame(gameId: string, playerId: string) {
        const game = this.#games.get(gameId)
        if (!game) return

        game.removePlayer(playerId)
        if (game.playerList.length === 0) {
            this.#games.delete(gameId)
        }
    }

    getPiece(gameId: string): Piece | null {
        const game = this.#games.get(gameId)
        if (!game) return null
        return game.piece
    }

    getLeader(gameId: string) {
        const game = this.#games.get(gameId)
        if (!game) return null

        return game.playerList[0] ?? null
    }

    deleteGame(gameId: string) {
        this.#games.delete(gameId)
    }

    getPlayerList(gameId: string): PlayerListData[] {
        const game = this.#games.get(gameId)
        if (!game) return []

        return game.playerList.map((player) => ({
            username: player.username,
            id: player.id,
            ko: player.isDead,
        }))
    }
}
