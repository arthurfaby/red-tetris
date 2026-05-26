import { FastifyInstance } from 'fastify'
import { handlerSocketConnection } from './handlers/room'
import { RoomsManager } from './managers/RoomsManager'
import { handlerGame } from './handlers/game'
import { GameManager } from './managers/GameManager'
import { PlayerManager } from './managers/PlayerManager'
import { Player } from '../domain/Player'
import { SocketPlayer } from '@red-tetris/shared'

export const registerSocketHandlers = (app: FastifyInstance) => {
    const gameManager = new GameManager()
    const roomsManager = new RoomsManager()
    const playerManager = new PlayerManager()
    app.io.on('connection', (socket: SocketPlayer) => {
        app.log.info(`Client connected: ${socket.id}`)
        console.log('CLIENT CONNECTED', socket.id)
        const newPlayer = new Player(socket.id, socket.id)
        playerManager.addOrUpdatePlayer(newPlayer, socket)
        handlerSocketConnection(socket, app.io, gameManager, playerManager)
        handlerGame(socket, roomsManager)
    })
}
