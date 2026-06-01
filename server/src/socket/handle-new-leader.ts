import { GameManager } from './managers/GameManager'
import { PlayerManager } from './managers/PlayerManager'
import { SocketServer } from '@red-tetris/shared'

export function handleNewLeader(
    gameId: string,
    gameManager: GameManager,
    playerManager: PlayerManager,
    io: SocketServer
) {
    const newLeader = gameManager.getLeader(gameId)
    if (!newLeader) {
        gameManager.deleteGame(gameId)
        return
    }
    io.sockets.sockets.get(newLeader.id)
}
