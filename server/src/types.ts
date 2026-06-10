import { SocketServer } from '@red-tetris/shared'
import Database from "better-sqlite3";

declare module 'fastify' {
    interface FastifyInstance {
        io: SocketServer
        db: Database.Database
    }
}
