import { Server, Socket } from 'socket.io'
import { TetrominoType } from '@red-tetris/shared'

export interface ServerToClientEvents {
    player_list: (players: string[]) => void
    next_piece: (tetromino: TetrominoType) => void
    start_piece: (start_piece: TetrominoType, next_piece: TetrominoType) => void
}

export interface ClientToServerEvents {
    join_room: (payload: { username: string; room: string }) => void
    next_piece: (room: string) => void
    start_piece: (room: string) => void
}

export interface SocketData {
    username: string
}

export type SocketServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData
>
export type SocketPlayer = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData
>

declare module 'fastify' {
    interface FastifyInstance {
        io: SocketServer
    }
}
