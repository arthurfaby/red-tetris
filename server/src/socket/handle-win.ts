import { Game } from '../domain/Game'
import { SocketPlayer, SocketServer } from '@red-tetris/shared'
import { Player } from '../domain/Player'

export function handleWin(
    io: SocketServer,
    socket: SocketPlayer,
    game: Game,
    player: Player
) {
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
}
