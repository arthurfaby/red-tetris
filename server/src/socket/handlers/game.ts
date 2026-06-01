import {SocketPlayer, SocketServer} from '@red-tetris/shared'
import {GameManager} from "../managers/GameManager";
import {PlayerManager} from "../managers/PlayerManager";
import { handlePrintError } from '../handle-print-error'

export function handlerGame(
    socket: SocketPlayer,  io: SocketServer,  gameManager: GameManager, playerManager: PlayerManager) {
    socket.on('start_game', async (gameId: string) => {
        if (!socket.rooms.has(gameId)) {
            return
        }
        const piece = gameManager.getPiece(gameId)
        if (!piece) return
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
                console.log(
                    `Trying to send ${penaltyLines} to ${otherSocket.id}`
                )
                if (socket.id === otherSocket.id) return

                otherSocket.emit('penalty_lines', penaltyLines)
                console.log(`Sent`)
            })
        } catch (e: unknown) {
            handlePrintError(e)
        }
    })

    socket.on('new_spectrum', (spectrum: number[]) => {
        try {
            const player = playerManager.getPlayerOrFail(socket.id)
            player.spectrum = spectrum
            io.in(socket.data.gameId).emit('player_spectrum', player.username, player.spectrum)
        }
        catch (e) {
            console.error(e)
        }



    })
}
