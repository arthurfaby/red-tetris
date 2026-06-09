import { GameManager } from './managers/GameManager'
import { SocketServer } from '@red-tetris/shared'

export function handleNewLeader(
    io: SocketServer,
    gameId: string,
    gameManager: GameManager
) {
    const newLeader = gameManager.getLeader(gameId)
    if (!newLeader) {
        gameManager.deleteGame(gameId)
        return
    }
    io.in(gameId).emit('set_leader', newLeader.id)
}
