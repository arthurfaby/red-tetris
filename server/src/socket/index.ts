import { FastifyInstance } from 'fastify'
import { handlerSocketConnection } from './handlers/room'
import { ClientToServerEvents } from '../types'
import { Socket } from 'socket.io'
import { RoomsManager } from './managers/RoomsManager'
import { handlerGame } from './handlers/game'

export const registerSocketHandlers = (app: FastifyInstance) => {
    const roomsManager = new RoomsManager()
    app.io.on('connection', (socket: Socket<ClientToServerEvents>) => {
        app.log.info(`Client connected: ${socket.id}`)
        handlerSocketConnection(socket, app.io, roomsManager)
        handlerGame(socket, roomsManager)
    })
}
