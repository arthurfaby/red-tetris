import { SocketPlayer, SocketServer } from '@red-tetris/shared'
import { GameManager } from '../managers/GameManager'
import { PlayerManager } from '../managers/PlayerManager'
import { handleNewLeader } from '../handle-new-leader'

export function handlerSocketConnection(
    socket: SocketPlayer,
    io: SocketServer,
    gameManager: GameManager,
    playerManager: PlayerManager
) {
    socket.on('join_game', (payload) => {
        if (!payload.username || !payload.gameId) return

        const username = payload.username
        const gameId = payload.gameId
        const playerId = socket.id
        const player = playerManager.getPlayer(playerId)
        if (!player) return

        playerManager.updatePlayer(playerId, { username })

        // Join socket room
        socket.data.username = username
        socket.data.gameId = gameId
        socket.join(gameId)

        // Join game
        gameManager.joinGame(gameId, player)
        const leader = gameManager.getLeader(gameId)

        // Emit events
        socket.emit('set_leader', leader!.id)
        io.in(gameId).emit('player_list', gameManager.getPlayerList(gameId))
    })

    socket.on('leave_game', (gameId) => {
        const playerId = socket.id
        const player = playerManager.getPlayer(playerId)
        if (!player) return

        // Leave socket room
        socket.leave(gameId)

        // Leave game
        gameManager.leaveGame(gameId, player.id)

        io.in(gameId).emit('player_list', gameManager.getPlayerList(gameId))
        handleNewLeader(gameId, gameManager, playerManager)
    })

    socket.on('disconnecting', async () => {
        const gameId = socket.data.gameId
        const playerId = socket.id
        const player = playerManager.getPlayer(playerId)
        if (!player || !gameId) return

        socket.leave(gameId)

        playerManager.removePlayer(playerId)
        gameManager.leaveGame(gameId, playerId)
        io.in(gameId).emit('player_list', gameManager.getPlayerList(gameId))
        handleNewLeader(gameId, gameManager, playerManager)
    })
}
