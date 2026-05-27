import { SocketPlayer } from '@red-tetris/shared'
import {GameManager} from "../managers/GameManager";

export function handlerGame(socket: SocketPlayer, gameManager: GameManager) {
    socket.on('start_game', async (gameId: string) => {
        if (!socket.rooms.has(gameId)) {
            return
        }
        const piece = gameManager.getPiece(gameId)
        if (piece === undefined) {
            return
        }
        const startPiece = piece.getTetromino(socket.id)
        const nextPiece = piece.getTetromino(socket.id)
        socket.emit('start_piece', startPiece, nextPiece)
    })

    socket.on('next_piece', async (room: string) => {
        if (!socket.rooms.has(room)) {
            return
        }
        const piece = gameManager.getPiece(room)
        if (piece === undefined) {
            return
        }
        const new_piece = piece.getTetromino(socket.id)
        socket.emit('next_piece', new_piece)
    })
}
