import { SocketPlayer, SocketServer } from '@red-tetris/shared'
import { GameManager } from '../managers/GameManager'
import { handlePrintError } from '../handle-print-error'
import { PlayerManager } from '../managers/PlayerManager'

export function handlerGame(
    socket: SocketPlayer,
    io: SocketServer,
    gameManager: GameManager,
    playerManager: PlayerManager
) {
    socket.on('start_game', async (gameId: string) => {
        if (!socket.rooms.has(gameId)) {
            return
        }
        const piece = gameManager.getPiece(gameId)
        if (!piece) return

        const game = gameManager.getGame(gameId)
        if (!game) return

        if (gameManager.getLeader(gameId)?.id !== socket.id) {
            return
        }

        game.setStatus('LAUNCHED')

        const players = gameManager.getPlayerList(gameId)
        for (const player of players) {
            const playerSocket = playerManager.getSocket(player.id)
            if (!playerSocket) continue
            const startPiece = piece.getTetromino(player.id)
            const nextPiece = piece.getTetromino(player.id)
            playerSocket.emit('start_piece', startPiece, nextPiece)
        }
    })

    socket.on('next_piece', async (room: string) => {
        if (!socket.rooms.has(room)) {
            return
        }
        const piece = gameManager.getPiece(room)
        if (!piece) return

        const newPiece = piece.getTetromino(socket.id)
        socket.emit('next_piece', newPiece)
    })

    socket.on('finish_lines', async (numberOfLines) => {
        const penaltyLines = numberOfLines - 1

        try {
            const sockets = await io.in(socket.data.gameId).fetchSockets()
            sockets.forEach((otherSocket) => {
                const player = playerManager.getPlayerOrFail(otherSocket.id)
                if (socket.id === otherSocket.id || player.isDead) return

                otherSocket.emit('penalty_lines', penaltyLines)
            })
        } catch (e: unknown) {
            handlePrintError(e)
        }
    })

    socket.on('death', () => {
        try {
            const player = playerManager.getPlayerOrFail(socket.id)
            const game = gameManager.getGameOrFail(socket.data.gameId)

            player.setDeath(true)

            const potentialWinner = game.winnerOrNull

            if (potentialWinner || game.isSoloGame) {
                const winner = game.isSoloGame ? player : potentialWinner!
                io.in(socket.data.gameId).emit('game_over', {
                    id: winner.id,
                    username: winner.username,
                })
                game.setStatus('IN_LOBBY')
                game.playerList.forEach((p) => {
                    p.resetState()
                })
                game.piece.resetState(game.playerList)
            }
        } catch (e: unknown) {
            handlePrintError(e)
        }
    })

    socket.on('new_spectrum', (spectrum: number[]) => {
        try {
            const player = playerManager.getPlayerOrFail(socket.id)
            player.spectrum = spectrum
            io.in(socket.data.gameId).emit(
                'player_spectrum',
                socket.id,
                player.spectrum
            )
        } catch (e) {
            console.error(e)
        }
    })
}
