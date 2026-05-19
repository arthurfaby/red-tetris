import { FastifyInstance } from 'fastify'
import { handlerSocketConnection } from "./handlers/room";
import {ClientToServerEvents} from "../types";
import {Socket} from "socket.io";

export const registerSocketHandlers = (app: FastifyInstance) => {
    app.io.on('connection', (socket: Socket<ClientToServerEvents>) => {
        app.log.info(`Client connected: ${socket.id}`)
        handlerSocketConnection(socket, app.io)
    })
}