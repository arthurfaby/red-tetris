import { SocketPlayer, SocketServer } from '@red-tetris/shared'
import { GameManager } from '../managers/GameManager'
import { handlePrintError } from '../handle-print-error'

export function handlerGame(
    io: SocketServer,
    socket: SocketPlayer,
    gameManager: GameManager
) {
    socket.on('start_game', async (gameId: string) => {
        if (!socket.rooms.has(gameId)) {
            return
        }
        const piece = gameManager.getPiece(gameId)
        if (!piece) return

        const socketsInRoom = await io.in(socket.data.gameId).fetchSockets()
        socketsInRoom.forEach((s) => {
            const startPiece = piece.getTetromino(s.id)
            const nextPiece = piece.getTetromino(s.id)
            s.emit('start_piece', startPiece, nextPiece)
        })
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
}
