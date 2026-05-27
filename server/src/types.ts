import { SocketServer } from '@red-tetris/shared'

declare module 'fastify' {
    interface FastifyInstance {
        io: SocketServer
    }
}
