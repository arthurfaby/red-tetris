import { FastifyInstance } from 'fastify'
import { handlerSocketConnection } from "./handlers/room";
import type { RoomSocketClient } from '../types';

export const registerSocketHandlers = (app: FastifyInstance) => {
    app.io.on('connection', (socket: RoomSocketClient) => {
        app.log.info(`Client connected: ${socket.id}`)
        handlerSocketConnection(socket, app.io)
    })
}