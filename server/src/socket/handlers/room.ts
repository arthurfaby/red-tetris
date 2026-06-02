import {
    JOIN_GAME_STATUS,
    SocketPlayer,
    SocketServer,
} from '@red-tetris/shared'
import { GameManager } from '../managers/GameManager'
import { PlayerManager } from '../managers/PlayerManager'
import { handleNewLeader } from '../handle-new-leader'
import { handlePrintError } from '../handle-print-error'

export function handlerSocketConnection(
    socket: SocketPlayer,
    io: SocketServer,
    gameManager: GameManager,
    playerManager: PlayerManager
) {
    socket.on('join_game', (payload) => {
        try {
            if (!payload.username || !payload.gameId) return

            const player = playerManager.getPlayerOrFail(socket.id)

            playerManager.updatePlayer(player.id, {
                username: payload.username,
            })

            socket.data.gameId = payload.gameId

            if (gameManager.getGame(payload.gameId)?.isLaunched) {
                socket.emit('join_game', JOIN_GAME_STATUS.ALREADY_LAUNCHED)
            }

            socket.join(payload.gameId)

            const gameCreated = gameManager.joinGame(payload.gameId, player)
            socket.emit(
                'join_game',
                gameCreated ? JOIN_GAME_STATUS.CREATED : JOIN_GAME_STATUS.JOINED
            )

            const leader = gameManager.getLeader(payload.gameId)

            socket.emit('set_leader', leader!.id)
            io.in(payload.gameId).emit(
                'player_list',
                gameManager.getPlayerList(payload.gameId)
            )
        } catch (e: unknown) {
            handlePrintError(e)
        }
    })

    socket.on('leave_game', (gameId) => {
        try {
            const player = playerManager.getPlayerOrFail(socket.id)

            socket.leave(gameId)

            gameManager.leaveGame(gameId, player.id)

            io.in(gameId).emit('player_list', gameManager.getPlayerList(gameId))
            handleNewLeader(gameId, gameManager, playerManager)
        } catch (e: unknown) {
            handlePrintError(e)
        }
    })

    socket.on('disconnecting', () => {
        try {
            const player = playerManager.getPlayerOrFail(socket.id)

            socket.leave(socket.data.gameId)

            playerManager.removePlayer(player.id)
            gameManager.leaveGame(socket.data.gameId, player.id)
            io.in(socket.data.gameId).emit(
                'player_list',
                gameManager.getPlayerList(socket.data.gameId)
            )
            handleNewLeader(socket.data.gameId, gameManager, playerManager)
        } catch (e: unknown) {
            handlePrintError(e)
        }
    })
}
