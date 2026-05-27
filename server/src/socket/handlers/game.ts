import { SocketPlayer } from '@red-tetris/shared'
import { RoomsManager } from '../managers/RoomsManager'

export function handlerGame(socket: SocketPlayer, roomManager: RoomsManager) {
    socket.on('start_game', async (gameId: string) => {
        if (!socket.rooms.has(gameId)) {
            return
        }
        const piece = roomManager.getPiece(gameId)
        if (piece === undefined) {
            return
        }
        const start_piece = piece.getTetromino(socket.id)
        const next_piece = piece.getTetromino(socket.id)
        socket.emit('start_piece', start_piece, next_piece)
    })

    socket.on('next_piece', async (room: string) => {
        if (!socket.rooms.has(room)) {
            return
        }
        const piece = roomManager.getPiece(room)
        if (piece === undefined) {
            return
        }
        const new_piece = piece.getTetromino(socket.id)
        socket.emit('next_piece', new_piece)
    })
}
