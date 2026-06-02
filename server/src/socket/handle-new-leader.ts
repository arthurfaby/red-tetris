import { GameManager } from './managers/GameManager'
import { PlayerManager } from './managers/PlayerManager'

export function handleNewLeader(
    gameId: string,
    gameManager: GameManager,
    playerManager: PlayerManager
) {
    const newLeader = gameManager.getLeader(gameId)
    if (!newLeader) {
        gameManager.deleteGame(gameId)
        return
    }
    playerManager.getSocket(newLeader.id)?.emit('set_leader', newLeader.id)
}
