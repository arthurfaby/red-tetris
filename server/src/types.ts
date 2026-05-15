import { Server } from 'socket.io'

export interface ServerToClientEvents {
    player_list: (players: string[]) => void;
}

export interface ClientToServerEvents {
    join_room: (payload: { username: string; room: string }) => void;
}

export interface SocketData {
    username: string;
}

export type SocketServer = Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;

declare module 'fastify' {
    interface FastifyInstance {
        io: SocketServer;
    }
}